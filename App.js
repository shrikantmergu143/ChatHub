import { NativeBaseProvider, Text, extendTheme } from 'native-base'
import React from 'react'
import { Button } from 'react-native-paper';

import auth from "./config/Firebase";
import Apps from "./components/App";
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { StatusBar } from 'expo-status-bar';

const store = createStore(rootReducer, applyMiddleware(thunk))
export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });
  return (
    <Provider store={store}>
      <PaperProvider>
        <NativeBaseProvider theme={theme}>
          <StatusBar animated={true}  style="light"  backgroundColor="#61dafb" />
          <Apps/>
        </NativeBaseProvider>
      </PaperProvider>
    </Provider>
  )
}
