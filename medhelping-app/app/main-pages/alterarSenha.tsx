import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../../sources/components/header";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Footer from "../../sources/components/footer";

export default function AlterarSenha(){
    const router = useRouter();
    function handleEditPassword(){
        router.push('./verPerfil')
    }
    const styles = StyleSheet.create({
        input: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        },
        inputD: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white',
            textAlignVertical: 'top'
        }
    });

    return (<>
    <Header />
        <View className="w-full h-screen px-6 bg-[#00021C]">
            <TextInput
                style={styles.input}
                placeholder='Senha atual'
                className='h-10 w-full rounded-xl text-sm font-400 mt-32 mb-3 px-4'
                placeholderTextColor={'white'}
                secureTextEntry={true}
                />
            
            <TextInput
                style={styles.input}
                placeholder='Nova senha'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder='Confirmar nova senha'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={()=> handleEditPassword()} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Alterar senha</Text></TouchableOpacity>
        
        </View>
        <Footer />
    
    </>)
}