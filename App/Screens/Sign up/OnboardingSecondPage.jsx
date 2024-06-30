import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NativeBaseProvider, Checkbox, VStack, View, Text, Image } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingSecondPage = ({ route }) => {
    const navigation = useNavigation();

    // Get incomeRange data
    const { fullName, email, gender, password, incomeRange } = route.params;

    const [carVanChecked, setCarVanChecked] = useState(false);
    const [bikeChecked, setBikeChecked] = useState(false);
    const [threeWheelerChecked, setThreeWheelerChecked] = useState(false);
    const [noneChecked, setNoneChecked] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (carVanChecked || bikeChecked || threeWheelerChecked || noneChecked) {
            // Navigate to next page and pass incomeRange data also with the carVanChecked etc... data.
            navigation.navigate('OnboardingThirdPage', {
                fullName,
                email,
                gender,
                password,
                incomeRange,
                carVanChecked,
                bikeChecked,
                threeWheelerChecked,
                noneChecked,
            });
        } else {
            alert('Please select at least one asset option.');
        }
    };

    const handleNoneChecked = () => {
        if (!noneChecked) {
            setCarVanChecked(false);
            setBikeChecked(false);
            setThreeWheelerChecked(false);
        }
        setNoneChecked(!noneChecked);
    };

    const handleOtherChecked = (setChecked, isChecked) => {
        if (noneChecked) {
            setNoneChecked(false);
        }
        setChecked(!isChecked);
    };

    const windowHeight = Dimensions.get('window').height;

    return (
        <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={24}/>
                        <Text fontWeight='bold'>Back</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require("../../../assets/pic.png")}
                    style={styles.image}
                    resizeMode="contain"
                    marginTop={windowHeight * 0.20}
                    alt='assets'
                />
                <VStack marginTop={20} space={10}>
                    <Text style={styles.title}>Choose Your Assets</Text>
                    <VStack style={styles.optionsContainer} space={4}>
                        <Checkbox
                            isChecked={carVanChecked}
                            onPress={() => handleOtherChecked(setCarVanChecked)}
                            value="Car/Van"
                            isDisabled={noneChecked}
                            colorScheme={"green"}
                        >
                            Car/Van
                        </Checkbox>
                        <Checkbox
                            isChecked={bikeChecked}
                            onPress={() => handleOtherChecked(setBikeChecked)}
                            value="Bike"
                            isDisabled={noneChecked}
                            colorScheme={"green"}
                        >
                            Bike
                        </Checkbox>
                        <Checkbox
                            isChecked={threeWheelerChecked}
                            onPress={() => handleOtherChecked(setThreeWheelerChecked)}
                            value="Threewheeler"
                            isDisabled={noneChecked}
                            colorScheme={"green"}
                        >
                            Three-wheeler
                        </Checkbox>
                        <Checkbox
                            isChecked={noneChecked}
                            onPress={handleNoneChecked}
                            value="None"
                            colorScheme={"green"}
                        >
                            None
                        </Checkbox>
                    </VStack>
                </VStack>
                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                        <MaterialIcons name="keyboard-arrow-right" size={40} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    backButton: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonContainer: {
        position: 'absolute',
        top:60,
        left: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 30
    },
    optionsContainer: {
        alignSelf: 'flex-start',
        fontWeight: "normal",
    },
    image: {
        width: '60%',
        height: '22%',
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom:60,
        right: 50,
    },
    nextButton: {
        backgroundColor: Colors.Blue,
        borderRadius: 20,
        alignSelf: "flex-end"
    },
});

export default OnboardingSecondPage;
