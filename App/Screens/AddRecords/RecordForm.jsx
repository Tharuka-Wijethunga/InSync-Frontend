import React ,{useState} from 'react';
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
import Date from "./DateTime/Date";
import Time from "./DateTime/Time"
import Category from "./Category/Category";
import IncomeExpenseInput from "./IncomeExpenseInput";
import AccountType from "./AccountType";
import axios from "axios";

const RecordForm = () => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const [selectedCategory,setSelectedCategory]=useState("tag-plus" );
    const [avatarColor,setAvatarColor]=useState(Colors.IconColor);
    const [categoryName,setCategoryName]=useState("Select a Category");

    const [type, setType] = useState("");
    const [amount, setAmount] = useState(0);
    const [account, setAccount] = useState("");

    const handleSubmit = () =>{
        const record = {'type':type, 'amount':amount, 'account':account, 'category':categoryName};
        axios.post('http://1379-2a09-bac5-4862-1d05-00-2e4-aa.ngrok-free.app/api/addrecord', record)
            .then(response=>{
                console.log(response);
            })
            .catch(error=>{
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

                                            <Text fontWeight={"medium"}>{categoryName}</Text>
                                        <Spacer/>
                                            <MaterialIcons name="keyboard-arrow-right" size={30} color="black"/>
                                            <Category setSelectedCategory={setSelectedCategory}
                                                      setAvatarColor={setAvatarColor}
                                                      setCategoryName={setCategoryName}
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
                                    <Date/>
                                    <Time/>
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