import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql'

import lookupAddresses from './index'

const addressType = new GraphQLObjectType({
  name: 'Address',
  fields: {
    street: {
      type: GraphQLString,
      description: 'The name of the street the address belongs to',
    },
    house: {
      type: GraphQLString,
      description: 'The house number the address belongs to',
    },
    zip: {
      type: GraphQLString,
      description: 'The zip code where this address is registered',
    },
    city: {
      type: GraphQLString,
      description: 'The city where this address is registered',
    },
    apartment: {
      type: GraphQLString,
      description: 'A name for an apartment belonging to this address',
    },
    letter: {
      type: GraphQLString,
    },
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
