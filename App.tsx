
import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Root from './navigation/Root';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux'
import { store } from './redux/store';

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

let persistor = persistStore(store);
const queryClient = new QueryClient()


SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts({
    'avenir': require('./assets/Avenir-Font/avenir_ff/AvenirLTStd-Black.otf'),
    'Lato': require('./assets/Lato/Lato-Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
   
       
    <SafeAreaProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>

        <Root />
      </QueryClientProvider>
      </View>
      </PaperProvider>
      </PersistGate>
      </Provider>
    </SafeAreaProvider>
   

  );
}


