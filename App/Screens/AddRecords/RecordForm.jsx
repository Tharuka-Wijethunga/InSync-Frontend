import React from 'react';
import {Box, Button, HStack, IconButton, Input, NativeBaseProvider, Text, View, VStack} from "native-base";
import Colors from "../../Config/Colors";
import {FontAwesome6, MaterialIcons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

const RecordForm = () => {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <VStack space={4} w="94%">
                    <Box w="100%" rounded="2xl" shadow={3} bg="white">
                        <VStack paddingX={4} paddingY={3} space={4}>
                            <Box h="46px" bg={Colors.BGColor} rounded="9999"></Box>
                            <VStack space={2}>
                                <Text fontSize={20} fontWeight="medium">Amount</Text>
                                <Input
                                    variant="filled"
                                    placeholder="-0"
                                    InputLeftElement={
                                        <Text fontWeight="bold" paddingLeft={4}>
                                            LKR
                                        </Text>
                                    }
                                    placeholderTextColor={Colors.Red}
                                    bg={Colors.BGColor}
                                    rounded="20"
                                    h="80px"
                                    fontSize={48}
                                    textAlign="right"
                                    caretHidden={true}
                                    borderWidth={0}
                                    keyboardType="numeric"
                                    color={Colors.Red}
                                />
                            </VStack>
                            <VStack>
                                <Text fontSize={16} fontWeight="medium">Payment type</Text>
                                <HStack space={20}>
                                    <IconButton
                                        icon={<FontAwesome6 name="credit-card" size={36} color={Colors.IconColor} />}
                                        _pressed={{
                                            _icon: {color: Colors.Blue}
                                        }}
                                        bgColor="transparent"
                                    />
                                    <IconButton
                                        icon={<FontAwesome6 name="money-bill-1" size={38} color={Colors.IconColor}/>}
                                        bgColor="transparent"
                                        _pressed={{
                                            _icon: {color: Colors.Blue}
                                        }}
                                    />
                                </HStack>
                            </VStack>
                            <VStack>
                                <Text fontSize={16} fontWeight="medium">Category</Text>
                                <HStack>
                                    <IconButton
                                        icon={<MaterialIcons name="keyboard-arrow-right" size={36}
                                                             color="black"/>}
                                        onPress={()=>navigation.navigate('Category')}
                                        borderRadius="full"
                                        _pressed={{
                                            bg: "blueGray.200:alpha.50"
                                        }}
                                    />
                                </HStack>
                            </VStack>
                            <VStack space={3}>
                                <Text fontSize={16} fontWeight="medium">Date & Time</Text>
                                <Input
                                    variant="filled"
                                    placeholder="Today, 13.30"
                                    InputRightElement={
                                        <Text fontWeight="bold" paddingRight={4}>
                                            LKR
                                        </Text>
                                    }
                                    placeholderTextColor="black"
                                    bg={Colors.BGColor}
                                    rounded="20"
                                    h="62px"
                                    fontSize={20}
                                    textAlign="left"
                                    caretHidden={true}
                                    borderWidth={0}
                                    keyboardType="numeric"
                                    color={Colors.Red}
                                />
                            </VStack>
                        </VStack>
                    </Box>
                    <Button bg={Colors.Blue} borderRadius={"full"} w={320} size="md" alignSelf="center">
                        Save
                    </Button>
                </VStack>
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.BGColor,
        alignItems: 'center',
        flex: 1,

    }
})
export default RecordForm;