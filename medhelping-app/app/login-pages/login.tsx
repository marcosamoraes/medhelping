import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from "expo-router";
import { api } from '../../sources/services/api';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const router = useRouter();

    function handleLogin() {
        setLoading(true)
        const obj = {
            email,
            senha
        }
        api.post('/login', obj).then(handleLoginSuccess).catch(handleLoginFailure)
    }
    function handleLoginSuccess() {
        router.push('../main-pages/home')
        setLoading(false)
    }
    function handleLoginFailure() {
        Alert.alert('Erro', 'Credenciais incorretas, tente novamente ou faça uma conta', [{ text: 'OK' }])
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
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                className='h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
            />
            <TouchableOpacity disabled={loading} onPress={() => handleLogin()} activeOpacity={0.8} className='w-4/5 overflow-hidden bg-[#348CA9] my-5 h-11 justify-center items-center rounded-2xl'>
                <LinearGradient
                    colors={['rgba(3, 218, 219, 0.7)', 'rgba(7, 172, 247, 0.7)']}
                    className='w-full h-full flex justify-center items-center'
                ><Text className='font-900 text-white text-base'>Entrar</Text></LinearGradient></TouchableOpacity>
            <Link className='my-5' href='../login-pages/forgotPassword'><Text className='font-900 text-white text-base my-5'> Esqueci minha senha </Text></Link>
            <Link className='mt-5' href='../login-pages/cadastro'><Text className='font-900 text-[#03DADB] text-base mt-5 mb-3'> Novo no app? Criar conta! </Text></Link>
        </View>

    </>)
}