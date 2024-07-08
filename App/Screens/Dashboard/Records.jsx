import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { HStack, Text, VStack, Avatar, Spacer, View, Icon, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeListView } from 'react-native-swipe-list-view';

const Records = forwardRef(({props, maxlines, fetchBalances}, ref) => {
    const navigation = useNavigation();
    const [listData, setListData] = useState([]);

    useImperativeHandle(ref, () => ({
        fetchRecords: async () => {
            try {
                const response = await axios.get('http://192.168.248.230:8006/api/records')
                const reversedData = response.data.reverse();
                setListData(reversedData.map((item, index) => ({
                    key: `${index}`,
                    id: item.id,  // Use the string id
                    category: item.category,
                    date: item.date,
                    amount: item.amount,
                    type: item.type,
                    account: item.account,
                    icon_name: item.icon_name,
                    icon_color: item.icon_color
                })));
            } catch (e) {
                console.error(e);
            }
        }
    }));

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = async (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const item = listData.find(item => item.key === rowKey);
        if (item && item.id) {  // Make sure you're using 'id', not '_id'
            try {
                const response = await axios.delete(`http://192.168.248.230:8006/api/records/${item.id}`);
                if (response.data.success) {
                    const newData = listData.filter(listItem => listItem.id !== item.id);
                    setListData(newData);
                    fetchBalances();
                } else {
                    console.error("Failed to delete record");
                }
            } catch (error) {
                console.error("Error deleting record:", error.response?.data?.detail || error.message);
            }
        } else {
            console.error("Invalid item or missing id", item);
        }
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('Add Records')} _dark={{
            bg: 'coolGray.800'
        }} _light={{
            bg: 'white'
        }}>
            <View paddingX={1}>
                <HStack space={[2, 3]} justifyContent="space-between" paddingBottom={2} paddingTop={2} flex={1}>
                    <Avatar size="42px" bgColor={item.icon_color}>
                        {<MaterialCommunityIcons name={item.icon_name} size={22} color="white" />}
                    </Avatar>
                    <VStack>
                        <Text fontWeight={"semibold"} fontSize="16">
                            {item.category}
                        </Text>
                        <Text color="coolGray.600" fontSize="12">
                            {item.date}
                        </Text>
                    </VStack>
                    <Spacer />
                    <Text fontSize="16" fontWeight={"semibold"} color={item.type === "income" ? "green.500" : "red.500"} alignSelf="flex-start">
                        {item.type === "expense" ? "-" : ""} LKR {item.amount}
                    </Text>
                </HStack>
            </View>
        </Pressable>
    );

    const renderHiddenItem = (data, rowMap) => (
        <HStack flex="1" pl="2" justifyContent={"flex-end"} >
            <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
                opacity: 0.5
            }}>
                <VStack alignItems="center" space={2}>
                    <Icon as={<MaterialCommunityIcons name="delete" />} color="white" size="xs" />
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Delete
                    </Text>
                </VStack>
            </Pressable>
        </HStack>
    );

    return (
        <View style={{ flex: 1 }}>
            <SwipeListView
                data={maxlines ? listData.slice(0, maxlines) : listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-70}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </View>
    );
});

export default Records;