import React ,{useState}from 'react';
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
    Modal,
    Avatar,
    Spacer, Pressable
} from "native-base";
import Colors from "../../Config/Colors";
import {FontAwesome6, MaterialIcons, MaterialCommunityIcons, FontAwesome5} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Date from "./DateTime/Date";
import Time from "./DateTime/Time"
import Category from "./Category";


const RecordForm = () => {
    const navigation = useNavigation();
    const [incomePressed, setIncomePressed] = useState(false);
    const [expensePressed, setExpensePressed] = useState(false);
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
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <VStack space={4} w="94%">
                    <Box w="100%" rounded="2xl" shadow={3} bg="white">
                        <VStack paddingX={4} paddingY={3} space={4}>
                            <Box h="50px" bg={Colors.BGColor} rounded="9999" alignItems={"center"} justifyContent={"center"}>
                                <HStack space={1}>
                                    <Button
                                        onPress={handleIncomePress}
                                        backgroundColor={"white"}
                                        bg={incomePressed ? 'green.500' : 'white'}
                                        borderRadius={'full'}
                                        w={'48%'}
                                        size={'md'}
                                        alignSelf="center"
                                    >
                                        <Text color={incomePressed ? 'white' : 'black'}>Income</Text>
                                    </Button>
                                    <Button
                                        onPress={handleExpensePress}
                                        backgroundColor={"white"}
                                        bg={expensePressed ? 'red.500' : 'white'}
                                        borderRadius={'full'}
                                        w={'48%'}
                                        size={'md'}
                                        alignSelf="center"
                                    >
                                        <Text color={expensePressed ? 'white' : 'black'}>EXPENSE</Text>
                                    </Button>
                                </HStack>
                            </Box>
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