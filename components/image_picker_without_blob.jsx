import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uriToBlob } from './uriToBlob';

export default function Image_Picker_Without_Blob() {
    const [image, setImage] = useState(null);
    const [pickerImage, setPickerImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // console.log("res: ", result);

        if (!result.canceled) {

            const res = await uriToBlob(result.assets[0].uri)
            // console.log("er: ", res)
            setImage(res);
            setPickerImage(result.assets[0].uri)
        }
    };

    return { pickImage, image, pickerImage }

    // return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //         <Button title="Pick an image from camera roll" onPress={pickImage} />
    //         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    //     </View>
    // );
}
