import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import  resolvers  from './graphql/resolvers'
import { createContext } from './src/utils/context';

const server = new ApolloServer({ typeDefs, resolvers, context: createContext });
server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });