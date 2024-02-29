import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View, Box} from "native-base";
import ThisMonth from "./ThisMonth";
import PreviousMonth from "./PreviousMonth";
import NextMonth from "./NextMonth";


const Tab = createMaterialTopTabNavigator();

export default function TopNavigation(){
    return (
        <View >
            <Box alignItems="center"
                 justifyContent="center" h="100%"   bg="white" rounded="2xl" shadow={3}>
            <Box h="100%" w="100%" paddingTop={3.5} paddingBottom={3.5}>
        <Tab.Navigator  backBehavior="initialRoute" initialRouteName="This Month" screenOptions={{ tabBarAndroidRipple: false,
            tabBarPressColor:null,
            tabBarLabelStyle: {fontWeight: "500"}
        }}>
            <Tab.Screen name="Past Month" component={PreviousMonth} />
            <Tab.Screen name="This Month" component={ThisMonth} />
            <Tab.Screen name="Next Month" component={NextMonth} />
        </Tab.Navigator>
            </Box>
            </Box>
        </View>

    );
}
