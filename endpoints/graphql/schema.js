import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import address from '../address/graphql-schema'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      address,
    },
  }),
})

export default schema
