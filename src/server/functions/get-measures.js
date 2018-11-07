import dotenv from 'dotenv'
import request from 'request-promise-native'
import { promisify } from 'util'
import { parseString } from 'xml2js'

dotenv.config()

const { WPS_BASE_URL } = process.env
const xmlToJson = promisify(parseString)

export const handler = (event, context, callback) => {
  const send = body => callback(null, { statusCode: 200, body: JSON.stringify(body) })

  request({
      url: WPS_BASE_URL,
      qs: {
        request: 'Execute',
        service: 'WPS',
        identifier: 'kkt_measures',
        version: '1.0.0',
      },
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
    .then(groupMeasures)
    .then(data => send({ data }))
    .catch(err => callback(null, {
      statusCode: 500,
      body: JSON.stringify({ errors: [err] })
    }))
}

function groupMeasures (measures) {
  const emptyGroups = measures.reduce((groups, measure) => {
      groups[measure.gid] = {
        id: measure.gid,
        title: measure.gidText,
        items: [],
      }
      return groups
    }, [])

    return measures
      .reduce((groups, measure) => {
        groups[measure.gid].items.push({
          id: measure.mid,
          link: measure.hlink,
          title: measure.midText,
        })
        return groups
      }, emptyGroups)
      .filter(group => (typeof group === 'object')) // remove empty indices
}
