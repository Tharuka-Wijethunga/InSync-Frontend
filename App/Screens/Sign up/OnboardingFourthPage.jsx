import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeBaseProvider, View, Text, Image, VStack} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

const OnboardingFourthPage = ({ route }) => {
    const navigation = useNavigation();

    //getting all the data from the previous onboarding pages
    const { fullName,email,gender,password,incomeRange,carVanChecked, bikeChecked, threeWheelerChecked, noneChecked,occupation } = route.params;
    const handleBack = () => {
        navigation.goBack();
    };
    const handleNext = () => {


        //post request to pass this data to the backend
        fetch('https://a831-2402-4000-11c5-60ea-9006-9e51-2f9d-b006.ngrok-free.app/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName:fullName,
                email:email,
                gender:gender,
                password:password,
                incomeRange:incomeRange,
                car:carVanChecked,
                bike:bikeChecked,
                threeWheeler:threeWheelerChecked,
                none:noneChecked,
                occupation: occupation,
            })
        })
            .then(response => {
                console.log("successfully added onboarding data");

            })
            .catch(error => console.error(error));

        navigation.navigate('Login');

    };

    const windowHeight = Dimensions.get('window').height;

    return (
        <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={24}/>
                    <Text fontWeight={"bold"}>Back</Text>
                </TouchableOpacity>
                <VStack style={{flex: 1}}>
                    <Text style={styles.title} marginTop={windowHeight * 0.20}>Welcome !</Text>
                    <View marginTop={20}>
                        <Image
                            source={require("../../../assets/pic3.jpg")}
                            style={styles.image}
                            alt="Welcome"
                        />
                    </View>
                    <View marginTop={-20}>
                        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                            <Text style={styles.buttonText}>Let's Sync In!</Text>
                        </TouchableOpacity>
                    </View>

                </VStack>

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
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 42,
        alignSelf: "center"
    },
    nextButton: {
        backgroundColor: Colors.Blue,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: '50%',
        alignSelf: "center"
    },
});

export default OnboardingFourthPage;
