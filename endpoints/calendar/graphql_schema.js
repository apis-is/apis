import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'

import lookupHolidays from './index'

const holiday = new GraphQLObjectType({
  name: 'Holiday',
  description: 'An Icelandic holiday',
  fields: {
    date: {
      type: GraphQLString,
      description: 'The datetime in ISO 8601 date format',
    },
    description: {
      type: GraphQLString,
      description: 'The name of the holiday in Icelandic',
    },
    holiday: {
      type: GraphQLBoolean,
      description: 'A boolean value indicating wether this is a holiday or not',
    },
  },
})

const holidays = new GraphQLList(holiday)

export default {
  type: holidays,
  args: {
    year: { type: GraphQLString },
    month: { type: GraphQLString },
    day: { type: GraphQLString },
  },
  resolve: (_, args) => {
    const { year, month, day } = args
    return lookupHolidays(year, month, day)
      .then(data => data)
      .catch(error => error)
  },
}
