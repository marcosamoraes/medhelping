
import { AuthProvider } from '@contexts/Auth';
import SplashScreen from '../sources/screens/splash_screen_screen';
import { useFonts, Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black } from '@expo-google-fonts/catamaran';
import Routes from '@routes/index';
import { View } from 'react-native';

export default function App() {
  const [hasLoadedFonts] = useFonts({ Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black })

  return (
    <AuthProvider>
      <View className='flex flex-1 bg-background'>
        {hasLoadedFonts ? <Routes /> : <SplashScreen />}
      </View>
    </AuthProvider>
  );
}
