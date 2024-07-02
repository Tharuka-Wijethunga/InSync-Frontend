import React, {useRef, useState} from 'react';
import {
    Box,
    Button,
    CheckIcon,
    CloseIcon,
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


const BalanceCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = async(account, amount) => {
        axios.put(`https://0434-2a09-bac5-4862-137d-00-1f1-1db.ngrok-free.app/api/dashboard/account/${account}/manual`,{balance:amount})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <View w="100%">
            <Box h="112" bg="white" rounded="2xl" shadow={3}>
                <VStack space={4} padding={4}>
                    <View>
                        <Text fontSize="20" fontWeight={"medium"} lineHeight={24.3}>
                            {props.account}
                        </Text>
                    </View>
                    <View>
                        <View>
                            <Text fontSize="15" lineHeight={15.15} color={Colors.Blue}>
                                LKR
                            </Text>
                        </View>
                        <HStack justifyContent="space-between">
                            <View>
                                <Text fontSize="28" fontWeight={"bold"} lineHeight={28} color={Colors.Blue}>
                                    {props.balance}
                                </Text>
                            </View>
                            <View alignItems="flex-start" >
                                <Popover
                                    offset={-195.5}
                                    crossOffset={-52}
                                    placement="bottom"
                                    trigger={(triggerProps) => {
                                        return (
                                            <IconButton
                                                {...triggerProps}
                                                onPress={() => setIsOpen(true)}
                                                icon={<Icon as={Feather} name="edit-2" />}
                                                borderRadius="full"
                                                _icon={{
                                                    color: "dark.300",
                                                    size: "sm"
                                                }}
                                                _pressed={{
                                                    bg: "blueGray.200:alpha.50",
                                                    _icon: {
                                                        name: "edit-3"
                                                    },
                                                    _ios: {
                                                        _icon: {
                                                            size: "sm"
                                                        }
                                                    }
                                                }}
                                                _ios={{
                                                    _icon: {
                                                        size: "sm"
                                                    }
                                                }}
                                            />
                                        );
                                    }}
                                    isOpen={isOpen}
                                    onClose={() => setIsOpen(false)}
                                >
                                    <Popover.Content w="170" borderRadius={20} borderColor="white" h={112}>
                                        {/*<Popover.Arrow borderColor="white" bg={"white"}/>*/}
                                        <Popover.Body bg={"white"}>
                                            <VStack space={2}>
                                                <Input
                                                    colorScheme={"blue.500"}
                                                    variant="ghost"
                                                    fontSize="16"
                                                    height={10}
                                                    placeholder="Change Balance"
                                                    value={props.balance}
                                                    onChangeText={props.setBalance}
                                                />
                                                <Button.Group space={2}>
                                                    <IconButton
                                                        variant="outline"
                                                        borderRadius="full"
                                                        colorScheme="red"
                                                        _pressed={{
                                                            bg: "red.500:alpha.20"}}
                                                        onPress={() => setIsOpen(false)}
                                                    >
                                                        <SmallCloseIcon size="5" mt="0.5" color="red.600" />
                                                    </IconButton>
                                                    <IconButton
                                                        variant="outline"
                                                        colorScheme="darkBlue"
                                                        borderRadius="full"
                                                        _pressed={{
                                                            bg: "blue.400:alpha.20"}}
                                                        onPress={()=> {
                                                            handleSave(props.account, props.balance);
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        <CheckIcon size="5" mt="0.5" color="darkBlue.500" />
                                                    </IconButton>
                                                </Button.Group>
                                            </VStack>
                                        </Popover.Body>
                                    </Popover.Content>
                                </Popover>
                            </View>
                        </HStack>

                    </View>
                </VStack>
            </Box>
        </View>
    );
};

export default BalanceCard;