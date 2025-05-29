import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../../apollo';
import { AuthProvider } from '../../context/AuthContext';
import Main from './Main';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
