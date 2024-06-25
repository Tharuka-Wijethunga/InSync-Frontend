import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { NativeBaseProvider, VStack, Text, View, Image, Radio, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingThirdPage = ({ route }) => {
    const navigation = useNavigation();

    const {fullName, email, gender, password,incomeRange,carVanChecked,bikeChecked,threeWheelerChecked,noneChecked,} = route.params;

    const [occupation, setOccupation] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (occupation) {
            navigation.navigate('OnboardingFourthPage', {
                fullName: fullName,
                email: email,
                gender: gender,
                password: password,
                incomeRange: incomeRange,
                carVanChecked: carVanChecked,
                bikeChecked: bikeChecked,
                threeWheelerChecked: threeWheelerChecked,
                noneChecked: noneChecked,
                occupation: occupation,
            });
        } else {
            alert('Please select an occupation.');
        }
    };

    const windowHeight = Dimensions.get('window').height;

    return (
        <NativeBaseProvider>
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={24} />
                        <Text fontWeight="bold">Back</Text>
                    </TouchableOpacity>
                        <Image
                            source={require("../../../assets/pic6.png")}
                            style={styles.image}
                            resizeMode="contain"
                            marginTop={windowHeight * 0.20}
                            alt='occupation1'
                        />
                        <VStack marginTop={20} space={10}>
                            <Text style={styles.title}>What is your occupation?</Text>
                            <VStack style={styles.optionsContainer} space={4}>
                                <Radio.Group
                                    name="occupation"
                                    value={occupation}
                                    onChange={(value) => setOccupation(value)}
                                    colorScheme="green"
                                >
                                    <VStack space={4}>
                                        <Radio value="Student">Student</Radio>
                                        <Radio value="Doctor">Doctor</Radio>
                                        <Radio value="Engineer">Engineer</Radio>
                                        <Radio value="Teacher">Teacher</Radio>
                                        <Radio value="Software Engineer">Software Engineer</Radio>
                                        <Radio value="Other">Other</Radio>
                                    </VStack>
                                </Radio.Group>
                            </VStack>
                        </VStack>
                    <View style={styles.nextButtonContainer}>
                        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                            <MaterialIcons name="keyboard-arrow-right" size={40} color='white'/>
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
        backgroundColor: 'white',
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
        lineHeight: 30,
    },

    optionsContainer: {
        alignSelf: 'flex-start',
        fontWeight: "normal",
    },
    image: {
        width: '70%',
        height: '22%',

    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
    nextButton: {
        backgroundColor: Colors.Blue,
        borderRadius: 20,
        alignSelf: "flex-end"
    },
});

export default OnboardingThirdPage;
