import { Image, ScrollView , View, Text} from "react-native";
import Footer from "../../sources/components/footer";
import Header from "../../sources/components/header";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ComentarioPublicacao from "../../sources/components/comentarioPublicacao";
import SidebarProvider from "../../sources/config/Provider";
import SideMenu from "../../sources/components/sideMenu";
import TouchableBlur from "../../sources/components/touchableBlur";
export default function VerPublicacao(){
    return(<>
    <SidebarProvider>
    <TouchableBlur/>
    <Header/>
    <SideMenu/></SidebarProvider>
    <ScrollView className="w-screen bg-[#00021C]">
       <Image className="w-full h-40 object-cover" source={require('../../assets/images/img-fundo-exame.png')}/>
        <View className="p-4 border-b mb-4 border-b-[#1F2935]">
        <Text className="text-white text-center font-900 text-xl py-2">Testes do Coração</Text>
        <Text className="text-white text-center font-500 text-sm py-2">Anônimo em 03/03/2023</Text>
        <Text className="text-white text-center font-500 text-sm py-2">Do mesmo modo, a crescente influência da mídia talvez venha a ressaltar a relatividade dos relacionamentos verticais entre as hierarquias.</Text>
        <View className="flex-row justify-between items-center px-2 my-2"><FontAwesome5 name="share" size={24} color="white" /><AntDesign name="like1" size={24} color="white" /></View>
        </View>
    {/* Adicionar imagem como props no componente depois */}
    <ComentarioPublicacao username='Usuario 1' content='O incentivo ao avanço tecnológico, assim como a execução dos pontos do programa nos obriga à análise de alternativas às soluções ortodoxas.'/>
    <ComentarioPublicacao username='Usuario 1' content='O incentivo ao avanço tecnológico, assim como a execução dos pontos do programa nos obriga à análise de alternativas às soluções ortodoxas.'/>
    <ComentarioPublicacao username='Usuario 1' content='O incentivo ao avanço tecnológico, assim como a execução dos pontos do programa nos obriga à análise de alternativas às soluções ortodoxas.'/>
    </ScrollView>
    <Footer/>
    </>)
}