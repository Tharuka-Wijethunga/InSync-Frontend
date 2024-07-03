import {StyleSheet} from "react-native";
import {Input, Popover, Pressable} from 'native-base';
import React,{useState, useEffect,useRef} from 'react';
import Colors from "../../Config/Colors";
import {
    Box,
    Text,
    HStack,
    NativeBaseProvider,
    View,
    VStack,
    IconButton,
    ScrollView,
    Center,
    Button,
} from "native-base";
import BalanceCard from "./BalanceCard";
import {MaterialIcons} from '@expo/vector-icons';
import Records from "./Records";
import RecentActivities from "./RecentActivities/RecentActivities";
import UpcomingCard from "./UpcomingCard";
import DailyExpense from "./DailyExpense";
import axios from "axios";
import {useIsFocused} from "@react-navigation/native";


export default function Dashboard() {
    const isFocused = useIsFocused();
    const recordRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [cashBalance, setCashBalance] = useState(0);
    const [bankBalance, setBankBalance] = useState(0);
    const [todaySpending, setTodaySpending] = useState(0);
    const [isOpenBank, setIsOpenBank] = useState(false);
    const [isOpenCash, setIsOpenCash] = useState(false);


    const fetch_Records = () => {
        if(recordRef.current){
            recordRef.current.fetchRecords();
        }
    }

    useEffect(()=> {
        if(isFocused){
            fetch_Records();
            axios.get('https://http://192.168.11.70:8005/api/dashboard/account?type=cash')
                .then(response => {
                    setCashBalance(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
            axios.get('https://http://192.168.11.70:8005/api/dashboard/account?type=bank')
                .then(response => {
                    setBankBalance(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
            axios.get('https://http://192.168.11.70:8005/api/dashboard/today_spending')
                .then(response=> {
                    setTodaySpending(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [isFocused,recordRef.current]);


    const handleSave = async(account, amount) => {
        axios.put(`https://http://192.168.11.70:8005/api/dashboard/account/${account}/manual`,{balance:amount})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
                    <Center>
                        <VStack space={3} w={"97%"} h={"96%"}>
                            <HStack>
                                <DailyExpense todaySpending={todaySpending}/>
                            </HStack>
                            <HStack space={3}  alignSelf="center">
                                <VStack flex={1}>
                                    <Popover
                                        placement="bottom"
                                        trigger={(triggerProps) => (
                                            <Pressable {...triggerProps} onPress={() => setIsOpenBank(true)}>
                                                {({ isPressed }) => {
                                                    return (
                                                        <Box style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
                                                            <BalanceCard account="Bank" balance={bankBalance} />
                                                        </Box>
                                                    );
                                                }}
                                            </Pressable>
                                        )}
                                        isOpen={isOpenBank}
                                        onClose={() => setIsOpenBank(false)}
                                    >
                                        <Popover.Content marginLeft={2} width="56">
                                            <Popover.Arrow />
                                            <Popover.Body>
                                                <VStack flex={1} width={"100%"} space={1} alignItems={"center"}>
                                                    <Input
                                                        height={10}
                                                        marginBottom={2}
                                                        variant="outline"
                                                        placeholder="Change Balance"
                                                        value={bankBalance}
                                                        onChangeText={setBankBalance}
                                                    />
                                                    <HStack alignSelf="center" space={1} >
                                                        <Button
                                                            onPress={()=> {
                                                                handleSave('bank', bankBalance);
                                                                setIsOpenBank(false);
                                                            }}
                                                            bg={Colors.DBlue}
                                                            borderRadius={"full"}
                                                            w="50%" size="md"
                                                        >
                                                            <Text color={"white"}>Save</Text>
                                                        </Button>
                                                        <Button
                                                            onPress={()=> setIsOpenBank(false)}
                                                            borderRadius={"full"}
                                                            w="50%"
                                                            size="md"
                                                            variant="outline"
                                                        >
                                                            <Text color={"black"}>Cancel</Text>
                                                        </Button>
                                                    </HStack>
                                                </VStack>
                                            </Popover.Body>
                                        </Popover.Content>
                                    </Popover>
                                </VStack>
                                <VStack flex={1}>
                                <Popover
                                    trigger={(triggerProps) => {
                                        return (
                                            <Pressable {...triggerProps} onPress={()=> setIsOpenCash(true)}>
                                                {({isPressed}) => {
                                                    return <Box style={{
                                                        transform: [{
                                                            scale: isPressed ? 0.96 : 1
                                                        }]
                                                    }} >
                                                        <BalanceCard account="Cash" balance={cashBalance}/>
                                                    </Box>;
                                                } }
                                            </Pressable>
                                        );
                                    }} isOpen={isOpenCash} onClose={() => setIsOpenCash(false)}
                                >
                                    <Popover.Content marginRight={2} width="56">
                                        <Popover.Arrow />
                                        <Popover.Body>
                                            <VStack flex={1} width={"100%"} space={1} alignItems={"center"}>
                                                <Input
                                                    height={10}
                                                    marginBottom={2}
                                                    variant="outline"
                                                    placeholder="Change Balance"
                                                    value={cashBalance}
                                                    onChangeText={setCashBalance}
                                                />
                                                <HStack alignSelf="center" space={1} >
                                                    <Button
                                                        onPress={()=> {
                                                            handleSave('cash', cashBalance);
                                                            setIsOpenCash(false);
                                                        }}
                                                        bg={Colors.DBlue}
                                                        borderRadius={"full"}
                                                        w="50%" size="md"
                                                    >
                                                        <Text color={"white"}>Save</Text>
                                                    </Button>
                                                    <Button
                                                        onPress={()=>setIsOpenCash(false)}
                                                        borderRadius={"full"}
                                                        w="50%"
                                                        size="md"
                                                        variant="outline"
                                                    >
                                                        <Text color={"black"}>Cancel</Text>
                                                    </Button>
                                                </HStack>
                                            </VStack>
                                        </Popover.Body>
                                    </Popover.Content>
                                </Popover>
                                </VStack>
                            </HStack>
                            <HStack>
                                <UpcomingCard/>
                            </HStack>
                            <HStack flexGrow={1} flex={1}>
                                <Box w="100%" bg="white" borderRadius="2xl" shadow={3}>
                                    <VStack paddingTop={4} paddingX={3} paddingBottom={2}>
                                        <View mb={2} paddingBottom={2} paddingLeft={1}>
                                            <Text fontWeight="medium" fontSize="20">
                                                Recent Activities
                                            </Text>
                                        </View>
                                        <Records ref={recordRef} maxlines={4}/>
                                        <View alignSelf="flex-end">
                                            <IconButton
                                                icon={<MaterialIcons name="keyboard-arrow-right" size={36}
                                                                     color="black"/>}
                                                onPress={() => setModalVisible(!modalVisible)}
                                                borderRadius="full"
                                                _pressed={{
                                                    bg: "blueGray.200:alpha.50"
                                                }}
                                            />
                                            <RecentActivities modalVisible={modalVisible}
                                                              setModalVisible={setModalVisible}
                                                              recordRef={recordRef}
                                                              isFocused={isFocused}
                                            />
                                        </View>
                                    </VStack>
                                </Box>
                            </HStack>
                        </VStack>
                    </Center>
                </ScrollView>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.BGColor,
        alignItems: 'center',
        flex: 1,
    }
})