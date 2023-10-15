import {StatusBar} from 'react-native';
import React from 'react';
import {CRUD} from './src/components/CRUD';
import NavigatorApp from './src/NavigatorApp';
import ContextApi from './src/context/ContextApi';

const App = () => {
  return (
    <ContextApi>
      <NavigatorApp />
      <StatusBar hidden />
    </ContextApi>
  );
};

export default App;
