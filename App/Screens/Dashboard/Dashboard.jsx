import {StyleSheet} from "react-native";
import React from 'react';
import Colors from "../../Config/Colors";
import {Box, Text, HStack, NativeBaseProvider, View, VStack, IconButton} from "native-base";
import BalanceCard from "./BalanceCard";
import {MaterialIcons} from '@expo/vector-icons';
import Activity from "./Activity";
import RecentActivities from "./RecentActivities";
import UpcomingCard from "./UpcomingCard";


export default function Dashboard() {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <VStack space={3}>
                    <HStack space={3} alignSelf="center">
                        <BalanceCard account="Bank" balance="36000"/>
                        <BalanceCard account="Cash" balance="23500"/>
                    </HStack>
                    <HStack>
                        <UpcomingCard />
                    </HStack>
                    <HStack flexGrow={1} flex={1}>
                        <Box w="100%" bg="white" borderRadius="2xl" shadow={3} >
                            <VStack padding={4}>
                                <View mb={6}>
                                    <Text fontWeight="medium" fontSize="20">
                                        Recent Activities
                                    </Text>
                                </View>
                                <Activity maxLines={4}/>
                                <View alignSelf="flex-end">
                                    <IconButton
                                        icon={<MaterialIcons name="keyboard-arrow-right" size={36} color="black"/>}
                                        onPress={() => setModalVisible(!modalVisible)}
                                        borderRadius="full"
                                        _pressed={{
                                            bg: "blueGray.200:alpha.50"
                                        }}
                                    />
                                    <RecentActivities modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                                </View>
                            </VStack>
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
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15
    }
})