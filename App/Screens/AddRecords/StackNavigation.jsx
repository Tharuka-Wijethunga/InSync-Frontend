import { createStackNavigator } from '@react-navigation/stack';
import {Text,Box, View} from "native-base";
import RecordForm from "./RecordForm";
import Category from "./Category";
import React from "react";
import {MaterialIcons} from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function StackNavigation(){
    return (
        <View >

            <Box h="100%" w="100%" overflow={"hidden"} rounded="2xl">
                <Stack.Navigator
                    screenOptions={{
                        presentation: "modal",
                        cardStyle: { backgroundColor: 'transparent' },
                        headerBackImage: () => <MaterialIcons name="keyboard-arrow-left" size={28} color="black" />,
                    }}>
                    <Stack.Screen name="RecordForm" options={{headerShown:false}} component={RecordForm} />
                    <Stack.Screen name="Category"
                                  options={{
                                      headerTitle:"",
                                      headerRight:()=><Text fontSize={18} fontWeight={"medium"} >Category</Text>,
                                      headerRightContainerStyle:{paddingRight:15},
                                      headerBackgroundContainerStyle:{borderBottomWidth:1,borderBottomColor:"black"}
                                  }} component={Category} />
                </Stack.Navigator>

            </Box>

        </View>
    );
}

