import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {NativeBaseProvider, Checkbox, VStack, View, Text, Image} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

const OnboardingSecondPage = ({ route }) => {
    const navigation = useNavigation();

    //get incomeRange data
    const {  fullName,email,gender,password,incomeRange } = route.params;

    const [carVanChecked, setCarVanChecked] = useState(false);
    const [bikeChecked, setBikeChecked] = useState(false);
    const [threeWheelerChecked, setThreeWheelerChecked] = useState(false);
    const [noneChecked, setNoneChecked] = useState(false);
    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (carVanChecked || bikeChecked || threeWheelerChecked || noneChecked) {

            //navigate to next page and pass incomeRage data also with the carVanChecked etc... data.
            navigation.navigate('OnboardingThirdPage', {
                fullName:fullName,
                email:email,
                gender:gender,
                password:password,
                incomeRange: incomeRange,
                carVanChecked: carVanChecked,
                bikeChecked: bikeChecked,
                threeWheelerChecked: threeWheelerChecked,
                noneChecked: noneChecked,
            });
        } else {
            alert('Please select at least one asset option.');
        }
    };

    const screen = Dimensions.get('screen');

    return (
        <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={24}/>
                    <Text fontWeight='bold'>Back</Text>
                </TouchableOpacity>
                <Image
                    source={require("../../../assets/pic.png")}
                    style={styles.image}
                    resizeMode="contain"
                    marginTop={screen.height * 0.20}
                    alt='assets'
                />
                <VStack marginTop={20} space={10}>
                    <Text style={styles.title}>Choose Your Assets</Text>
                    <VStack style={styles.optionsContainer} space={4}>
                        <Checkbox checked={carVanChecked} onPress={() => setCarVanChecked(!carVanChecked)}
                                  value="Car/Van" colorScheme={"blue"}>
                            Car/Van
                        </Checkbox>
                        <Checkbox checked={bikeChecked} onPress={() => setBikeChecked(!bikeChecked)} value="Bike"
                                  colorScheme={"blue"}>
                            Bike
                        </Checkbox>
                        <Checkbox checked={threeWheelerChecked}
                                  onPress={() => setThreeWheelerChecked(!threeWheelerChecked)} value="Threewheeler"
                                  colorScheme={"blue"}>
                            Three-wheeler
                        </Checkbox>
                        <Checkbox checked={noneChecked} onPress={() => setNoneChecked(!noneChecked)} value="None"
                                  colorScheme={"blue"}>
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
    nextButton: {
        backgroundColor: Colors.Blue,
        borderRadius: 20,
        alignSelf: "flex-end"
    },
});

export default OnboardingSecondPage;
