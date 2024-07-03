import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Box,
    Button,
    CheckIcon,
    HStack,
    Icon,
    IconButton,
    Input,
    Popover, SmallCloseIcon,
    Text,
    View,
    VStack
} from "native-base";
import Colors from "../../Config/Colors";
import { Feather } from '@expo/vector-icons';
import axios from "axios";
import {Platform} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";


const BalanceCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef();
    const [inputValue, setInputValue] = useState(props.balance);


    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSave = async(account, amount) => {
        axios.put(`http://192.168.248.230:8005/api/dashboard/account/${account}/manual`,{balance:amount})
            .then(response => {
                console.log(response);
                props.fetchBalances();
                setInputValue('')
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handlePopoverClose = () => {
        setInputValue(''); // Reset input field to show placeholder
        setIsOpen(false);
    };

    return (
        <View w="100%">
            <Box h="112" bg="white" rounded="2xl" shadow={3}>
                <VStack space={4} padding={4}>
                    <HStack space={4} justifyContent="space-between">
                        <View>
                            <Text fontSize="20" fontWeight={"medium"} lineHeight={24.3}>
                                {props.accountName}
                            </Text>
                        </View>
                        <View alignItems="flex-start">
                            <Popover
                                offset={Platform.OS === 'android' ? -44 : -135}
                                crossOffset={Platform.OS === 'android' ? -54 : -53}
                                placement="bottom"
                                trigger={(triggerProps) => {
                                    return (
                                        <IconButton
                                            paddingTop={-2}
                                            {...triggerProps}
                                            onPress={() => setIsOpen(true)}
                                            icon={<Icon as={Feather} name={isOpen ? "edit-2" : "edit-3"} />}
                                            borderRadius="full"
                                            _icon={{
                                                color: "black",
                                                size: "md"
                                            }}
                                            _pressed={{
                                                bg: "transparent",
                                                _ios: {
                                                    _icon: {
                                                        size: "md"
                                                    }
                                                }
                                            }}
                                            _ios={{
                                                _icon: {
                                                    size: "md"
                                                }
                                            }}
                                        />
                                    );
                                }}
                                isOpen={isOpen}
                                onClose={handlePopoverClose}
                            >
                                <Popover.Content w="174" borderRadius={20} borderColor="white" h={108}>
                                    {/*<Popover.Arrow borderColor="white" bg={"white"}/>*/}
                                    <Popover.Body bg={"white"}>
                                        <VStack space={2}>
                                            <Input
                                                autoFocus
                                                ref={inputRef}
                                                colorScheme={"blue.500"}
                                                variant="ghost"
                                                fontSize="16"
                                                height={10}
                                                placeholder="Change Balance"
                                                value={inputValue}
                                                onChangeText={handleInputChange}
                                                keyboardType="numeric"
                                            />
                                            <Button.Group space={5} justifyContent={"space-around"}>
                                                <IconButton
                                                    variant="outline"
                                                    borderRadius="full"
                                                    colorScheme="red"
                                                    _pressed={{
                                                        bg: "red.500:alpha.20"}}
                                                    size="sm"
                                                    onPress={handlePopoverClose}
                                                >
                                                    <SmallCloseIcon size="4" color="red.600" />
                                                </IconButton>
                                                <IconButton
                                                    variant="outline"
                                                    colorScheme="darkBlue"
                                                    borderRadius="full"
                                                    _pressed={{
                                                        bg: "blue.400:alpha.20"}}
                                                    size="sm"
                                                    onPress={()=> {
                                                        handleSave(props.account, inputValue);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    <CheckIcon size="4"  color="darkBlue.500" />
                                                </IconButton>
                                            </Button.Group>
                                        </VStack>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover>
                        </View>
                    </HStack>
                    <View>
                        <View>
                            <Text fontSize="15" lineHeight={15.15} color={Colors.Blue}>
                                LKR
                            </Text>
                        </View>
                        <View>
                            <Text fontSize="28" fontWeight={"bold"} lineHeight={28} color={Colors.Blue}>
                                {props.balance}
                            </Text>
                        </View>

                    </View>
                </VStack>
            </Box>
        </View>
    );
};

export default BalanceCard;