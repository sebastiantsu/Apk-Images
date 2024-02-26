import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useCloudflareImageUploader from './CloudflareImageUploader'; 

export default function ImagePickerExample() {
    const { submitImage, variants } = useCloudflareImageUploader();  
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,  3],
            quality:  1,
        });

        if (!result.cancelled && result.assets.length >  0 && result.assets[0].uri) {
            setImage(result.assets[0].uri);
            setIsImageSelected(true);
        }
    };

    const uploadImage = async () => {
        if (isImageSelected) {
            const formData = new FormData();
            formData.append("file", { uri: image });
            submitImage(formData);
        }
    };

    useEffect(() => {
        if (variants.length >  0) {
            setIsImageSelected(true);
        }
    }, [variants]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <Button title="Elige una imagen" onPress={pickImage} color="#3498db" />
                {isImageSelected && (
                    <>
                        <Button title="Subir" onPress={uploadImage} color="#2ecc71" />
                        <Image source={{ uri: image }} style={styles.image} />
                        {variants.map((variantUrl, index) => (
                            <View key={index} style={styles.variantContainer}>
                                <Text>Variante {index +  1}</Text>
                                <Image source={{ uri: variantUrl }} style={styles.variantImage} />
                                <Text>{variantUrl}</Text>
                            </View>
                        ))}
                    </>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow:  1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:  20
    },
    innerContainer: {
        flex:  1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width:  200,
        height:  200,
        marginTop:  20,
    },
    variantContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:  10,
    },
    variantImage: {
        width:  200,
        height:  200,
    },
});
