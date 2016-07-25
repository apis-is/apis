import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import address from '../address/graphql_schema'
import bus from '../bus/graphql_schema'
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
