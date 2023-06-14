import { Image, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../sources/components/footer";
import Header from "../../sources/components/header";

export default function EditarPerfil() {
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
        <ScrollView className="w-screen px-6 bg-[#00021C]">
            <Image className="w-28 mx-auto h-28 my-6 object-cover rounded-full" source={require("../../assets/images/avatar-template.jpg")} />
            <TextInput
                style={styles.input}
                placeholder='Nome'
                className='h-10 w-full rounded-xl text-sm font-400 mb-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.inputD}
                placeholder='Descrição'
                multiline={true}
                className='h-16 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Perfil do Facebook'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Perfil do Instagram'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Perfil do Twitter'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TouchableOpacity activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Atualizar Perfil</Text></TouchableOpacity>
        <View className="h-4"></View>
        </ScrollView>
        <Footer />
    </>)
}