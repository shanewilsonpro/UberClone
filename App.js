import React from 'react';
import {StatusBar} from 'react-native';

import SearchResults from './src/screens/SearchResults';
import HomeScreen from './src/screens/HomeScreen';

const App: () => Node = () => {
  return (
    <>
      <SearchResults barStyle={'dark-content'} />
      <HomeScreen />
    </>
  );
};

export default App;
