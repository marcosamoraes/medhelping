import { useNavigation } from "expo-router";
import { ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ExamCardProps {
    id: number;
    categories: string[];
    exam: string;
    name: string;
    date: string;
    image: string;

}
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover'
    }
});

const backgroundImage = require('../../assets/images/img-fundo-exame.png')

export default function ExamCard({ id, categories, exam, name, date, image }: ExamCardProps) {
    const navigation = useNavigation();
    function handleClick(){
        navigation.navigate("viewPublication", { id })
    }
    return (<>
        <TouchableOpacity onPress={() => handleClick()} activeOpacity={0.8} style={{width: '45%'}} className="mb-6 aspect-square">
            <ImageBackground style={styles.imageBackground} className="w-full relative cover items-center justify-center" source={image? image : backgroundImage}>
                <Text className="font-500 absolute top-1 left-1 text-xs px-3 pt-1 text-white rounded-full bg-[#000000cc]">{categories.map((i) => i+' ')}</Text>
                <Text className="font-900 pb-2 pt-4 px-2 text-base text-center text-white">{exam}</Text>
                <Text className="font-400 text-center text-xs text-white">{name}, em {date}</Text>
            </ImageBackground>
        </TouchableOpacity>
    </>)
}