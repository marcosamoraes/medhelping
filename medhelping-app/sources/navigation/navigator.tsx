import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashScreenScreen from '@screens/splash_screen_screen'

const Stack = createNativeStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='SplashScreen' component={SplashScreenScreen} options={screenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
