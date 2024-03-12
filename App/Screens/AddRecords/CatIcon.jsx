import React from 'react';
import {Avatar, Text, VStack} from "native-base";
import Colors from "../../Config/Colors";

const CatIcon = (props) => {
    return (
        <VStack w={"50%"}>
            <Avatar size="70px" bgColor={Colors.Blue} alignSelf={"center"}>
                {props.icon}
            </Avatar>
            <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>
                {props.name}
            </Text>
        </VStack>
    );
};

export default CatIcon;