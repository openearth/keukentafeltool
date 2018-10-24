import request from 'request-promise-native'
import { promisify } from 'util'
import { parseString } from 'xml2js'

const xmlToJson = promisify(parseString)

export const handler = (event, context, callback) => {
  const send = body => callback(null, { statusCode: 200, body: JSON.stringify(body) })

  request({
      url: 'http://tl-ng047.xtr.deltares.nl/wps?request=Execute&service=WPS&identifier=kkt_measures&version=1.0.0',
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
    .then(data => send({ data }))
    .catch(err => callback(null, { statusCode: 500, body: JSON.stringify(err) }))
}
