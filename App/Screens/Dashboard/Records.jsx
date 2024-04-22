import React, {useEffect, useState} from 'react';
import {HStack, Text, VStack, FlatList, Avatar, Spacer, View} from "native-base";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../../Config/Colors";
import {TouchableHighlight} from "react-native";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

const Records = ({maxLines=null}) => {
    const navigation = useNavigation();
    const [data, setData] = useState('');


    useEffect(() => {
        axios.get('https://06b9-2a09-bac5-4865-18c8-00-278-c7.ngrok-free.app/api/addrecord')
            .then(response => {
                const reversedData = response.data.reverse();
                setData(reversedData.map(item => ({
                    icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
                    category: item.category,
                    date: item.date,
                    amount: item.amount,
                    type: item.type
                })));
            })
    }, []);


    return (
        <FlatList data={maxLines ? data.slice(0, maxLines) : data} renderItem={({item}) =>
            <View style={{borderRadius: 10, overflow: 'hidden'}}>
                <TouchableHighlight onPress={() => navigation.navigate('Add Records')}
                                    underlayColor={Colors.PressedColor}
                >
                    <View paddingX={1}>
                        <HStack space={[2, 3]} justifyContent="space-between" paddingBottom={2} paddingTop={2} flex={1}>
                            <Avatar size="42px" bgColor={Colors.Blue}>
                                {item.icon}
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
};

export default Records;