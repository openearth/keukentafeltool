import dotenv from 'dotenv'
import request from 'request-promise-native'
import { promisify } from 'util'
import { parseString } from 'xml2js'

dotenv.config()

const { WPS_BASE_URL } = process.env
const xmlToJson = promisify(parseString)

/**
 * Example: /.netlify/functions/hydrometra-parcel-effects?input=[{"parcelId":1589037,"measureIds":[1,10,12]}]
 */
export const handler = (event, context, callback) => {
  // const parcelId = Number(event.queryStringParameters.parcelId)
  // const measureIds = event.queryStringParameters.measureIds.split(',').map(Number)
  // const inputJson = [
  //   { pid: parcelId, mids: measureIds }
  // ]
  const input =  event.queryStringParameters.input ? JSON.parse(event.queryStringParameters.input) : []
  const inputJson = input.map(item => ({
    pid: item.parcelId,
    mids: item.measureIds,
  }))

  const send = body => callback(null, { statusCode: 200, body: JSON.stringify(body) })

  request({
    url: WPS_BASE_URL,
    qs: {
      request: 'Execute',
      service: 'WPS',
      identifier: 'kkt',
      version: '1.0.0',
      datainputs: `input_json=${JSON.stringify(inputJson)}`,
    }
  })
    .then(xmlToJson)
    .then(res => res
      ['wps:ExecuteResponse']
      ['wps:ProcessOutputs'][0]
      ['wps:Output'][0]
      ['wps:Data'][0]
      ['wps:ComplexData'][0]['_']
    )
    .then(str => JSON.parse(str))
    // .then(transformEffects)
    .then(data => send({ data }))
    .catch(err => callback(null, {
      statusCode: 500,
      body: JSON.stringify({ errors: [err] })
    }))
}

function transformEffects (effects) {
  const defaults = { ndrain: 0, no3: 0, pdrain: 0 }
  const parcelId = effects[0].pid
  const perMeasure = effects.map(item => ({
    measureId: item.mid,
    ndrain: item.effndrain,
    no3: item.effno3,
    pdrain: item.effpdrain,
  }))
  const totals = effects.reduce((totals, item) => {
    totals.ndrain += item.effndrain
    totals.no3 += item.effno3
    totals.pdrain += item.effpdrain
    return totals
  }, { ...defaults })

  return { parcelId, perMeasure, totals }
}
