import { createStackNavigator } from '@react-navigation/stack';
import Colors from "../../Config/Colors";
import Profile from "./Profile";
import Help from "./Help";
import EditProfile from "./EditProfile";

const Stack = createStackNavigator();

export default function ProfileNavigation() {
    return (
            <Stack.Navigator screenOptions={{
                headerShown:false,
                cardStyle:{ backgroundColor: Colors.BGColor }
            }}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Help" component={Help} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
            </Stack.Navigator>
    );
}