import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import address from '../address/graphql-schema'
import bus from '../bus/graphql-schema'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      address,
      busses: bus,
    },
  }),
})

export default schema
