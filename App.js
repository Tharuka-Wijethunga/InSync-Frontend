import Colors from "./App/Utils/Colors";
import {StyleSheet, Text} from 'react-native';
import TabNavigation from "./App/Navigations/TabNavigation";
import Dashboard from "./App/Screens/Dashboard/Dashboard";


export default function App() {
    return (

        <TabNavigation/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BGColor,
        alignItems: "center",
        justifyContent: "center"
    },
});
