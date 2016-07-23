import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql'

import lookupAddresses from '../../address'

const addressType = new GraphQLObjectType({
  name: 'address',
  fields: {
    street: { type: GraphQLString },
    house: { type: GraphQLString },
    zip: { type: GraphQLString },
    city: { type: GraphQLString },
    apartment: { type: GraphQLString },
    letter: { type: GraphQLString },
  },
})

const addressesType = new GraphQLList(addressType)

export default {
  type: addressesType,
  args: {
    address: { type: GraphQLString },
  },
  resolve: (_, args) => {
    const address = args.address.replace(' ', '+')
    return lookupAddresses(address).then((data) => data, (error) => error)
  },
}
