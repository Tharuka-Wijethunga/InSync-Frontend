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
        "Foods & Drinks": { color: '#F87171', gradientCenterColor: '#F87171' },
        "Shopping": { color: '#60A5FA', gradientCenterColor: '#60A5FA' },
        "Health": { color: '#4ADE80', gradientCenterColor: '#4ADE80' },
        "Vehicle": { color: '#FFEB3B', gradientCenterColor: '#FFEB3B' },
        "Public transport": { color: '#818CF8', gradientCenterColor: '#818CF8' },
        "Bills": { color: '#FB923C', gradientCenterColor: '#FB923C' },
        "Loans": { color: '#42A5F5', gradientCenterColor: '#42A5F5' },
        "Rent": { color: '#FF5733', gradientCenterColor: '#FF5733' },
        "Other": { color: '#808080', gradientCenterColor: '#808080' },
    };

    const categoryOrder = ["Foods & Drinks", "Shopping", "Health", "Vehicle", "Public transport", "Bills", "Loans", "Rent", "Other"];  // Ordered list of category names

    useEffect(() => {
        if (isFocused) {
            fetchStat();
        }
    }, [isFocused]);

    const fetchStat = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://192.168.248.230:8005/api/generalModel/ForecastNextDay`);
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
            setErrorMessage("No records added, Minimum one record needed for the prediction. Model will train at 12.05 am, for prediction, the model should be trained.");
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
