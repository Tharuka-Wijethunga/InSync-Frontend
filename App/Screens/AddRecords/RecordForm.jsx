import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    HStack,
    NativeBaseProvider,
    Text,
    View,
    VStack,
    Avatar,
    Pressable,
    Spacer
} from "native-base";
import Colors from "../../Config/Colors";
import {MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from "react-native";
import DateInput from "./DateTime/DateInput";
import TimeInput from "./DateTime/TimeInput"
import Category from "./Category/Category";
import IncomeExpenseInput from "./IncomeExpenseInput";
import AccountType from "./AccountType";
import axios from "axios";
import moment from 'moment-timezone';
import {useNavigation,useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import catIcon from "./CatIcon";

const RecordForm = () => {
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedCategory,setSelectedCategory]=useState("tag-plus" );
    const [avatarColor,setAvatarColor]=useState(Colors.IconColor);
    const [categoryName,setCategoryName]=useState("Select a Category");
    const [iconSize, setIconSize]=useState("");
    const [type, setType] = useState( "expense");
    const [amount, setAmount] = useState(0 );
    const [account, setAccount] = useState("cash");
    const [myDate, setDate] = useState(new Date());
    const [myTime, setTime] = useState(new Date());

    const resetState = () => {
        setType("expense");
        setAmount(0);
        setAccount("cash");
        setCategoryName("Select a Category");
        setAvatarColor(Colors.IconColor);
        setSelectedCategory("tag-plus")
        setDate(new Date());
        setTime(new Date());
    }


    const handleSubmit = async () => {
        const today = moment(myDate).format('YYYY-MM-DD');
        const sltime = moment.utc(myTime).tz('Asia/Colombo').format('HH:mm:ss');
        const record = {
            'type': type,
            'amount': amount,
            'account': account,
            'category': categoryName,
            'icon_name': selectedCategory,
            'icon_color': avatarColor,
            'date': today,
            'time': sltime
        };
        axios.post('http://192.168.114.230:8005/api/addrecord', record)
            .then(response => {
                console.log(response);
                axios.put(`http://192.168.114.230:8005/api/dashboard/account/${account}`,{amount:amount, type:type})
                    .then(response => {
                        console.log(response);
                        navigation.navigate('Dashboard');
                        resetState();
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <VStack space={4} w="94%">
                    <Box w="100%" rounded="2xl" shadow={3} bg="white">
                        <VStack paddingX={4} h="84%" space={4}>
                            <IncomeExpenseInput
                                setType={setType}
                                setAmount={setAmount}
                            />
                            <AccountType setAccount={setAccount}/>
                            {/* Category selection */}
                            <VStack>
                                <Text fontSize={16} fontWeight="medium" paddingBottom={1}>Category</Text>
                                <Pressable
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        Keyboard.dismiss();
                                        }
                                    }
                                    borderRadius="full"
                                    padding={1.5}
                                    _pressed={{
                                        bg: "blueGray.200:alpha.50"
                                    }}>
                                    <HStack  w={"100%"} space={3} alignItems={"center"}>
                                        <Avatar size="45px" bgColor={avatarColor} alignSelf={"center"}>
                                            <MaterialCommunityIcons name={selectedCategory} size={25} color={"white"}/>
                                        </Avatar>
                                        <Text fontWeight={"medium"}>{categoryName}</Text>
                                        <Spacer/>
                                            <MaterialIcons name="keyboard-arrow-right" size={30} color="black"/>
                                            <Category setSelectedCategory={setSelectedCategory}
                                                      setAvatarColor={setAvatarColor}
                                                      setCategoryName={setCategoryName}
                                                      setIconSize={setIconSize}
                                                      modalVisible={modalVisible}
                                                      setModalVisible={setModalVisible}
                                            />
                                    </HStack>
                                </Pressable>
                            </VStack>
                            {/* Date & Time picker */}
                            <VStack space={3}>
                                <Text fontSize={16} fontWeight="medium">Date & Time</Text>
                                <HStack paddingLeft={2} space={2} alignItems={"center"}>
                                    <MaterialCommunityIcons  name="calendar-clock" size={34} color={Colors.Blue}/>
                                    <DateInput
                                        myDate = {myDate}
                                        setDate = {setDate}
                                    />
                                    <TimeInput
                                        myTime = {myTime}
                                        setTime = {setTime}
                                    />
                                </HStack>
                            </VStack>
                        </VStack>

                    </Box>
                    {/* Save button */}
                    <Button
                        bg={Colors.DBlue}
                        borderRadius={"full"}
                        w={320} size="md"
                        alignSelf="center"
                        marginTop={4}
                        onPress={handleSubmit}
                    >
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
        paddingTop: 15
    }
})
export default RecordForm;