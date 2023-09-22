import { useState } from "react";
import { View, Platform, Text } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


export const DateTime = ({ show = false, setShow, currentMode, date, setDate }) => {

  // const [mode, setMode] = useState(currentMode);

  const onChange = (event, selectedDate) => {
    // const currentDate = selectedDate;
    setShow(false);
    // setDate(currentDate);
    setDate(selectedDate);
  };

  // const showMode = (currentMode) => {
  //   if (Platform.OS === 'android') {
  //     setShow(false);
  //     // for iOS, add a button that closes the picker
  //   }
  //   setMode(currentMode);
  // };


  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={currentMode}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </View>
  );
};
