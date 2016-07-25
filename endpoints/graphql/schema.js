import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import address from '../address/graphql-schema'
import bus from '../bus/graphql-schema'
import holidays from '../calendar/graphql_schema'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    fields: {
      address,
      busses: bus,
      holidays,
    },
  }),
})

export default schema
