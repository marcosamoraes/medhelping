import React from 'react';
import { View, Image, StyleSheet, TextInput, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";

export default function Cadastro(){

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
      <TextInput
      style={styles.input}
      placeholder='Confirmar senha'
      className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <LinearGradient
      colors={['#03DADBB3', '#07ACF7B3']}
      className='w-4/5 bg-[#348CA9] my-5 h-11 justify-center items-center rounded-2xl'
      ><Text className='font-900 text-white text-lg'>Cadastrar</Text></LinearGradient>
      <Link className='my-5' href='../login-pages/login'><Text className='font-900 text-white text-base my-5'> Fazer Login </Text></Link >
      </View>
    </>)
}