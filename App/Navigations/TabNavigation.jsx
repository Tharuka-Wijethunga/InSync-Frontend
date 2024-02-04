import React from 'react';
import Colors from "../Utils/Colors";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "../Screens/Dashboard/Dashboard";
import AddRecords from "../Screens/AddRecords/AddRecords";
import Statistics from "../Screens/Statistics/Statistics";
import UserProfile from "../Screens/UserProfile/UserProfile";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Octicons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import Hstack from "native-base/src/theme/components/hstack";
import {IconButton} from "native-base";
import {Text} from "react-native";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.Blue,
                tabBarInactiveTintColor: Colors.IconColor,
            }}>
                <Tab.Screen
                    name='Dashboard'
                    component={Dashboard}
                    options={{
                        tabBarIcon: ({color}) => <Octicons name="home" size={28} color={color}/>,
                    }}
                />
                <Tab.Screen
                    name='Add Records'
                    component={AddRecords}
                    options={{
                        tabBarIcon: ({color}) => <Ionicons name="add-circle" size={32} color={color}/>,
                    }}
                />
                <Tab.Screen
                    name='Statistics'
                    component={Statistics}
                    options={{
                        tabBarIcon: ({color}) => <FontAwesome5 name="chart-bar" size={28} color={color}/>,
                    }}
                />
                <Tab.Screen
                    name='User Profile'
                    component={UserProfile}
                    options={{
                        tabBarIcon: ({color}) => <FontAwesome6 name="user-circle" size={28} color={color}/>,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}