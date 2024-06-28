import {StyleSheet,TouchableOpacity, } from "react-native";
import {Badge, Flex, Input, Popover, Pressable, Spacer} from 'native-base';
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
    const [todaySpending, setTodaySpending] = useState(0)

    const fetch_Records = () => {
        if(recordRef.current){
            recordRef.current.fetchRecords();
        }
    }

    useEffect(()=> {
        if(isFocused){
            fetch_Records();
            axios.get('https://ef7a-2402-4000-2180-9088-e95f-5682-e8eb-bdde.ngrok-free.app/api/dashboard/account?type=cash')
                .then(response => {
                    setCashBalance(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
            axios.get('https://ef7a-2402-4000-2180-9088-e95f-5682-e8eb-bdde.ngrok-free.app/api/dashboard/account?type=bank')
                .then(response => {
                    setBankBalance(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
            axios.get('https://ef7a-2402-4000-2180-9088-e95f-5682-e8eb-bdde.ngrok-free.app/api/dashboard/today_spending')
                .then(response=> {
                    setTodaySpending(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [isFocused,recordRef.current]);

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
                    <Center>
                        <VStack space={3} w={"97%"} h={"96%"}>
                            <HStack>
                                <DailyExpense
                                    todaySpending={todaySpending}
                                />
                            </HStack>
                            <HStack space={3}  alignSelf="center">
                                <View flex={1}>
                                <Popover
                                    trigger={(triggerProps) => {
                                        return (
                                                <Pressable {...triggerProps}>
                                                    {({isPressed}) => {
                                                        return <Box style={{
                                                            transform: [{
                                                                scale: isPressed ? 0.96 : 1
                                                            }]
                                                        }} >
                                                            <BalanceCard account="Bank" balance={bankBalance}/>
                                                        </Box>;
                                                    } }
                                                </Pressable>
                                        );
                                    }}
                                >
                                    <Popover.Content marginLeft={2} width="56">
                                        <Popover.Arrow />
                                        <Popover.Body>
                                            <VStack flex={1} width={"100%"} space={1} alignItems={"center"}>
                                            <Input marginBottom={2} variant="outline"placeholder="Change Balance" />
                                            <HStack alignSelf="center" space={1} >
                                                    <Button bg={Colors.DBlue} borderRadius={"full"} w="50%" size="md" >
                                                    Save
                                                </Button>
                                                <Button borderRadius={"full"} w="50%" size="md" variant="outline">
                                                    <Text color={"black"}>Cancel</Text>
                                                </Button>
                                            </HStack>
                                            </VStack>
                                        </Popover.Body>
                                    </Popover.Content>
                                </Popover>
                                </View>
                                <View flex={1}>
                                <Popover
                                    trigger={(triggerProps) => {
                                        return (
                                            <Pressable {...triggerProps}>
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
                                    }}
                                >
                                    <Popover.Content marginRight={2} width="56">
                                        <Popover.Arrow />
                                        <Popover.Body>
                                            <VStack flex={1} width={"100%"} space={1} alignItems={"center"}>
                                                <Input marginBottom={2} variant="outline"placeholder="Change Balance" />
                                                <HStack alignSelf="center" space={1} >
                                                    <Button bg={Colors.DBlue} borderRadius={"full"} w="50%" size="md" >
                                                        Save
                                                    </Button>
                                                    <Button borderRadius={"full"} w="50%" size="md" variant="outline">
                                                        <Text color={"black"}>Cancel</Text>
                                                    </Button>
                                                </HStack>
                                            </VStack>
                                        </Popover.Body>
                                    </Popover.Content>
                                </Popover>
                                </View>
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
    },
})
