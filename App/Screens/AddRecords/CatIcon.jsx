import React from 'react';
import {Avatar, IconButton, Text, VStack} from "native-base";
import Colors from "../../Config/Colors";

const CatIcon = (props) => {
    return (
        <VStack flex={1}>
            <Avatar size="68px" bgColor={props.color} alignSelf={"center"}>
                {/*<IconButton*/}
                {/*    icon={props.icon}*/}
                {/*    borderRadius={"full"}*/}
                {/*    _pressed={{*/}
                {/*        bg:"blueGray.200:alpha.50",*/}
                {/*        size:"90"*/}
                {/*    }}*/}
                {/*></IconButton>*/}
                {props.icon}
            </Avatar>
            <Text textAlign={"center"} fontSize={14} fontWeight={"medium"}>
                {props.name}
            </Text>
        </VStack>
    );
};

export default CatIcon;