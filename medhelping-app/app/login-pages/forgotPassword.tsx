import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useNavigation } from "expo-router";
import { api } from '../../sources/services/api';

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  function handleRecover() {
    setLoading(true)
    const obj = {
      email
    }
    api.post('/forgot-password', obj).then(reqSuccess).catch(reqFailure)

  }
  function reqSuccess(e: any) {
    setLoading(false)
    Alert.alert('Sucesso', e.response.message, [{ text: 'OK' }])
    navigation.navigate("login")

  }
  function reqFailure() {
    Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
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
        className="w-28 h-28 z-10 border-2 rounded-3xl my-24"
        source={require('../../assets/images/medhelping_logo.png')}
      />
      <LinearGradient
        colors={['#03DADB', '#07ACF7']}
        style={styles.container}
        className="absolute bg-[#3599C3] transform -rotate-12"
      />
      <TextInput
        style={styles.input}
        placeholder='Email de recuperação'
        className='h-10 w-4/5 rounded-xl text-sm font-400 my-5 px-4'
        placeholderTextColor={'white'}
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity disabled={loading} onPress={() => handleRecover()} activeOpacity={0.8} className='w-4/5 overflow-hidden bg-[#348CA9] mt-7 mb-12 h-11 justify-center items-center rounded-2xl'>
        <LinearGradient
          colors={['rgba(3, 218, 219, 0.7)', 'rgba(7, 172, 247, 0.7)']}
          className='w-full h-full flex justify-center items-center'
        >
          {loading ? (
            <Text className='font-900 text-white text-base'>
                <ActivityIndicator color="white" />
            </Text>
          ): (
            <Text className='font-900 text-white text-base'>Enviar link de recuperação</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity className='my-5' onPress={() => navigation.navigate('login')}>
        <Text className='font-900 text-white text-base my-5'> Fazer Login </Text>
      </TouchableOpacity>
    </View>
  </>)
}