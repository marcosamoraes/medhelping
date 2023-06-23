import { Feather } from '@expo/vector-icons'; 
import { View, Text, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Link, useNavigation } from 'expo-router';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SidebarContext } from "@contexts/Sidebar";

export default function Header(){
  const { setIsOpen } = useContext(SidebarContext);
  const { top } = useSafeAreaInsets()

  const navigation = useNavigation()

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <View style={{paddingTop : top}} className='bg-[#01061C] border-b-2 border-b-[#1F2935] w-screen'>
      <View className='flex-row px-4 justify-between pt-4 pb-3 w-screen'>
        <TouchableOpacity onPress={()=> {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);setIsOpen(true)}}>
          <Feather name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text className='font-900 text-2xl text-white'>MedHelping</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('contact')}>
          <FontAwesome5 name="mail-bulk" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}