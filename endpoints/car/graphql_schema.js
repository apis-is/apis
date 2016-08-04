import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import lookupCar from './index'

const car = new GraphQLObjectType({
  name: 'Car',
  description: 'Holds information about a registered Icelandic car',
  fields: {
    type: {
      type: GraphQLString,
      description: 'The car brand, model and color ',
    },
    subType: {
      type: GraphQLString,
      description: 'The car model',
    },
    color: {
      type: GraphQLString,
      description: 'The cars color',
    },
    registryNumber: {
      type: GraphQLString,
      description: 'The number on the cars plate',
    },
    number: {
      type: GraphQLString,
      description: 'The original number on the car is registered under',
    },
    factoryNumber: {
      type: GraphQLString,
      description: 'The factory number of the car',
    },
    registeredAt: {
      type: GraphQLString,
      description: 'The date when the car was registered on the format DD.MM.YYYY',
    },
    pollution: {
      type: GraphQLString,
      description: 'The polution rate of the car in g/km',
    },
    weight: {
      type: GraphQLString,
      description: 'The weight of the car in kg',
    },
    status: {
      type: GraphQLString,
      description: 'The status of the car. Example: `Í lagi`',
    },
    nextCheck: {
      type: GraphQLString,
      description: 'The date of this cars next routine check on the format DD.MM.YYYY',
    },
  },
})

export default {
  type: car,
  args: {
    carPlate: {
      type: GraphQLString,
      description: 'The numer on the cars plate',
    },
  },
  resolve: (_, { carPlate }) => lookupCar(carPlate)
    .then(data => data)
    .catch(error => { throw new Error(error) }),
}
