import { Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import {Control, Controller, Path} from 'react-hook-form';


// name: Path<ContentType>;
interface ICustomButton  {
    // control: Control<ContentType, object>;
    control: Control< any, any>;
    name: Path<any>;
    rules?: {};
    label?: string, 
    placeholder: string, 
    passord?: boolean, 
    editable?: boolean,
     multiline?: boolean, 
    numberOfLines?: number
}

function CustomInput({ control, name, label, placeholder, rules, passord = false, editable, multiline, numberOfLines }: ICustomButton) {
    const [secure, setSecure] = React.useState(passord ? true : false);


    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={{ marginBottom: 10 }}>
                    <TextInput
                        mode="outlined"
                        label={label}
                        placeholder={placeholder}
                        secureTextEntry={secure}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={error ? true : false }
                        editable={editable}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        style={{backgroundColor: "#fff"}}


                        right={passord ? <TextInput.Icon icon={secure ? "eye-off" : "eye"} onPress={() => setSecure((current => !current))} /> : null}
                    />
                    {error?.message && <Text style={{ color: "red" }}>{error?.message}</Text>}
                </View>
            )}

        />

    )
}

export default CustomInput

