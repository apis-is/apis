import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import address from './addressSchema'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      address,
    },
  }),
})

export default schema
