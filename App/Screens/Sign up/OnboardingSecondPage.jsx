// OnboardingSecondPage.js
import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import {NativeBaseProvider, Checkbox, Box, VStack} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

const OnboardingSecondPage = () => {
    const navigation = useNavigation();

    const [carVanChecked, setCarVanChecked] = useState(false);
    const [bikeChecked, setBikeChecked] = useState(false);
    const [threeWheelerChecked, setThreeWheelerChecked] = useState(false);
    const [noneChecked, setNoneChecked] = useState(false);
    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (carVanChecked || bikeChecked || threeWheelerChecked || noneChecked) {
            navigation.navigate({name: 'OnboardingThirdPage'});
        } else {
            // You can provide feedback to the user that they need to select at least one option
            alert('Please select at least one asset option.');
        }
    };

    const OptionItem = ({ label, checked, onPress }) => {
        return (
            <View style={styles.option}>
                <Checkbox
                    color={Colors.Blue}
                    checked={checked}
                    onPress={onPress}
                />
                <Text style={styles.optionText}>{label}</Text>
            </View>
        );
    };

    const windowHeight = Dimensions.get('window').height;


    return (
        <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color='black' />
                    <Text fontWeight='bold'>Back</Text>
                </TouchableOpacity>
                <Image
                    source={require("../../../assets/pic.png")}
                    style={styles.image}
                    resizeMode="contain"
                    marginTop={windowHeight*0.20}
                />
                <VStack marginTop={20} space={10}>
                    <Text style={styles.title}>Choose Your Assets</Text>
                    <VStack style={styles.optionsContainer} space={4} >
                        <Checkbox checked={carVanChecked} onPress={() => setCarVanChecked(!carVanChecked)}  value="Car/Van">
                            Car/Van
                        </Checkbox>
                        <Checkbox checked={bikeChecked} onPress={() => setBikeChecked(!bikeChecked)}  value="Bike">
                            Bike
                        </Checkbox>
                        <Checkbox checked={threeWheelerChecked} onPress={() => setThreeWheelerChecked(!threeWheelerChecked)}  value="Threewheeler">
                            Threewheeler
                        </Checkbox>
                        <Checkbox checked={noneChecked} onPress={() => setNoneChecked(!noneChecked)}  value="None">
                            None
                        </Checkbox>
                    </VStack>
                    <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                        <MaterialIcons name="keyboard-arrow-right" size={40} color='white'/>
                    </TouchableOpacity>
                </VStack>
            </SafeAreaView>
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
        fontSize: 28,
        fontWeight: 'bold',
    },
    optionsContainer: {
        alignSelf: 'flex-start',
        fontWeight: "normal",
    },

    image: {
        width: '60%',
        height: '22%',

    },
    nextButton: {
        backgroundColor: Colors.Blue,
        borderRadius: 20,
        alignSelf: "flex-end"
    },
});

export default OnboardingSecondPage;
