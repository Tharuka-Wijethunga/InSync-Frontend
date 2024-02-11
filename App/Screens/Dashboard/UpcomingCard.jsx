import React from 'react';
import {Box, HStack, IconButton, NativeBaseProvider, Text, View, VStack} from "native-base";
import Colors from "../../Config/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const UpcomingCard = () => {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <HStack>
                <Box w="100%" h="148" bg="white" rounded="2xl" shadow={3}>
                    <VStack space={6} padding={4}>
                        <View>
                            <Text fontWeight="medium" fontSize="20">
                                Upcoming Expenses
                            </Text>
                        </View>
                        <View>
                            <Text fontSize="18" lineHeight={17} color={Colors.DBlue}>
                                LKR
                            </Text>
                            <HStack width="100%" justifyContent="space-between">
                                <View>
                                    <Text fontSize="48" fontWeight={"bold"} lineHeight={48} color={Colors.DBlue}>
                                        34500
                                    </Text>
                                </View>
                                <View>
                                    <IconButton
                                        icon={<MaterialIcons name="keyboard-arrow-right" size={36} color="black"/>}
                                        borderRadius="full"
                                        _pressed={{
                                            bg: "blueGray.200:alpha.50"
                                        }}
                                        onPress={() => navigation.navigate('Statistics')}
                                    />
                                </View>
                            </HStack>
                        </View>
                    </VStack>
                </Box>
            </HStack>
        </NativeBaseProvider>
    );
};

export default UpcomingCard;