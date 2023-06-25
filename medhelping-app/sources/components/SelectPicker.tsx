import { Text, View } from "react-native"
import { Picker } from '@react-native-picker/picker';

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

  return (
    <>
      <Text className="pt-3 text-white">{ name }</Text>
      <View style={{ 
        borderRadius: 15, 
        borderWidth: 1,
        borderColor: "white", 
        overflow: "hidden", 
        height: 50, 
        marginTop: 10,
      }} >
        <Picker
          style={{ color: "#FFF", marginTop: -5 }}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
        >
          <Picker.Item label="Selecione..." value={null} />
          {items.length > 0 && items.map((item, index) => (
            <Picker.Item key={index} label={item.name} value={item.id} />
          ))}
        </Picker>
      </View>
    </>
  )
}