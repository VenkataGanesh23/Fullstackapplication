import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolver';
import { createContext } from './context';

const server = new ApolloServer({ typeDefs, resolvers, context: createContext });
server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });