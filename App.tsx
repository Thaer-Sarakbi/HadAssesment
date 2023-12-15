import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/AppContainer';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </Provider>
  );
}

export default App;