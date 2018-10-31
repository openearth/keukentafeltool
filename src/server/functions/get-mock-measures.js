const data = require('../lib/measures.stub.json')

export const handler = (event, context, callback) => {
  const send = body => callback(null, { statusCode: 200, body: JSON.stringify(body) })
  send({ data })
}
