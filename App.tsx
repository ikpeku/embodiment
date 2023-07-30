
import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Root from './navigation/Root';
import { View } from 'react-native';



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
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Root />
      </View>
    </SafeAreaProvider>

  );
}


