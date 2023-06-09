import { Feather } from '@expo/vector-icons'; 
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons'; 
export default function Header(){
    const { top } = useSafeAreaInsets()
    return (<>
    <View style={{paddingTop : top}} className='bg-[#01061C] border-b-2 border-b-[#1F2935] w-screen'>
        <View className='flex-row px-4 justify-between pt-4 pb-3 w-screen'>
        <Feather name="menu" size={28} color="white" />
        <Text className='font-900 text-2xl text-white'>MedHelping</Text>
        <FontAwesome5 name="mail-bulk" size={24} color="white" />
        </View>
    </View>

    </>)
}