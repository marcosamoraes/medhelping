import Login from './login-pages/login';
import { useFonts, Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black} from '@expo-google-fonts/catamaran';

export default function App() {
  const [hasLoadedFonts] = useFonts({Catamaran_300Light, Catamaran_400Regular, Catamaran_500Medium, Catamaran_600SemiBold, Catamaran_700Bold, Catamaran_800ExtraBold, Catamaran_900Black})
  
  
  return (<>
  <Login/>
    </>
  );
}
