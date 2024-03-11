import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Box} from "native-base";
import RecordForm from "./RecordForm";
import Category from "./Category";

const Stack = createNativeStackNavigator();

export default function TestNavigation() {
    return (
        <View >
            <Box alignItems="center"
                 justifyContent="center" h="100%"   bg="white" rounded="2xl" shadow={3}>
                <Box h="100%" w="100%" paddingTop={3.5} paddingBottom={3.5}>
            <Stack.Navigator
            screenOptions={{
                animation:"fade_from_bottom",
                headerShown:false,

            }}>
                <Stack.Screen options={{headerShown:false}} name="RecordForm" component={RecordForm} />
                <Stack.Screen name="Category" component={Category} />
            </Stack.Navigator>
                </Box>
            </Box>
        </View>
    );
}