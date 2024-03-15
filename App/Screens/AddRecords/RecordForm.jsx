import React ,{useState, useRef, useEffect} from 'react';
import {
    Box,
    Button,
    HStack,
    IconButton,
    Input,
    NativeBaseProvider,
    Text,
    View,
    VStack,
    Avatar,
    Spacer,
    Pressable
} from "native-base";
import Colors from "../../Config/Colors";
import {MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from "react-native";
import Date from "./DateTime/Date";
import Time from "./DateTime/Time"
import Category from "./Category";

const RecordForm = () => {
    const [incomePressed, setIncomePressed] = useState(false);
    const [expensePressed, setExpensePressed] = useState(true);
    const [bankPressed, setBankPressed] = useState(false);
    const [cashPressed, setCashPressed] = useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);

    const [selectedCategory,setSelectedCategory]=useState("tag-plus" );
    const [avatarColor,setAvatarColor]=useState(Colors.IconColor);
    const [categorydName,setCategorydName]=useState("Select a Category");


    const handleIncomePress = () => {
        setIncomePressed(true);
        setExpensePressed(false);
    };

    const handleExpensePress = () => {
        setExpensePressed(true);
        setIncomePressed(false);
    };
    const handleBankPress = () => {
        setBankPressed(true);
        setCashPressed(false);
    };

    const handleCashPress = () => {
        setCashPressed(true);
        setBankPressed(false);
    };

    const [placeholder, setPlaceholder] = useState('-0');
    const [placeholderColor, setPlaceholderColor] = useState(Colors.Red);

    const inputRef = useRef();

    useEffect(()=> {
        if (inputRef.current){
            inputRef.current.focus();
        }
    }, [])

    return (
        <NativeBaseProvider theme={theme}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <VStack space={4} w="94%">
                    <Box w="100%" rounded="2xl" shadow={3} bg="white">
                        <VStack paddingX={4} paddingY={3} space={4}>
                            <Box h="50px" bg={Colors.BGColor} rounded="2xl" alignItems={"center"} justifyContent={"center"}>
                                <HStack space={1}>
                                    <Pressable w='48%'
                                               borderRadius={20}
                                               height={34}
                                               justifyContent='center'
                                               onPress={()=>{
                                                   handleExpensePress();
                                                   setPlaceholder('-0');
                                                   setPlaceholderColor(Colors.Red);
                                               }}
                                               style={{backgroundColor: expensePressed ? '#EF4444' : 'white'}}
                                    >
                                        <Text fontSize={14}
                                              color={(expensePressed ? 'white':'black')}
                                              alignSelf='center'
                                        >
                                            Expense
                                        </Text>
                                    </Pressable>
                                    <Pressable w='48%'
                                               borderRadius={20}
                                               height={34}
                                               justifyContent='center'
                                               onPress={()=>{
                                                   handleIncomePress();
                                                   setPlaceholder('+0');
                                                   setPlaceholderColor(Colors.Green);
                                               }}
                                               style={{backgroundColor: incomePressed ? '#16A34A' : 'white'}}
                                    >
                                        <Text fontSize={14}
                                              color={(incomePressed ? 'white':'black')}
                                              alignSelf='center'
                                        >
                                            Income
                                        </Text>
                                    </Pressable>
                                </HStack>
                            </Box>
                            <VStack space={2}>
                                <Text fontSize={20} fontWeight="medium">Amount</Text>
                                <Input
                                    ref={inputRef}
                                    variant="filled"
                                    placeholder={placeholder}
                                    InputLeftElement={
                                        <Text fontWeight="bold" paddingLeft={4}>
                                            LKR
                                        </Text>
                                    }
                                    placeholderTextColor={placeholderColor}
                                    bg={Colors.BGColor}
                                    rounded="20"
                                    h="80px"
                                    fontSize={48}
                                    textAlign="right"
                                    caretHidden={true}
                                    borderWidth={0}
                                    keyboardType="numeric"
                                    color={placeholderColor}
                                />
                            </VStack>
                            <VStack>
                                <Text fontSize={16} fontWeight="medium">Account type</Text>
                                <HStack space={20}>
                                    <VStack alignItems='center'>
                                        <IconButton
                                            icon={<MaterialCommunityIcons name="piggy-bank-outline" size={36}  color={bankPressed ? Colors.Blue : Colors.IconColor} />}
                                            onPress={()=>{handleBankPress()}}
                                            bgColor="transparent"
                                        />
                                        <Text fontSize={14} color={bankPressed ? Colors.Blue : Colors.IconColor} fontWeight='normal'>
                                            Bank
                                        </Text>
                                    </VStack>

                                    <VStack alignItems='center'>
                                        <IconButton
                                            icon={<MaterialCommunityIcons name="account-cash-outline"
                                                                          size={36}
                                                                          color={cashPressed ? Colors.Blue : Colors.IconColor}
                                            />}
                                            onPress={()=>{handleCashPress()}}
                                            bgColor="transparent"
                                        />
                                        <Text fontSize={14} color={cashPressed ? Colors.Blue : Colors.IconColor} fontWeight='normal'>
                                            Cash
                                        </Text>
                                    </VStack>

                                </HStack>
                            </VStack>
                            <VStack>
                                <Text fontSize={16} fontWeight="medium" paddingBottom={1}>Category</Text>

                                <Pressable
                                    onPress={() => setModalVisible(!modalVisible)}
                                    borderRadius="full"
                                    padding={1.5}
                                    _pressed={{
                                        bg: "blueGray.200:alpha.50"
                                    }}>
                                    <HStack  w={"100%"} space={3} alignItems={"center"}>
                                        <Avatar size="45px" bgColor={avatarColor} alignSelf={"center"}>
                                            <MaterialCommunityIcons name={selectedCategory} size={25} color={"white"}/>
                                        </Avatar>

                                            <Text fontWeight={"medium"}>{categorydName}</Text>
                                        <Spacer/>
                                            <MaterialIcons name="keyboard-arrow-right" size={30} color="black"/>
                                            <Category setSelectedCategory={setSelectedCategory}
                                                      setAvatarColor={setAvatarColor}
                                                      setCategorydName={setCategorydName}
                                                      modalVisible={modalVisible}
                                                      setModalVisible={setModalVisible}/>
                                    </HStack>
                                </Pressable>
                            </VStack>
                            <VStack space={3}>
                                <Text fontSize={16} fontWeight="medium">Date & Time</Text>
                                <HStack paddingLeft={2} space={2} alignItems={"center"}>
                                    <MaterialCommunityIcons  name="calendar-clock" size={34} color={Colors.Blue}/>
                                    <Date/>
                                    <Time/>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Box>
                    <Button bg={Colors.DBlue} borderRadius={"full"} w={320} size="md" alignSelf="center">
                        Save
                    </Button>
                </VStack>
            </View>
            </TouchableWithoutFeedback>
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