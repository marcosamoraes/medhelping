
import { AuthProvider } from '@contexts/Auth';
import { Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black, useFonts } from '@expo-google-fonts/catamaran';
import Routes from '@routes/index';
import { Text, View } from 'react-native';
import SplashScreen from '../sources/screens/splash_screen_screen';
import { RedirectProvider } from '@contexts/Redirect';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function App() {
  const [hasLoadedFonts] = useFonts({ Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black })

  const { top, bottom } = useSafeAreaInsets()

  return (
    <AuthProvider>
      <RedirectProvider>
        <View className='flex flex-1 bg-background' style={{ marginTop: -top, marginBottom: -bottom }}>
          {hasLoadedFonts ? <Routes /> : <SplashScreen />}
        </View>
      </RedirectProvider>
    </AuthProvider>
  );
}
