// OnboardingSecondPage.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Checkbox, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Config/Colors';

const OnboardingSecondPage = ({navigation}) => {
    const [carVanChecked, setCarVanChecked] = useState(false);
    const [bikeChecked, setBikeChecked] = useState(false);
    const [threeWheelerChecked, setThreeWheelerChecked] = useState(false);
    const [noneChecked, setNoneChecked] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (carVanChecked || bikeChecked || threeWheelerChecked || noneChecked) {
            navigation.navigate('onbf3');
        } else {
            // You can provide feedback to the user that they need to select at least one option
            alert('Please select at least one asset option.');
        }
    };


    return (
        <NativeBaseProvider>
            <Box style={styles.container}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.black} />
                    <Text fontWeight={"bold"} fontSize={16} color={Colors.black} >Back</Text>
                </TouchableOpacity>
                <Image
                    source={require("assets/pic.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Choose Your Assets</Text>
                <View style={styles.optionsContainer}>
                    <OptionItem label="Car/Van" checked={carVanChecked} onPress={() => setCarVanChecked(!carVanChecked)} />
                    <OptionItem label="Bike" checked={bikeChecked} onPress={() => setBikeChecked(!bikeChecked)} />
                    <OptionItem label="Three Wheeler" checked={threeWheelerChecked} onPress={() => setThreeWheelerChecked(!threeWheelerChecked)} />
                    <OptionItem label="None" checked={noneChecked} onPress={() => setNoneChecked(!noneChecked)} />
                </View>
                <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.BGColor}  />
                </TouchableOpacity>
            </Box>
        </NativeBaseProvider>
    );
};

const OptionItem = ({ label, checked, onPress }) => {
    return (
        <View style={styles.option}>
            <Checkbox
                checked={checked}
                onPress={onPress}
            />
            <Text style={styles.optionText}>{label}</Text>
        </View>
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
    optionsContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 20,
        marginTop: 25,
        marginLeft: -90,
        fontWeight: "normal",
    },
    option: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
    },
    image: {
        width: '90%',
        height: '30%',
        marginBottom:'6%',
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

export default OnboardingSecondPage;
