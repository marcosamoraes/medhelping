import React from 'react';
import { View, Image, StyleSheet, TextInput, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";

export default function Login(){

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
        input:{
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        }
    });
    return (<>
    <View className="bg-[#01061C] flex-1 items-center">
    <Image style={styles.logo}
        className="w-28 h-28 z-10 border-2 rounded-3xl mt-24 mb-20"
        source={require('../../assets/images/medhelping_logo.png')}
      />
      <LinearGradient
      colors={['#03DADB', '#07ACF7']}
        style={styles.container}
        className="absolute bg-[#3599C3] transform -rotate-12"
      />
      <TextInput
      style={styles.input}
      placeholder='Email'
      className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.input}
      placeholder='Senha'
      className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <LinearGradient
      colors={['rgba(3, 218, 219, 0.7)', 'rgba(7, 172, 247, 0.7)']}
      className='w-4/5 bg-[#348CA9] my-5 h-11 justify-center items-center rounded-2xl'
      ><Link href='../main-pages/home'><Text className='font-900 text-white text-base'>Entrar</Text></Link></LinearGradient>
      <Link className='my-5' href='../login-pages/forgotPassword'><Text className='font-900 text-white text-base my-5'> Esqueci minha senha </Text></Link>
      <Link className='mt-5' href='../login-pages/cadastro'><Text className='font-900 text-[#03DADB] text-base mt-5 mb-3'> Novo no app? Criar conta! </Text></Link>
    </View>
    
    </>)
}