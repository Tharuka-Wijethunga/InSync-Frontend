import React, {useState} from 'react';
import {Text, Box, VStack, View, HStack, IconButton, Popover, Button, Select, CheckIcon} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
export default function Help(){
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState("auto");

    return(
        <View paddingY={3} flex={1}>
        <Box backgroundColor={"white"} h={"97%"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} flex={1}  >
            <HStack justifyContent="space-between" alignItems="center"  paddingLeft={1} marginTop={2}>
                <IconButton
                    icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black"/>}
                    onPress={() => navigation.navigate('Profile')}
                    borderRadius="full"
                    _pressed={{
                        bg: "blueGray.200:alpha.50"
                    }}
                />
                <Text fontSize={18} fontWeight={"medium"} paddingRight={6} >Help</Text>
            </HStack>

            <View h={0.480} bg="black"/>
            <VStack space={5} padding={5} >
                <Box w="100%" alignItems="center">
                    <VStack space={6} alignSelf="flex-start" w="100%">
                        <Popover // @ts-ignore

                            offset={-100}
                            placement={position === "auto" ? undefined : position} trigger={triggerProps => {
                            return <Button colorScheme="danger" alignSelf="center" {...triggerProps} onPress={() => setIsOpen(true)}>
                                Delete Customer
                            </Button>;
                        }} isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
                            <Popover.Content w="56">
                                <Popover.Arrow />
                                <Popover.CloseButton onPress={() => setIsOpen(false)} />
                                <Popover.Header>Delete Customer</Popover.Header>
                                <Popover.Body>
                                    This will remove all data relating to Alex. This action cannot be
                                    reversed. Deleted data can not be recovered.
                                </Popover.Body>
                                <Popover.Footer justifyContent="flex-end">
                                    <Button.Group space={2}>
                                        <Button colorScheme="coolGray" variant="ghost" onPress={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme="danger" onPress={() => setIsOpen(false)}>
                                            Delete
                                        </Button>
                                    </Button.Group>
                                </Popover.Footer>
                            </Popover.Content>
                        </Popover>

                        <Select selectedValue={position} mx={{
                            base: 0,
                            md: "auto"
                        }} accessibilityLabel="Select a position for Popover" onValueChange={nextValue => setPosition(nextValue)} _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />
                        }}>
                            <Select.Item label="auto" value="auto" />
                            <Select.Item label="Top Left" value="top left" />
                            <Select.Item label="Top" value="top" />
                            <Select.Item label="Top Right" value="top right" />
                            <Select.Item label="Right Top" value="right top" />
                            <Select.Item label="Right" value="right" />
                            <Select.Item label="Right Bottom" value="right bottom" />
                            <Select.Item label="Bottom Left" value="bottom left" />
                            <Select.Item label="Bottom" value="bottom" />
                            <Select.Item label="Bottom Right" value="bottom right" />
                            <Select.Item label="Left Top" value="left top" />
                            <Select.Item label="Left" value="left" />
                            <Select.Item label="Left Bottom" value="left bottom" />
                        </Select>
                    </VStack>
                </Box>
                <Text fontWeight={"medium"} fontSize={24} paddingBottom={5} >How To Use:</Text>
                <Text fontSize={15}>- Dashboard Insights: Explore your dashboard for a quick overview of your financial status.</Text>
                <Text fontSize={15}>- Predict Future Balances: Head to the "Future Balance" section, adjust spending assumptions, and witness our predictive model in action.</Text>
                <Text fontSize={15}>- Add Transactions: Navigate to the "Add Record" section to effortlessly input new transactions.</Text>
                <Text fontSize={15}>- Explore Statistics: Visit the "Statistics" tab to visualize your financial data through charts and graphs.</Text>
                <Text fontSize={15}>- Profile Management: Access the profile section to view and update your personal information.</Text>
                <Text fontSize={15}>- Stay Notified: Enable notifications for planned payments to receive timely reminders and manage your expenses effectively.</Text>
            </VStack>
        </Box>
        </View>
    )
}