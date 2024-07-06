import {StyleSheet} from "react-native";
import {Input, Popover, Pressable} from 'native-base';
import React, {useState, useEffect, useRef, useCallback} from 'react';
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
    const [prediction,setPrediction]=useState(0);


    const fetch_Records = useCallback(() => {
        if(recordRef.current){
            recordRef.current.fetchRecords();
        }
    },[]);

    const fetchBalances = useCallback(() => {
        axios.get('http://192.168.248.230:8006/api/dashboard/account?type=cash')
            .then(response => {
                setCashBalance(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('http://192.168.248.230:8006/api/dashboard/account?type=bank')
            .then(response => {
                setBankBalance(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('http://192.168.248.230:8006/api/dashboard/today_spending')
            .then(response => {
                setTodaySpending(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        axios.get('http://192.168.248.230:8006/api/userModel/ForecastNextDay')
            .then(response=>{
                setPrediction(response.data.Total);
            })
            .catch(error =>{
                console.error(error);
            })
    });

    useEffect(()=> {
        if(isFocused){
            fetch_Records();
            fetchBalances();
        }
    }, [isFocused, fetch_Records, fetchBalances]);


    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
                    <Center>
                        <VStack space={3} w={"97%"} h={"96%"}>
                            <HStack>
                                <DailyExpense todaySpending={todaySpending}/>
                            </HStack>
                            <HStack space={3} alignSelf="center">
                                <VStack flex={1}>
                                    <BalanceCard accountName="Bank" account="bank" balance={bankBalance} setBalance={setBankBalance} fetchBalances={fetchBalances}/>
                                </VStack>
                                <VStack flex={1}>
                                    <BalanceCard accountName="Cash" account="cash" balance={cashBalance} setBalance={setCashBalance} fetchBalances={fetchBalances}/>
                                </VStack>
                            </HStack>
                            <HStack>
                                <UpcomingCard amount={prediction}/>
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