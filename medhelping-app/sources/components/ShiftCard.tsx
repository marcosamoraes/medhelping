import IArticle from "@interfaces/IArticle";
import IShift from "@interfaces/IShift";
import { useNavigation } from "expo-router";
import { ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";

type ShiftCardProps = {
    shift: IShift
}
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover'
    }
});

const backgroundImage = require('../../assets/images/img-fundo-exame.png')

export default function ShiftCard({ shift: { id, city, care_unit, anonymous_publication, user, created_at} }: ShiftCardProps) {
    const navigation = useNavigation();

    function handleClick(){
        navigation.navigate("viewShift", {id: id})
    }

    return (<>
        <TouchableOpacity onPress={() => handleClick()} activeOpacity={0.8} style={{width: '45%'}} className="mb-6 aspect-square">
            <ImageBackground style={styles.imageBackground} className="w-full relative cover items-center justify-center" source={backgroundImage}>
                <Text className="font-500 absolute top-1 left-1 text-xs px-3 pt-1 text-white rounded-full bg-[#000000cc]">Plantão</Text>
                <Text className="font-900 pb-2 px-2 text-base text-center text-white">{ city }</Text>
                <Text className="font-900 pb-2 px-2 text-base text-center text-white">{ care_unit.name }</Text>
                <Text className="font-400 text-center text-xs text-white">{!anonymous_publication && user ? user.name : 'Anônimo'} em {created_at.split(' ')[0]}</Text>
            </ImageBackground>
        </TouchableOpacity>
    </>)
}