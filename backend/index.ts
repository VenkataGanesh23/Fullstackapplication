import { ApolloServer } from 'apollo-server';
import { typeDefs } from './Schema/schema';
import { resolvers } from './Resolver/resolver';
import { createContext } from './src/context';

const server = new ApolloServer({ typeDefs, resolvers, context: createContext });
server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });