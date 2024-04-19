import React from 'react';
import {HStack, Text, VStack, FlatList, Avatar, Spacer, View} from "native-base";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../../Config/Colors";
import {TouchableHighlight} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Records = ({maxLines=null}) => {
    const navigation = useNavigation();

    const data = [
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Income",
            date: "02 Dec 2023",
            amount: "400",
            type: "Income"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Food",
            date: "28 Nov 2023",
            amount: "550",
            type: "Expense"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Income",
            date: "24 Nov 2023",
            amount: "2500",
            type: "Income"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Fuel",
            date: "15 Nov 2023",
            amount: "1000",
            type: "Expense"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Income",
            date: "24 Nov 2023",
            amount: "2500",
            type: "Income"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Fuel",
            date: "15 Nov 2023",
            amount: "1000",
            type: "Expense"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Income",
            date: "24 Nov 2023",
            amount: "2500",
            type: "Income"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Fuel",
            date: "15 Nov 2023",
            amount: "1000",
            type: "Expense"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Income",
            date: "24 Nov 2023",
            amount: "2500",
            type: "Income"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Fuel",
            date: "15 Nov 2023",
            amount: "1000",
            type: "Expense"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Income",
            date: "24 Nov 2023",
            amount: "2500",
            type: "Income"
        },
        {
            icon: <FontAwesome5 name="hand-holding-usd" size={20} color="white"/>,
            category: "Fuel",
            date: "15 Nov 2023",
            amount: "1000",
            type: "Expense"
        }
    ];
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
                            <Text fontSize="16" fontWeight={"semibold"} color={item.type === "Income" ? "green.500":"red.500"} alignSelf="flex-start">
                                {item.type === "Expense" ? "-" : ""} LKR {item.amount}
                            </Text>
                        </HStack>
                    </View>
                </TouchableHighlight>
            </View>
        }/>
    )
};

export default Records;