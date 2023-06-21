import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ImageRequireSource } from "react-native";
import Header from "../../sources/components/header";
import Footer from "../../sources/components/footer";
import { useRouter } from "expo-router";

const mailIcon = require("../../assets/images/mailicon.png");
export default function FaleConosco(){
    const router = useRouter();
    function handleClick(){
        router.push('./home')
    }
    const styles = StyleSheet.create({
        input:{
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        },
        inputD:{
            borderColor: 'white',
            borderWidth: 1,
            color: 'white',
            textAlignVertical: 'top'
        }
    });
    return(<>
    <Header/>
    <ScrollView className="w-screen pt-6 px-6 bg-[#00021C]">

        <View className="w-full justify-center items-center">
        <Image className="w-20 h-20" source={mailIcon}/>
        <Text className="text-white font-900 text-xl my-4">Fale conosco</Text>
        <Text className="text-white font-500 text-center text-base">Para dúvidas, sugestões ou informações diversas, entre em contato conosco pelo formulário abaixo:</Text>
        </View>
        
        <TextInput
      style={styles.input}
      placeholder='Nome'
      className='h-10 w-full rounded-xl text-sm font-400 mb-3 mt-5 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.input}
      placeholder='Email'
      className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.inputD}
      placeholder='Mensagem'
      multiline={true}
      className='h-14 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
      placeholderTextColor={'white'}
      />
         <TouchableOpacity onPress={()=>handleClick()} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center py-2 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Enviar</Text></TouchableOpacity>
    <View className="h-10"></View>

    </ScrollView>
    <Footer/>
    </>)
}