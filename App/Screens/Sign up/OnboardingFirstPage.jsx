import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { NativeBaseProvider, Box, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";

const OnboardingFirstPage = () => {
    const navigation = useNavigation();

    const [incomeRange, setIncomeRange] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (incomeRange !== '') {
            navigation.navigate({name: 'OnboardingSecondPage'});
        } else {
            alert('Please give an income range.');
        }
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box style={styles.container}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={Dimensions.get('window').width * 0.06} color={Colors.black} />
                        <Text fontWeight="bold" fontSize={Dimensions.get('window').width * 0.04} color={Colors.black} >Back</Text>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("../../../assets/pic2.jpg")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.title}>What's your Income range ?</Text>
                    <View style={styles.inputContainer}>
                        <Input
                            variant="underlined"
                            placeholder="LKR."
                            value={incomeRange}
                            onChangeText={text => {
                                setIncomeRange(text);
                            }}
                            keyboardType="numeric" // Only allow numeric input
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                    </View>
                    <TouchableOpacity onPress={handleNext} style={styles.nextButton} >
                        <MaterialIcons name="keyboard-arrow-right" size={Dimensions.get('window').width * 0.06} color={Colors.BGColor} />
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
        top: Dimensions.get('window').height * 0.08,
        left: Dimensions.get('window').width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: Dimensions.get('window').width * 0.08,
        fontWeight: 'bold',
        marginBottom: Dimensions.get('window').height * 0.02,
        marginTop: Dimensions.get('window').height * 0.1,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.3,
        marginBottom: Dimensions.get('window').height * 0.04,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    inputContainer: {
        width: Dimensions.get('window').width * 0.8,
        position: 'relative',
    },
    nextButton: {
        position: 'absolute',
        bottom: Dimensions.get('window').height * 0.03,
        right: Dimensions.get('window').width * 0.06,
        backgroundColor: Colors.Blue,
        paddingVertical: Dimensions.get('window').height * 0.015,
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        borderRadius: Dimensions.get('window').width * 0.05,
    },
});

export default OnboardingFirstPage;
