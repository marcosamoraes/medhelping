import { ScrollView, View, Text } from "react-native";
import Footer from "../../sources/components/footer";
import Header from "../../sources/components/header";

export default function Home(){
    return(<>
    <Header/>
    <ScrollView className="w-screen py-6 px-6 bg-[#00021C]">
        <View className="w-full p-4 rounded-xl bg-[#03dadbb2]">
        <Text className="font-900 mb-3 text-white">Dúvidas sobre o diagnóstico ou conduta para o paciente?</Text>
        <Text className="font-700 text-white">Publique seu caso clínico e encontre a melhor solução!</Text>
        </View>
        
    </ScrollView>
    <Footer/>
    </>)
}