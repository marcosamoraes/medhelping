import IArticle from "@interfaces/IArticle";
import ICategory from "@interfaces/ICategory";
import { useNavigation } from "expo-router";
import { ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";

type ArticleCardProps = {
    article: IArticle
    category?: ICategory
}
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.8,
    }
});

const backgroundImage = require('../../assets/images/img-fundo-exame.png')

export default function ArticleCard({ article: { id, title, anonymous_publication, image, user, categories, created_at}, category }: ArticleCardProps) {
    const navigation = useNavigation();

    function handleClick(){
        navigation.navigate("viewPublication", {id: id})
    }

    let articleImage = backgroundImage
    let fileType = ''

    if (image) {
        fileType = image.split('.').pop()?.toLowerCase() as string
        
        if (fileType !== 'mp4' && fileType !== 'mov') {
            articleImage = { uri: image }
        }
    }

    return (<>
        <TouchableOpacity onPress={() => handleClick()} activeOpacity={0.8} style={{width: '45%'}} className="mb-6 aspect-square">
            <ImageBackground style={styles.imageBackground} className="w-full relative cover items-center justify-center" defaultSource={backgroundImage} source={articleImage}>
                <Text className="font-500 absolute top-1 left-1 text-xs px-3 pt-1 text-white rounded-full bg-[#000000cc]">{category?.name ?? (categories[0]?.name ?? 'Sem categoria')}</Text>
                <Text className="font-900 pb-2 pt-4 px-2 text-base text-center text-white">{title}</Text>
                <Text className="font-400 text-center text-xs text-white">{!anonymous_publication && user ? user.name : 'Anônimo'} em {created_at.split(' ')[0]}</Text>
            </ImageBackground>
        </TouchableOpacity>
    </>)
}