import React from 'react';
import Colors from "../../Config/Colors";
import {Input,Button, Box, VStack, View,FormControl,Text,WarningOutlineIcon} from "native-base";
export default function EditProfile() {
    return (
        <View paddingY={3} flex={1}>
            <Box backgroundColor={"white"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} padding={5}  >
                <VStack space={3}>

                    <FormControl paddingBottom={4}>
                        <FormControl.Label>Change Profile Details</FormControl.Label>
                        <Input variant="underlined" placeholder="First Name" />
                        <Input variant="underlined" placeholder="Last Name" />
                        <Input variant="underlined" placeholder="Email" />
                    </FormControl >

                    <FormControl paddingBottom={2}>
                        <FormControl.Label>Change Password</FormControl.Label>
                        <Input type={"password"} variant="underlined" placeholder="Enter a new password"   focusBorderColor="gray.200"/>
                        <FormControl.HelperText >
                            Must be atleast 6 characters.
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>

                        <Input type={"password"} variant="underlined" placeholder="Confirm password"   focusBorderColor="gray.200" />
                    </FormControl>
                </VStack>
            </Box>
            <Button marginTop={4} w="94%" overflow={"hidden"} rounded="full" alignSelf="center" shadow={3}  backgroundColor={Colors.Blue}>
                <Text fontSize={16} fontWeight={"medium"} color={"white"}>Save</Text>
            </Button>
        </View>
    )
}