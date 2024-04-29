import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {HStack, Text, VStack, FlatList, Avatar, Spacer, View} from "native-base";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../../Config/Colors";
import {TouchableHighlight} from "react-native";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

const Records = forwardRef((props, ref) => {
    const navigation = useNavigation();
    const [data, setData] = useState('');
    const icon = <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>;

    useImperativeHandle(ref, ()=>({
        fetchRecords : async () => {
            try {
                const response = await axios.get('https://1fb2-2a09-bac5-4865-18c8-00-278-33.ngrok-free.app/api/addrecord')
                const reversedData = response.data.reverse();
                setData(reversedData.map(item => ({
                    category: item.category,
                    date: item.date,
                    amount: item.amount,
                    type: item.type,
                    account: item.account,
                    time: item.time
                })));

            } catch (e) {
                console.error(e);
            }
        }
    }));

    return (
        <FlatList data={props.maxlines ? data.slice(0, props.maxlines) : data} renderItem={({item}) =>
            <View style={{borderRadius: 10, overflow: 'hidden'}}>
                <TouchableHighlight onPress={() => navigation.navigate('Add Records')}
                                    underlayColor={Colors.PressedColor}
                >
                    <View paddingX={1}>
                        <HStack space={[2, 3]} justifyContent="space-between" paddingBottom={2} paddingTop={2} flex={1}>
                            <Avatar size="42px" bgColor={Colors.Blue}>
                                {icon}
                            </Avatar>
                            <VStack>
                                <Text fontWeight={"semibold"} fontSize="16">
                                    {item.category}
                                </Text>
                                <Text color="coolGray.600" fontSize="12">
                                    {item.date}
                                </Text>
                            </VStack>
                            <Spacer/>
                            <Text fontSize="16" fontWeight={"semibold"} color={item.type === "income" ? "green.500":"red.500"} alignSelf="flex-start">
                                {item.type === "expense" ? "-" : ""} LKR {item.amount}
                            </Text>
                        </HStack>
                    </View>
                </TouchableHighlight>
            </View>
        }/>
    )
});

export default Records;