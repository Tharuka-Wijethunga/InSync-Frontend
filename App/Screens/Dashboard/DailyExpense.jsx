import React from 'react';
import {Box, HStack,NativeBaseProvider, Text, View, VStack} from "native-base";
import Colors from "../../Config/Colors";


const DailyExpense = () => {
    return (
        <NativeBaseProvider>
            <HStack>
                <Box w="100%" h="88" bg="white" rounded="2xl" shadow={3}>
                    <HStack justifyContent="space-between" padding={4}>
                        <VStack paddingTop={2}>
                            <View>
                                <Text fontWeight="bold" fontSize="32" lineHeight={33}>
                                    Today's
                                </Text>
                                <Text fontWeight="medium" fontSize="14" lineHeight={15}>
                                    Spending
                                </Text>
                            </View>
                        </VStack>
                        <VStack paddingTop={2}>
                            <Text fontSize="14" lineHeight={14} color={Colors.Red} alignSelf="flex-end">
                                LKR
                            </Text>
                            <Text fontSize="36" fontWeight={"bold"} lineHeight={37} color={Colors.Red}>
                                15000
                            </Text>
                        </VStack>
                    </HStack>
                </Box>
            </HStack>
        </NativeBaseProvider>
    );
};

export default DailyExpense;