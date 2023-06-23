import { useRouter } from "expo-router";
import { ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ExamCardProps {
    category: string;
    exam: string;
    name: string;
    date: string;
}
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover'
    }
});

const backgroundImage = require('../../assets/images/img-fundo-exame.png')

export default function ExamCard(props: ExamCardProps) {
    const router = useRouter();
    function handleClick(){
        router.push('./verPublicacao')
    }
    const { category, exam, name, date } = props;
    return (<>
        <TouchableOpacity onPress={() => handleClick()} activeOpacity={0.8} style={{width: '45%'}} className="mb-6 aspect-square">
            <ImageBackground style={styles.imageBackground} className="w-full relative cover items-center justify-center" source={backgroundImage}>
                <Text className="font-500 absolute top-1 left-1 text-xs px-3 pt-1 text-white rounded-full bg-[#000000cc]">{category}</Text>
                <Text className="font-900 pb-2 pt-4 px-2 text-base text-center text-white">{exam}</Text>
                <Text className="font-400 text-center text-xs text-white">{name}, em {date}</Text>
            </ImageBackground>
        </TouchableOpacity>
    </>)
}