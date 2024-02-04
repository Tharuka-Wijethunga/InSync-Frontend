import React from 'react';
import {Box, Text, View, VStack} from "native-base";
import Colors from "../../Utils/Colors";

const BalanceCard = (props) => {
    return (
        <View w="48.5%">
            <Box h="112" bg="white" rounded="2xl" shadow={3}>
                <VStack space={4} padding={4}>
                    <View>
                        <Text fontSize={20} fontWeight={"medium"} lineHeight={24.3}>
                            {props.account}
                        </Text>
                    </View>
                    <View>
                        <Text fontSize={15} lineHeight={15.15} color={Colors.Blue}>
                            LKR
                        </Text>
                        <Text fontSize={28} fontWeight={"bold"} lineHeight={28} color={Colors.Blue}>
                            {props.balance}
                        </Text>
                    </View>
                </VStack>
            </Box>
        </View>
    );
};

export default BalanceCard;