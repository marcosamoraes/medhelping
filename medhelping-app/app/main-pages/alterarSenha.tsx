import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "@components/header";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Footer from "@components/footer";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useContext, useState } from "react";
import { api } from "@services/api";
import { AuthContext } from "@contexts/Auth";

export default function AlterarSenha(){
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const { user } = useContext(AuthContext)

  const navigation = useNavigation();
  
  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      const obj = {
        old_password: currentPassword,
        password: newPassword,
        password_confirmation: passwordConfirmation
      }
      
      const response = await api.put(`/users/${user.id}/password`, obj)

      Alert.alert('Sucesso', response.data.message, [{ text: 'OK' }])
      navigation.navigate("viewProfile")
    } catch (error: any) {
      console.error('alterarSenha: ', error.response.data.error)
      const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
      Alert.alert('Erro', message, [{ text: 'OK' }])
    } finally {
      setLoading(false)
    }
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

  return (
    <SidebarProvider>
      <TouchableBlur/>
      <Header/>
      <SideMenu/>
      <View className="w-full h-screen px-6 bg-background">
        <TextInput
          style={styles.input}
          placeholder='Senha atual'
          className='h-10 w-full rounded-xl text-sm font-400 mt-32 mb-3 px-4'
          placeholderTextColor={'white'}
          secureTextEntry={true}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder='Nova senha'
          className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
          placeholderTextColor={'white'}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder='Confirmar nova senha'
          className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
          placeholderTextColor={'white'}
          secureTextEntry={true}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />
        <TouchableOpacity 
          disabled={loading} 
          onPress={()=> handleSubmit()} 
          activeOpacity={0.8} 
          className="flex-row w-full bg-primary justify-center pt-2 pb-1 rounded-xl my-3 items-center"
        >
          <Text className="text-white font-700 text-sm ml-2">
            {loading ? <ActivityIndicator color="white" /> : 'Alterar senha'}
          </Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </SidebarProvider>
  )
}