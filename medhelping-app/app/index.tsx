import SplashScreen from '../sources/screens/splash_screen_screen';
import Login from './login-pages/login';
import { useFonts, Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black } from '@expo-google-fonts/catamaran';

import FaleConosco from './main-pages/faleConosco';
import VerPublicacao from './main-pages/verPublicacao';

export default function App() {
  const [hasLoadedFonts] = useFonts({ Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black })

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
  <>
    <VerPublicacao />
  </>
  );
}
