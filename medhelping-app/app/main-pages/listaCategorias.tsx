import { ScrollView, View, TextInput, StyleSheet } from "react-native";
import Header from "../../sources/components/header";
import Footer from "../../sources/components/footer";
import CategoriaCard from "../../sources/components/categoriaCard";

export default function ListaCategorias(){
    const styles = StyleSheet.create({
        input: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        }});
    return(<>
    <Header/>
    <View className="w-screen px-6 bg-[#00021C]">
    <TextInput
                style={styles.input}
                placeholder='Pesquisar...'
                className='h-10 w-full rounded-2xl text-sm font-400 my-6 px-4'
                placeholderTextColor={'white'}
            />
    </View>
    <ScrollView className="h-full bg-[#00021C]">
    <View className="px-6 h-full justify-between flex-row flex-wrap bg-[#00021C] w-screen">
        <CategoriaCard categoryname="Categoria 1" username="Alienigena" date="02/02/0220"/>
        <CategoriaCard categoryname="Categoria 1" username="Alienigena" date="02/02/0220"/>
        <CategoriaCard categoryname="Categoria 1" username="Alienigena" date="02/02/0220"/>
        <CategoriaCard categoryname="Categoria 1" username="Alienigena" date="02/02/0220"/>
        <CategoriaCard categoryname="Categoria 1" username="Alienigena" date="02/02/0220"/>
    </View></ScrollView>
    <Footer/>
    </>)
}