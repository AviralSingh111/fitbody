import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import RootNavigator from '@/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/poppins/Poppins-Bold.ttf'),
    'Poppins-Light': require('./assets/fonts/poppins/Poppins-Light.ttf'),
    'LeagueSpartan-Bold': require('./assets/fonts/leagueSpartan/LeagueSpartan-Bold.ttf'),
    'LeagueSpartan-Light': require('./assets/fonts/leagueSpartan/LeagueSpartan-Light.ttf'),
    'LeagueSpartan-Regular': require('./assets/fonts/leagueSpartan/LeagueSpartan-Regular.ttf'),
    'LeagueSpartan-Medium': require('./assets/fonts/leagueSpartan/LeagueSpartan-Medium.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
   <View style={{flex: 1}} onLayout={onLayoutRootView}>
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
    <Toast />
  </View>
  );
}
