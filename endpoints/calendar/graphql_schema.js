const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql')
const { GraphQLDate } = require('../../graphql/types/GraphQLDate')

const lookupHolidays = require('.')

const holiday = new GraphQLObjectType({
  name: 'Holiday',
  description: 'An Icelandic holiday',
  fields: {
    date: {
      type: GraphQLDate,
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

module.exports = {
  type: holidays,
  args: {
    year: { type: GraphQLString },
    month: { type: GraphQLString },
    day: { type: GraphQLString },
  },
  resolve: async (_, { year, month, day }) => {
    try {
      return await lookupHolidays(year, month, day)
    } catch (error) {
      throw new Error(error)
    }
  },
}
