
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NativeBaseProvider,Box, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";

const OnboardingThirdPage = () => {
    const navigation = useNavigation();

    const [incomeRange, setIncomeRange] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };
    const handleNext = () => {
        if (incomeRange !== '') {
            setIsValid(true);
            navigation.reset({index: 0, routes: [{name: 'OnboardingFourthPage'}]});
        } else {
            // You can provide feedback to the user that they need to select an income range
            alert('Please give an income range.');
            setIsValid(false);
        }
    };

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box style={styles.container}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.black} />
                        <Text fontWeight={"bold"} fontSize={16} color={Colors.black} >Back</Text>
                    </TouchableOpacity>
                    <Image
                        source={require("../../../assets/pic4.jpg")} // Provide the path to your image file
                        style={styles.image}
                        resizeMode="contain" // Ensure the image fits within the container
                    />
                    <Text style={styles.title}>Monthly loan payment (if any) ?</Text>
                    <View style={styles.inputContainer}>
                        <Input
                            variant="underlined"
                            placeholder="LKR."
                            value={incomeRange}
                            onChangeText={text => {
                                setIncomeRange(text);
                            }}
                            keyboardType="numeric" // Only allow numeric input
                        />

                    </View>

                    <TouchableOpacity onPress={ handleNext} style={styles.nextButton} >
                        <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.BGColor} />
                    </TouchableOpacity>
                </Box>
            </TouchableWithoutFeedback>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    backButton: {
        position: 'absolute',
        top: '8%',
        left: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:'2%',
        marginTop: '10%',
    },
    image: {
        width: '90%',
        height:'30%',
        marginBottom: '6%',
    },
    inputContainer: {
        width: '80%',
        position: 'relative',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nextButton: {
        position: 'absolute',
        bottom: '3%',
        right: '6%',
        backgroundColor: Colors.Blue,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius:200,

    },
});


export default OnboardingThirdPage;
