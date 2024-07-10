import { PieChart } from "react-native-gifted-charts";
import { View, Text, HStack, Box, Spacer, Spinner } from "native-base";
import axios from "axios";
import { FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Colors from "../../Config/Colors";

export default function NextMonth() {
    const isFocused = useIsFocused();
    const [pieData, setPieData] = useState([]);
    const [TotalAmount, setTotalAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const categoryColors = {
        "Foods & Drinks": { color: '#fbbf24', gradientCenterColor: '#fbbf24' },
        "shopping": { color: '#8b5cf6', gradientCenterColor: '#8b5cf6' },
        "Health": { color: '#f43f5e', gradientCenterColor: '#f43f5e' },
        "Vehicle": { color: '#38bdf8', gradientCenterColor: '#38bdf8' },
        "Public transport": { color: '#6366f1', gradientCenterColor: '#6366f1' },
        "Bills": { color: '#34d399', gradientCenterColor: '#34d399' },
        "Loans": { color: '#ec4899', gradientCenterColor: '#ec4899' },
        "Rent": { color: '#F97316', gradientCenterColor: '#F97316' },
        "Other": { color: '#808080', gradientCenterColor: '#808080' },
    };

    const categoryOrder = ["Foods & Drinks", "shopping", "Health", "Vehicle", "Public transport", "Bills", "Loans", "Rent", "Other"];  // Ordered list of category names

    useEffect(() => {
        if (isFocused) {
            fetchStat();
        }
    }, [isFocused]);

    const fetchStat = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://insyncapi.azurewebsites.net/api/userModel/ForecastNextDay`);
            const data = response.data;
            setTotalAmount(data.Total);

            const pieData = categoryOrder.map(category => {
                if (data[category]) {
                    const { Amount, Value } = data[category];
                    const colors = categoryColors[category];
                    return {
                        value: Value,
                        color: colors.color,
                        gradientCenterColor: colors.gradientCenterColor,
                        categoryName: category,
                        amount: Amount
                    };
                }
                return null;
            }).filter(item => item !== null); // Filter out any null items

            setPieData(pieData);
            setErrorMessage("");  // Clear any previous error messages
        } catch (error) {
            console.error(error);
            setErrorMessage("No records added, Minimum records of 3 days needed for the prediction. Model will train at 12.05 am, for prediction, the model should be trained.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View>
                <Box pl={["8", "4"]} pr={["8", "5"]} py="3">
                    <HStack space={[2, 3]} justifyContent={"space-between"} alignItems={"center"}>
                        {renderDot(item.color)}
                        <Text>{item.categoryName}</Text>
                        <Spacer />
                        <Text>{item.amount}</Text>
                    </HStack>
                </Box>
            </View>
        );
    };

    const renderDot = color => {
        return (
            <View
                style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: color, marginRight: 10 }} />
        );
    };

    return (
        <View flex={1} backgroundColor={"white"}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 20, paddingTop: 15 }}>
                Expected Spending
            </Text>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size="lg" color={Colors.DBlue} />
                </View>
            ) : errorMessage ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} padding={2}>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: Colors.DBlue }}>{errorMessage}</Text>
                </View>
            ) : (
                <>
                    <View style={{ padding: 22, alignItems: 'center' }}>
                        <PieChart
                            data={pieData}
                            donut
                            showGradient
                            radius={90}
                            innerRadius={55}
                            centerLabelComponent={() => {
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                                            All
                                        </Text>
                                        <Text style={{ fontSize: 14 }}>LKR {TotalAmount}</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    {/*maxH is used to show only 6 categories,to see more scroll*/}
                    <View maxH={"280"}>
                        <FlatList data={pieData} renderItem={renderItem}></FlatList>
                    </View>
                </>
            )}
        </View>
    );
}
