import React, {useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions
} from 'react-native';
import {NativeBaseProvider, Input, VStack, Text, View, Image} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from '../../Config/Colors';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const OnboardingThirdPage = ({ route }) => {
    const navigation = useNavigation();

    const { incomeRange,carVanChecked, bikeChecked, threeWheelerChecked, noneChecked } = route.params;

    const [loanAmount, setLoanAmount] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };
    const handleNext = () => {
        navigation.navigate('OnboardingFourthPage',{
            incomeRange: incomeRange,
            carVanChecked: carVanChecked,
            bikeChecked: bikeChecked,
            threeWheelerChecked: threeWheelerChecked,
            noneChecked: noneChecked,
            loanAmount:loanAmount,
        });
    };
    const windowHeight = Dimensions.get('window').height;
    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <MaterialIcons name="keyboard-arrow-left" size={24}/>
                        <Text fontWeight={"bold"}>Back</Text>
                    </TouchableOpacity>
                    <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}
                                             contentContainerStyle={{flex: 1}}
                                             scrollEnabled={false}
                                             style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <Image
                                source={require("../../../assets/pic4.jpg")}
                                style={styles.image}
                                marginTop={windowHeight * 0.24}
                                resizeMode="contain"
                                alt="loan"
                            />
                            <VStack space={3} paddingX={6} marginTop={20}>
                                <Text style={styles.title}>Monthly loan payment{'\n'}(if any)?</Text>
                                <View marginBottom={10}>
                                    <Input
                                        w='100%'
                                        variant="underlined"
                                        InputLeftElement={
                                            <Text fontWeight="medium" marginRight={4} color={Colors.IconColor}>
                                                LKR
                                            </Text>
                                        }
                                        fontSize={20}
                                        value={loanAmount}
                                        onChangeText={text => {
                                            setLoanAmount(text);
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
        lineHeight: 30
    },
    image: {
        width: '60%',
        height: '24%',
        alignSelf: "center"
    },

    nextButton: {
        backgroundColor: Colors.Blue,
        borderRadius: 20,
        alignSelf: "flex-end"
    },
});


export default OnboardingThirdPage;
