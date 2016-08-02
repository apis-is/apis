import { GraphQLScalarType } from 'graphql'
import { GraphQLError } from 'graphql/error'
import { Kind } from 'graphql/language'

const coerceDate = value => {
  if (!(value instanceof Date)) {
    throw new Error('[Field error]: value is not an instance of Date')
  }
  if (isNaN(value.getTime())) {
    throw new Error('[Field error]: value is an invalid Date')
  }
  return value.toJSON()
}

export const GraphQLDate = new GraphQLScalarType({
  name: 'DateTime',
  serialize: coerceDate,
  parseValue: coerceDate,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `[Query error]: Can only parse strings to dates but got a: ${ast.kind}`, [ast]
      )
    }
    const result = new Date(ast.value)
    if (isNaN(result.getTime())) {
      throw new GraphQLError('[Query error]: Invalid date', [ast])
    }
    if (ast.value !== result.toJSON()) {
      throw new GraphQLError(
        '[Query error]: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ', [ast]
      )
    }
    return result
  },
})
