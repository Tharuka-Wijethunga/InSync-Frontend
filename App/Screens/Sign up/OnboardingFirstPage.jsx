import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions} from 'react-native';
import {NativeBaseProvider, View, Input, Text, Image, VStack} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const OnboardingFirstPage = ({ route }) => {
    const navigation = useNavigation();
    const [incomeRange, setIncomeRange] = useState('');

    const { fullName,email,gender,password } = route.params;

    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (incomeRange !== '') {
            //navigate to second page and pass incomeRage data
            navigation.navigate('OnboardingSecondPage', {
                fullName:fullName,
                email:email,
                gender:gender,
                password:password,
                incomeRange: incomeRange,
            });
        } else {
            alert('Please give an income range.');
        }
    };

    const windowHeight = Dimensions.get('window').height;

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={24} color='black'/>
                        <Text fontWeight='bold'>Back</Text>
                    </TouchableOpacity>
                    <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}
                                             contentContainerStyle={{flex: 1}}
                                             scrollEnabled={false}
                                             style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <Image
                                source={require("../../../assets/pic2.jpg")}
                                style={styles.image}
                                marginTop={windowHeight * 0.28}
                                resizeMode={"contain"}
                                alt='income'
                            />

                            <VStack space={3} paddingX={6} marginTop={20}>
                                <Text style={styles.title}>What's your Income range ?</Text>
                                <View marginBottom={10}>
                                    <Input
                                        w='90%'
                                        variant="underlined"
                                        InputLeftElement={
                                            <Text fontWeight="medium" marginRight={4} color={Colors.IconColor}>
                                                LKR
                                            </Text>
                                        }
                                        fontSize={20}
                                        value={incomeRange}
                                        onChangeText={text => {
                                            setIncomeRange(text);
                                        }}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View paddingRight={2}>
                                    <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                                        <MaterialIcons name="keyboard-arrow-right" size={40} color='white'/>
                                    </TouchableOpacity>
                                </View>
                            </VStack>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
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
        lineHeight: 30,
    },
    image: {
        width: '60%',
        height: '22%',
        alignSelf: "center"
    },

    nextButton: {
        backgroundColor: Colors.Blue,
        borderRadius: 20,
        alignSelf: "flex-end"
    },
});

export default OnboardingFirstPage;
