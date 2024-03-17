import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeBaseProvider, View, Text, Image, VStack} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

const OnboardingFourthPage = () => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };
    const handleNext = () => {
        navigation.reset({index: 0, routes: [{name: 'TabNavigation'}]});
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
