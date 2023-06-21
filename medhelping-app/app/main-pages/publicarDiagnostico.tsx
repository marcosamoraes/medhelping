import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../sources/components/header";
import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from "react";
import { useRouter } from "expo-router";
export default function PublicarDiagnostico() {
    const router = useRouter();
    function postDiag(){
        router.push('./home')
    }
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
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
    return (<>
        <Header />
        <ScrollView className="w-screen pt-6 px-6 bg-[#00021C]">

            <View className="w-full p-4 rounded-xl bg-[#03dadbb2]">
                <Text className="font-900 mb-3 text-white">Publique seu caso clínico.</Text>
                <Text className="font-700 text-white">Pergunte a comunidade MedHelping.</Text>
            </View>
            <View className="w-full px-2">
                <TextInput
                    style={styles.input}
                    placeholder='Título'
                    className='h-10 w-full rounded-xl text-sm font-400 mb-3 mt-5 px-4'
                    placeholderTextColor={'white'}
                />
                <TextInput
                    style={styles.inputD}
                    placeholder='Descrição'
                    multiline={true}
                    className='h-24 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
                    placeholderTextColor={'white'}
                />
                <TouchableOpacity activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center py-2 rounded-xl my-3 items-center"><Feather name="paperclip" size={18} color="white" /><Text className="text-white font-700 text-sm ml-2">Enviar Imagem ou Vídeo</Text></TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder='Categoria 1 *'
                    className='h-10 w-full rounded-xl text-sm font-400 my-2 px-4'
                    placeholderTextColor={'white'}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Categoria 2'
                    className='h-10 w-full rounded-xl text-sm font-400 my-2 px-4'
                    placeholderTextColor={'white'}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Categoria 3'
                    className='h-10 w-full rounded-xl text-sm font-400 my-2 px-4'
                    placeholderTextColor={'white'}
                />
                <View className="flex-row items-center my-4">
                    <Checkbox
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)} />
                    <Text className="font-400 ml-3 pt-1 text-sm text-white">Publicar de Forma Anônima</Text>
                </View>
                <TouchableOpacity onPress={()=> postDiag()} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center py-2 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Publicar Diagnóstico</Text></TouchableOpacity>
                <View className="h-10"></View>
            </View>
        </ScrollView>

    </>)
}