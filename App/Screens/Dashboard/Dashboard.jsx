import {StyleSheet} from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {Box, Text, HStack, NativeBaseProvider, View, VStack, FlatList} from "native-base";
import BalanceCard from "./BalanceCard";
import { MaterialIcons } from '@expo/vector-icons';
import Activity from "./Activity";

export default function Dashboard() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <VStack space={3}>
                    <HStack space={3} alignSelf="center">
                        <BalanceCard account="Bank" balance="36000" />
                        <BalanceCard account="Cash" balance="23500" />
                    </HStack>
                    <HStack>
                        <Box w="100%" h="148" bg="white" borderRadius="2xl" shadow={3}>
                            <VStack space={6} padding={4}>
                                <View>
                                    <Text fontWeight="medium" fontSize={20}>
                                        Upcoming Expenses
                                    </Text>
                                </View>
                                <View>
                                    <Text fontSize={18} lineHeight={17} color={Colors.DBlue}>
                                        LKR
                                    </Text>
                                    <HStack width="100%" justifyContent="space-between">
                                        <View>
                                            <Text fontSize={48} fontWeight={"bold"} lineHeight={48} color={Colors.DBlue}>
                                                34500
                                            </Text>
                                        </View>
                                        <View>
                                            <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
                                        </View>
                                    </HStack>
                                </View>
                            </VStack>
                        </Box>
                    </HStack>
                    <HStack flexGrow={1}>
                        <Box w="100%" bg="white"  borderRadius="2xl" shadow={3}>
                            <View>
                                <VStack padding={4}>
                                    <View mb={6}>
                                        <Text fontWeight="medium" fontSize={20}>
                                            Recent Activities
                                        </Text>
                                    </View>
                                    <Activity />
                                    <View alignSelf="flex-end">
                                        <MaterialIcons name="keyboard-arrow-right" size={36} color="black"/>
                                    </View>
                                </VStack>
                            </View>
                        </Box>
                    </HStack>
                </VStack>
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
        paddingTop:15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15
    }
})