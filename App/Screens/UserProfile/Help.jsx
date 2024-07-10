import React from 'react';
import {
    Text,
    Box,
    VStack,
    View,
    HStack,
    IconButton,
    ScrollView,
    Center,
    Heading
} from "native-base";
import {StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
export default function Help(){
    const navigation = useNavigation();

    return(
        <View paddingY={3} flex={1}>
            <Box backgroundColor={"white"} h={"97%"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} flex={1}  >
                <HStack justifyContent="space-between" alignItems="center"  paddingLeft={1} marginTop={2}>
                    <IconButton
                        icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black"/>}
                        onPress={() => navigation.navigate('Profile')}
                        borderRadius="full"
                        _pressed={{
                            bg: "blueGray.200:alpha.50"
                        }}
                    />
                    <Text fontSize={18} fontWeight={"medium"} paddingRight={6} >Help</Text>
                </HStack>
                <ScrollView style={styles.container}>
                    <Center>
                        <VStack space={4} w="90%" mt={5}>
                            <Heading size="lg" textAlign="center">Welcome to InSync</Heading>
                            <Text>
                                InSync is your personal financial management tool designed to help you make informed financial decisions. This guide will walk you through the steps to get started and make the most out of InSync's features.
                            </Text>

                            <Heading size="md">Navigating the App</Heading>
                            <Text>
                                InSync features a user-friendly interface with the following main sections:
                            </Text>
                            <Text>
                                1. <Text bold>Dashboard:</Text> View your overall financial summary, including bank and cash balances, recent activities, and upcoming expenses.
                            </Text>
                            <Text>
                                2. <Text bold>Add Record:</Text> To add a new financial record, tap the 'Add Record' button. Choose between 'Income' and 'Expense' by tapping the respective button. Enter the amount and select the appropriate category. Choose the account type (Bank or Cash). Save the record by tapping 'Save'.
                            </Text>
                            <Text>
                                3. <Text bold>View Records:</Text> View all your financial records by navigating to the 'Records' section. Filter and sort your records based on date, amount, or category.
                            </Text>
                            <Text>
                                4. <Text bold>Settings:</Text> Access the 'Settings' menu to customize your preferences, manage your profile, and configure notifications.
                            </Text>

                            <Heading size="md">Features</Heading>
                            <Text>
                                1. <Text bold>Daily Expense Tracking:</Text> Track your daily expenses and stay on top of your spending habits. View a summary of your daily expenses on the dashboard.
                            </Text>
                            <Text>
                                2. <Text bold>Financial Forecasting:</Text> Get insights into your future financial needs based on your spending patterns. Plan better with InSync's predictive analysis.
                            </Text>
                            <Text>
                                3. <Text bold>Balance Management:</Text> Easily update and manage your bank and cash balances. Use the 'Edit' button on the balance cards to adjust your balances as needed.
                            </Text>
                            <Text>
                                4. <Text bold>Category Management:</Text> Organize your expenses and income into categories for better tracking and analysis. Add, edit, or delete categories from the settings menu.
                            </Text>

                            <Heading size="md">Tips for Using InSync</Heading>
                            <Text>
                                - <Text bold>Keep Your Records Up-to-Date:</Text> Regularly update your income and expenses to ensure accurate financial tracking.
                            </Text>
                            <Text>
                                - <Text bold>Use Categories Effectively:</Text> Categorize your transactions to get detailed insights into your spending habits.
                            </Text>
                            <Text>
                                - <Text bold>Set Financial Goals:</Text> Use the forecasting feature to set and achieve your financial goals.
                            </Text>
                            <Text>
                                - <Text bold>Secure Your Data:</Text> Enable biometric authentication or set a strong password to keep your financial data secure.
                            </Text>

                            <Heading size="md">Troubleshooting</Heading>
                            <Text>
                                - <Text bold>Can't Log In?</Text> Ensure you are entering the correct credentials. If you've forgotten your password, use the 'Forgot Password' link to reset it.
                            </Text>
                            <Text>
                                - <Text bold>App Crashes or Freezes:</Text> Try restarting the app. If the problem persists, check for updates or reinstall the app.
                            </Text>
                            <Text>
                                - <Text bold>Incorrect Balance:</Text> Double-check your entries for any errors. Use the 'Edit' feature to correct any mistakes.
                            </Text>

                            <Heading size="md">Contact Support</Heading>
                            <Text>
                                If you encounter any issues or have any questions, feel free to reach out to our support team:
                            </Text>
                            <Text>
                                - <Text bold>Email:</Text> support@insyncapp.com
                            </Text>
                            <Text>
                                - <Text bold>Phone:</Text> +94 (70) 2102787
                            </Text>
                            <Text>
                                - <Text bold>Website:</Text> www.insyncapp.com/support
                            </Text>

                            <Text paddingBottom={10}>
                                Thank you for choosing InSync to manage your finances. We are committed to helping you achieve financial stability and success.
                            </Text>
                        </VStack>
                    </Center>
                </ScrollView>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
});
