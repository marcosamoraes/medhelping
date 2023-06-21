import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../../sources/components/header";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Footer from "../../sources/components/footer";

export default function Configuracoes(){
    const router = useRouter();
    function handleEditConfig(){
        router.push('./verPerfil')
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

    return (<>
    <Header />
        <ScrollView className="w-screen px-6 bg-[#00021C]">
            <TextInput
                style={styles.input}
                placeholder='Idade'
                className='h-10 w-full rounded-xl text-sm font-400 mt-5 mb-3 px-4'
                placeholderTextColor={'white'}
            />
            
            <TextInput
                style={styles.input}
                placeholder='Faculdade'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Ano de conclusão'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='CRM'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Área de atuação'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Especialidades'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Facebook'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Instagram'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Twitter'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                placeholder='Link do Doctoralia'
                className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
            />
            <TouchableOpacity onPress={()=> handleEditConfig()} activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center pt-2 pb-1 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Atualizar</Text></TouchableOpacity>
        <View className="h-4"></View>
        </ScrollView>
        <Footer />
    
    </>)
}