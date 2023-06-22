import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ImageRequireSource, Alert } from "react-native";
import Header from "../../sources/components/header";
import Footer from "../../sources/components/footer";
import { useRouter } from "expo-router";
import SideMenu from "../../sources/components/sideMenu";
import SidebarProvider from "../../sources/config/Provider";
import TouchableBlur from "../../sources/components/touchableBlur";
import { useState } from "react";
import { api } from "../../sources/services/api";

const mailIcon = require("../../assets/images/mailicon.png");
export default function FaleConosco(){

    const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const router = useRouter();

  function handleClick() {
    setLoading(true)
    const obj = {
      titulo,
      mensagem
    }
    api.post('/', obj).then(reqSuccess).catch(reqFailure)

  }
  function reqSuccess() {
    setLoading(false)
    Alert.alert('Mensagem enviada', 'Enviaremos um retorno em breve', [{ text: 'OK' }])
    router.push('./home')

  }
  function reqFailure() {
    Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
    setLoading(false)

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
    <SidebarProvider>
    <TouchableBlur/>
    <Header/>
    <SideMenu/></SidebarProvider>
    <ScrollView className="w-screen pt-6 px-6 bg-[#00021C]">

        <View className="w-full justify-center items-center">
        <Image className="w-20 h-20" source={mailIcon}/>
        <Text className="text-white font-900 text-xl my-4">Fale conosco</Text>
        <Text className="text-white font-500 text-center text-base">Para dúvidas, sugestões ou informações diversas, entre em contato conosco pelo formulário abaixo:</Text>
        </View>
        
        
      <TextInput
      style={styles.input}
      placeholder='Título'
      className='h-10 w-full rounded-xl text-sm font-400 mb-3 mt-5 px-4'
      placeholderTextColor={'white'}
      value={titulo}
      onChangeText={setTitulo}
      />
      <TextInput
      style={styles.inputD}
      placeholder='Mensagem'
      multiline={true}
      className='h-14 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
      placeholderTextColor={'white'}
      value={mensagem}
      onChangeText={setMensagem}
      />
         <TouchableOpacity disabled={loading} onPress={()=>handleClick()} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center py-2 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Enviar</Text></TouchableOpacity>
    <View className="h-10"></View>

    </ScrollView>
    <Footer/>
    </>)
}