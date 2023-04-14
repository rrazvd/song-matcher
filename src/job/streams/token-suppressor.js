import { Transform } from 'stream'

class TokenSuppressor extends Transform {
  lastToken = ''

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk, _, next) {
    const currentToken = chunk

    const lastTokenMustBePushed = this.lastToken
      && !(this.lastToken.length > 1 && currentToken.startsWith(this.lastToken))

    if (lastTokenMustBePushed) this.push(this.lastToken)

    this.lastToken = currentToken
    next()
  }
}

export const tokenSuppressor = () => new TokenSuppressor()
