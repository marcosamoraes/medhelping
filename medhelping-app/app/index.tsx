
import { AuthProvider } from '@contexts/Auth';
import SplashScreen from '../sources/screens/splash_screen_screen';
import { useFonts, Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black } from '@expo-google-fonts/catamaran';
import Routes from '@routes/index';
import { View } from 'react-native';
import { useEffect } from 'react';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

export default function App() {
  const [hasLoadedFonts] = useFonts({ Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black })

  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        console.log('Yay! I have user permission to track data');
      }
    })();
  }, []);

  return (
    <AuthProvider>
      <View className='flex flex-1 bg-background'>
        {hasLoadedFonts ? <Routes /> : <SplashScreen />}
      </View>
    </AuthProvider>
  );
}
