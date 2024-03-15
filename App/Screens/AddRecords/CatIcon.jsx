import React from 'react';
import {Avatar, Text, VStack} from "native-base";

const CatIcon = (props) => {
    return (
        <VStack flex={1}>
            <Avatar size="68px" bgColor={props.color} alignSelf={"center"}>
                {props.icon}
            </Avatar>
            <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>
                {props.name}
            </Text>
        </VStack>
    );
};

export default CatIcon;