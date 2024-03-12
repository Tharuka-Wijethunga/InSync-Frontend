import {createStackNavigator} from '@react-navigation/stack';
import {View, Box, Text} from "native-base";
import RecordForm from "./RecordForm";
import Category from "./Category";
import {MaterialIcons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import Colors from "../../Config/Colors";

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <View>
            <Box h="100%" w="100%">
                <Stack.Navigator
                    screenOptions={{
                        presentation: "transparentModal",
                        cardStyle: {backgroundColor: 'transparent'},
                    }}>
                    <Stack.Screen name="RecordForm" options={{headerShown: false}} component={RecordForm}/>
                    <Stack.Screen name="Category"
                                  options={{
                                      headerShown: false,
                                      headerBackTitleVisible: false,
                                      headerTitle: "",
                                      headerRightContainerStyle: {paddingRight: 30},
                                      headerBackgroundContainerStyle: {borderBottomWidth: 1, borderBottomColor: "black"}
                                  }} component={Category}/>
                </Stack.Navigator>
            </Box>
        </View>
    );
}