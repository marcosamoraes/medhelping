import React from 'react';
import { View, Image, StyleSheet, TextInput, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";

export default function Forgot(){

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
      className='h-10 w-4/5 rounded-xl my-5 px-4'
      placeholderTextColor={'white'}
      />
      <LinearGradient
      colors={['#03DADBB3', '#07ACF7B3']}
      className='w-4/5 bg-[#348CA9] my-12 h-11 justify-center items-center rounded-2xl'
      ><Text className='font-bold text-white text-lg'>Enviar link de recuperação</Text></LinearGradient>
      <Link href='/login'><Text className='font-bold text-white text-base my-5'> Fazer Login </Text></Link>
      </View>
    </>)
}