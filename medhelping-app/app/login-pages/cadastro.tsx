import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from "expo-router";
import { api } from '../../sources/services/api';

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const router = useRouter();

  function handleRegister() {
    if(password_confirmation !== password){
      Alert.alert('Erro', 'Senhas diferentes', [{ text: 'OK' }])
      return
    }
    setLoading(true)
    const obj = {
      name,
      email,
      password,
      password_confirmation
    }
    api.post('/register', obj).then(handleRegisterSuccess).catch(handleRegisterFailure)

  }

  function handleRegisterFailure() {
    Alert.alert('Erro', 'Ocorreu algum erro, tente novamente', [{ text: 'OK' }])
    setLoading(false)
  }
  function handleRegisterSuccess() {
    Alert.alert('Sucesso', 'Cadastro criado com êxito', [{ text: 'OK' }])
    router.push('./login')
    setLoading(false)
  }


  const styles = StyleSheet.create({
    container: {
      width: 1000,
      height: 280,
      top: -120

    },
    logo: {
      borderColor: '#EEEEEE',
      borderWidth: 2
    },
    input: {
      borderColor: 'white',
      borderWidth: 1,
      color: 'white'
    }
  });
  return (<>
    <View className="bg-[#01061C] flex-1 items-center">
      <Image style={styles.logo}
        className="w-28 h-28 z-10 border-2 rounded-3xl mt-24 mb-16"
        source={require('../../assets/images/medhelping_logo.png')}
      />
      <LinearGradient
        colors={['#03DADB', '#07ACF7']}
        style={styles.container}
        className="absolute bg-[#3599C3] transform -rotate-12"
      />
      <TextInput
        style={styles.input}
        placeholder='Nome'
        className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Senha'
        className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder='Confirmar senha'
        className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        secureTextEntry={true}
        value={password_confirmation}
        onChangeText={setPasswordConfirmation}
      />
      <TouchableOpacity disabled={loading} onPress={() => handleRegister()} activeOpacity={0.8} className='w-4/5 overflow-hidden bg-[#348CA9] my-5 h-11 justify-center items-center rounded-2xl'>
        <LinearGradient
          colors={['rgba(3, 218, 219, 0.7)', 'rgba(7, 172, 247, 0.7)']}
          className='w-full h-full flex justify-center items-center'
        ><Text className='font-900 text-white text-base'>Cadastrar</Text></LinearGradient></TouchableOpacity>

      <Link className='my-5' href='../login-pages/login'><Text className='font-900 text-white text-base my-5'> Fazer Login </Text></Link >
    </View>
  </>)
}