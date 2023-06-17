import { Transform } from 'stream'

export const tokenSuppressor = () => {
  let lastToken = ''

  const stream = new Transform({ objectMode: true })

  stream._transform = function (chunk, _, next) {
    const currentToken = chunk

    const lastTokenMustBePushed = lastToken
      && (lastToken.length <= 1 || !currentToken.startsWith(lastToken))

    if (lastTokenMustBePushed) this.push(lastToken)

    lastToken = currentToken
    next()
  }

  return stream
}
