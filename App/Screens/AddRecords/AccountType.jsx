import React, {useState} from 'react';
import {HStack, IconButton, Text, VStack} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../Config/Colors";
import {Keyboard} from "react-native";

const AccountType = ({setAccount}) => {
    const [bankPressed, setBankPressed] = useState(false);
    const [cashPressed, setCashPressed] = useState(true);

    const handleBankPress = () => {
        setBankPressed(true);
        setCashPressed(false);
        setAccount("bank");
        Keyboard.dismiss();
    };

    const handleCashPress = () => {
        setCashPressed(true);
        setBankPressed(false);
        setAccount("cash");
        Keyboard.dismiss();
    };

    return (
        <VStack>
            <Text fontSize={16} fontWeight="medium">Account type</Text>
            <HStack space={20}>
                <VStack alignItems='center'>
                    <IconButton
                        icon={<MaterialCommunityIcons name="account-cash-outline"
                                                      size={36}
                                                      color={cashPressed ? Colors.Blue : Colors.IconColor}
                        />}
                        onPress={()=>{handleCashPress()}}
                        bgColor="transparent"
                    />
                    <Text fontSize={14} color={cashPressed ? Colors.Blue : Colors.IconColor} fontWeight='normal'>
                        Cash
                    </Text>
                </VStack>
                <VStack alignItems='center'>
                    <IconButton
                        icon={<MaterialCommunityIcons name="piggy-bank-outline" size={36}  color={bankPressed ? Colors.Blue : Colors.IconColor} />}
                        onPress={()=>{handleBankPress()}}
                        bgColor="transparent"
                    />
                    <Text fontSize={14} color={bankPressed ? Colors.Blue : Colors.IconColor} fontWeight='normal'>
                        Bank
                    </Text>
                </VStack>
            </HStack>
        </VStack>
    );
};

export default AccountType;