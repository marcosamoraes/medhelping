import { Image, View } from 'react-native';

import { app_logo } from '../constants/images';

import SplashScreenStyles from "../styles/splash_screen_style";

export default function SplashScreen() {
  return (
    <View style={ SplashScreenStyles.container }>
      <Image source={ app_logo } style={ SplashScreenStyles.logoImage }></Image>
    </View>
  );
};
