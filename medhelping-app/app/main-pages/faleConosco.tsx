import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import Header from "@components/header";
import Footer from "@components/footer";
import { useNavigation } from "expo-router";
import SideMenu from "@components/sideMenu";
import SidebarProvider from "@contexts/Sidebar";
import TouchableBlur from "@components/touchableBlur";
import { useState } from "react";
import { api } from "@services/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const mailIcon = require("../../assets/images/mailicon.png");

export default function FaleConosco() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true)

    try {
      await api.post('/contacts', {title, message})

      Alert.alert('Sucesso', 'Mensagem enviada com sucesso. Em breve entraremos em contato.', [{ text: 'OK' }])
      navigation.navigate('home')
    } catch (error: any) {
      console.error('faleConosco: ', error.response.data.error)
      const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
      Alert.alert('Erro', message, [{ text: 'OK' }])
    } finally {
      setLoading(false)
    }
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
  
  return(
    <>
      <SidebarProvider>
        <TouchableBlur/>
        <Header/>
        <SideMenu/>
      </SidebarProvider>
      <KeyboardAwareScrollView className="w-screen pt-6 px-6 bg-background">
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
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.inputD}
          placeholder='Mensagem'
          multiline={true}
          className='h-14 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
          placeholderTextColor={'white'}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity 
          disabled={loading} 
          onPress={handleSubmit} 
          activeOpacity={0.8} 
          className="flex-row w-full bg-primary justify-center py-2 rounded-xl my-3 items-center"
        >
          <Text className="text-white font-700 text-sm ml-2">{loading ? <ActivityIndicator color="white" /> : 'Enviar'}</Text>
        </TouchableOpacity>
        <View className="h-10"></View>
      </KeyboardAwareScrollView>
      <Footer/>
    </>
  )
}