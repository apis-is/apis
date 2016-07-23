import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import schema from './schema'
import app from '../../server'

app.use('/graphql', bodyParser.json(), graphqlHTTP({
  schema,
  graphiql: true,
}))
