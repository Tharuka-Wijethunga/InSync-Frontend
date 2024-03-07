import React from 'react';
import {Text, Box, VStack, View} from "native-base";
export default function Help(){
    return(
        <View paddingY={3} flex={1}>
        <Box backgroundColor={"white"} h={"97%"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} padding={5} flex={1}  >
            <VStack space={5}>
                <Text fontWeight={"medium"} fontSize={24} paddingBottom={7} paddingTop={2}>How To Use:</Text>
                <Text fontSize={15}>- Dashboard Insights: Explore your dashboard for a quick overview of your financial status.</Text>
                <Text fontSize={15}>- Predict Future Balances: Head to the "Future Balance" section, adjust spending assumptions, and witness our predictive model in action.</Text>
                <Text fontSize={15}>- Add Transactions: Navigate to the "Add Record" section to effortlessly input new transactions.</Text>
                <Text fontSize={15}>- Explore Statistics: Visit the "Statistics" tab to visualize your financial data through charts and graphs.</Text>
                <Text fontSize={15}>- Profile Management: Access the profile section to view and update your personal information.</Text>
                <Text fontSize={15}>- Stay Notified: Enable notifications for planned payments to receive timely reminders and manage your expenses effectively.</Text>
            </VStack>
        </Box>
        </View>
    )
}