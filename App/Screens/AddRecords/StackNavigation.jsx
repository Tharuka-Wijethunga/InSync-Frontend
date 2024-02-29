import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Box} from "native-base";
import RecordForm from "./RecordForm";
import Category from "./Category";

const Stack = createNativeStackNavigator();

export default function TestNavigation() {
    return (
        <View >

            <Box h="100%" w="100%" overflow={"hidden"} rounded="2xl">
            <Stack.Navigator
            screenOptions={{
                animation:"slide_from_bottom",
                headerShown:false,
            }}>
                <Stack.Screen options={{headerShown:false}} name="RecordForm" component={RecordForm} />
                <Stack.Screen name="Category" component={Category} />
            </Stack.Navigator>
            </Box>

        </View>
    );
}