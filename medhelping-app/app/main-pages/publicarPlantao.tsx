import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../sources/components/header";
export default function PublicarPlantao(){
    const styles = StyleSheet.create({
        input:{
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        },
        inputD:{
            borderColor: 'white',
            borderWidth: 1,
            color: 'white',
            textAlignVertical: 'top'
        }
    });
    return(<>
    <Header/>
    <ScrollView className="w-screen pt-6 px-6 bg-[#00021C]">
        
        <View className="w-full p-3 rounded-xl bg-[#03dadbb2]">
        <Text className="font-900 text-white">Publique seu plantão.</Text>
        </View>
        <View className="w-full px-2">
        <TextInput
      style={styles.input}
      placeholder='Unidade *'
      className='h-10 w-full rounded-xl text-sm font-400 mb-3 mt-5 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.input}
      placeholder='Cidade *'
      className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.input}
      placeholder='Data *'
      className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.input}
      placeholder='Hora de Entrada *'
      className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.input}
      placeholder='Hora de Saída *'
      className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.input}
      placeholder='Valor *'
      className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.inputD}
      placeholder='Descrição'
      multiline={true}
      className='h-14 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
      placeholderTextColor={'white'}
      />
         <TouchableOpacity activeOpacity={0.8} className="flex-row w-full bg-[#03dadbb2] justify-center py-2 rounded-xl my-3 items-center"><Text className="text-white font-700 text-sm ml-2">Publicar Diagnóstico</Text></TouchableOpacity>
    <View className="h-10"></View>
    </View>
    </ScrollView>
    
    </>)
}