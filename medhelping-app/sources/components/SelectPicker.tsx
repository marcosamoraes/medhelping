import { StyleSheet, Text, View } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

type Item = {
  id: number;
  name: string;
}

type SelectPickerProps = {
  name: string;
  items: Item[];
  value: string|null;
  setValue: (value: any) => void;
}

export default function SelectPicker({ name, value, setValue, items } : SelectPickerProps) {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ inputValue, setInputValue ] = useState<string>('')

  const styles = StyleSheet.create({
    input: {
        borderColor: 'white',
        borderWidth: 1,
        color: 'white'
    },
  });

  const handleValueChange = (value: any) => {
    setValue(value)
    setInputValue(items.find(item => item.id === value)?.name ?? '')
  }

  return (
    <>
      <Text className="pt-3 text-white">{ name }</Text>
      <TextInput
          style={styles.input}
          placeholder="Selecione..."
          className='h-10 w-full rounded-xl text-sm font-400 mb-3 mt-5 px-4'
          placeholderTextColor={'white'}
          value={inputValue}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
      />

      {isOpen && (
        <View style={{ 
          borderRadius: 15, 
          borderWidth: 1,
          borderColor: "white", 
          backgroundColor: "#FFF",
          marginTop: -150
        }} >
          <Picker
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => handleValueChange(itemValue)}
          >
            <Picker.Item label="Selecione..." value={null} />
            {items.length > 0 && items.map((item, index) => (
              <Picker.Item key={index} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      )}
    </>
  )
}