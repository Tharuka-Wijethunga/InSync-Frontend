import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Animated,
    Easing
} from 'react-native';
import { NativeBaseProvider, View, Input, Text, Image, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const OnboardingFirstPage = ({ route }) => {
    const navigation = useNavigation();
    const [incomeRange, setIncomeRange] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const { fullName,email, gender, password } = route.params;

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateYAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;


    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (incomeRange !== '') {
            //navigate to second page and pass incomeRage data
            navigation.navigate('OnboardingSecondPage', {
                fullName: fullName,
                email: email,
                gender: gender,
                password: password,
                incomeRange: incomeRange,
            });
        } else {
            alert('Please give an income range.');
        }
    };
    //
    // useEffect(() => {
    //     const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
    //         setKeyboardVisible(true);
    //     });
    //     const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    //         setKeyboardVisible(false);
    //     });
    //
    //     return () => {
    //         keyboardDidHideListener.remove();
    //         keyboardDidShowListener.remove();
    //     };
    // }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const keyboardDidShow = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration:0,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: -50,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,

            }),
            Animated.timing(scaleAnim, {
                toValue: 0.7,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const keyboardDidHide = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    }

    const windowHeight = Dimensions.get('window').height;

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <MaterialIcons name="keyboard-arrow-left" size={24} />
                            <Text fontWeight='bold'>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={{ flex: 1 }}
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                    >
                        <Animated.Image source={require("../../../assets/pic2.jpg")} style={[styles.image,{ transform: [{ scale: scaleAnim }],marginTop: windowHeight*0.22 }]} />
                        {/*<View style={{ flex: 1 }}>*/}
                        {/*<VStack marginTop={10} space={10}>*/}
                            <Animated.View style={{  transform: [{ translateY: translateYAnim }] }}>
                            <VStack marginTop={10} space={10}>
                            <Text style={styles.title}>What's your Income range?</Text>
                                <View marginBottom={10}>
                                    <Input
                                        w='90%'
                                        variant="underlined"
                                        mt={-9}
                                        InputLeftElement={
                                            <Text fontWeight="medium" marginRight={4} color={Colors.IconColor} mt={2}>
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
                            </VStack>
                            </Animated.View>

                            </KeyboardAwareScrollView>

                    <Animated.View style={[styles.nextButtonContainer ,{opacity:fadeAnim}]}>
                            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                                <MaterialIcons name="keyboard-arrow-right" size={40} color='white' />
                            </TouchableOpacity>
                    </Animated.View>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    image: {
        width: '70%',
        height: '30%',
        alignSelf: "center",
        resizeMode: "contain"

    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 60,
        right: 50,
    },
    nextButton: {
        backgroundColor: Colors.Blue,
        borderRadius: 20,
        alignSelf: "flex-end"
    },
});

export default OnboardingFirstPage;
