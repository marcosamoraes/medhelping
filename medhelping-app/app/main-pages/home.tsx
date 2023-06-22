import { ScrollView, View, Text } from "react-native";
import Footer from "../../sources/components/footer";
import Header from "../../sources/components/header";
import ExamCard from "../../sources/components/exam-card";
import SideMenu from "../../sources/components/sideMenu";
import SidebarProvider from "../../sources/config/Provider";
import TouchableBlur from "../../sources/components/touchableBlur";

export default function Home(){
    return(<>
    <SidebarProvider>
        <TouchableBlur/>
    <Header/>
 <SideMenu/>
    
    <ScrollView className="w-screen py-6 px-6 bg-[#00021C]">
        <View className="w-full p-4 rounded-xl bg-[#03dadbb2]">
        <Text className="font-900 mb-3 text-white">Dúvidas sobre o diagnóstico ou conduta para o paciente?</Text>
        <Text className="font-700 text-white">Publique seu caso clínico e encontre a melhor solução!</Text>
        </View>
        <View className="flex-row flex-wrap pt-6 pb-4 px-1 justify-between">
            {/* Se date não vier como string, alterar para string antes de passar pro props ou mudar o typescript do card */}
            <ExamCard category="Categoria 1" exam="Testes do coração" name="Clark" date="03/03/2003" />
            <ExamCard category="Categoria 1" exam="Testes do coração" name="Ralf" date="03/03/2003" />
            <ExamCard category="Categoria 1" exam="Testes do coração" name="Leona" date="03/03/2003" />
            <ExamCard category="Categoria 1" exam="Testes do coração" name="Kyo" date="03/03/2003" />
            <ExamCard category="Categoria 1" exam="Testes do coração" name="Iori" date="03/03/2003" />
        </View>
    </ScrollView>
    <Footer/></SidebarProvider>
    </>)
}