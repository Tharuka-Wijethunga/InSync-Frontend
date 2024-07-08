import { PieChart, LineChart } from "react-native-gifted-charts";
import { View, Text, HStack, Box, Spacer, Spinner, IconButton } from "native-base";
import { FlatList, Dimensions } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../Config/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function ThisMonth() {
    const isFocused = useIsFocused();
    const [pieData, setPieData] = useState([]);
    const [TotalAmount, setTotalAmount] = useState(0);
    const [pieErrorMessage, setPieErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [showPieChart, setShowPieChart] = useState(true);
    const deviceWidth = Dimensions.get("window").width;
    const [lineData, setLineData] = useState([]);
    const [lineErrorMessage, setLineErrorMessage] = useState("");

    const categoryColors = {
        "Foods & Drinks": { color: '#F87171', gradientCenterColor: '#F87171' },
        "shopping": { color: '#60A5FA', gradientCenterColor: '#60A5FA' },
        "Health": { color: '#4ADE80', gradientCenterColor: '#4ADE80' },
        "Vehicle": { color: '#FFEB3B', gradientCenterColor: '#FFEB3B' },
        "Public transport": { color: '#818CF8', gradientCenterColor: '#818CF8' },
        "Bills": { color: '#FB923C', gradientCenterColor: '#FB923C' },
        "Loans": { color: '#42A5F5', gradientCenterColor: '#42A5F5' },
        "Rent": { color: '#FF5733', gradientCenterColor: '#FF5733' },
        "Other": { color: '#808080', gradientCenterColor: '#808080' },
    };

    const categoryOrder = ["Foods & Drinks", "shopping", "Health", "Vehicle", "Public transport", "Bills", "Loans", "Rent", "Other"];  // Ordered list of category names

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            await fetchMonthTotal();
            await fetchMonthStat();
            await fetchInflationData();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMonthTotal = async () => {
        try {
            const response = await axios.get(`http://192.168.248.230:8006/api/statistics/thisMonthTotal`);
            setTotalAmount(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMonthStat = async () => {
        try {
            const response = await axios.get(`http://192.168.248.230:8006/api/statistics/thisMonthStat`);
            const data = response.data.map(item => {
                const colors = categoryColors[item._id]; //get the color according to the category name
                return {
                    value: item.value,
                    color: colors.color,
                    gradientCenterColor: colors.gradientCenterColor,
                    categoryName: item._id,
                    amount: item.sum
                };
            });
            data.sort((a, b) => categoryOrder.indexOf(a.categoryName) - categoryOrder.indexOf(b.categoryName));  // Sort the data based on the order of category names in categoryOrder
            setPieData(data);  // Set pieData with the sorted data
            setPieErrorMessage("");
        } catch (error) {
            if (error.response && error.response.data.detail) {
                setPieErrorMessage(error.response.data.detail);
            }
            console.error(error);
        }
    };

    const fetchInflationData = async () => {
        try {
            const response = await axios.get(`http://192.168.248.230:8006/api/statistics/inflation`);
            const data = response.data.map(item => ({
                value: parseFloat(item['CCPI H Inflation']),
                label: item['Date']
            }));
            setLineData(data);
            setLineErrorMessage("");
        } catch (error) {
            setLineErrorMessage("Failed to fetch inflation data. Please try again later.");
            console.error(error);
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
                        <Text>LKR {item.amount}</Text>
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
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size="lg" color={Colors.DBlue} />
                </View>
            ) : (
                <>
                    {showPieChart ? (
                        pieErrorMessage ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: Colors.DBlue }}>{pieErrorMessage}</Text>
                            </View>
                        ) : (
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 20, paddingTop: 15 }}>
                                    Spending
                                </Text>
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
                                <View maxH={"280"}>
                                    <FlatList data={pieData} renderItem={renderItem}></FlatList>
                                </View>
                            </View>
                        )
                    ) : (
                        lineErrorMessage ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: Colors.DBlue }}>{lineErrorMessage}</Text>
                            </View>
                        ) : (
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 20, paddingTop: 15 }}>
                                    Consumer Price Inflation
                                </Text>
                                <View paddingTop={8} alignSelf={'center'} paddingRight={4}>
                                    <LineChart
                                        data={lineData}
                                        rotateLabel
                                        isAnimated
                                        xAxisLabelTextStyle={{ fontSize: 8 }}
                                        yAxisTextStyle={{ fontSize: 8 }}
                                        hideRules
                                        initialSpacing={10}
                                        spacing={deviceWidth / 15}
                                        dataPointsColor={Colors.DBlue}
                                        color={Colors.Blue}
                                        thickness={2}
                                        pointerConfig={{
                                            pointerStripHeight: 160,
                                            pointerStripColor: Colors.BGColor,
                                            pointerStripWidth: 2,
                                            pointerColor: Colors.DBlue,
                                            radius: 6,
                                            pointerLabelWidth: 100,
                                            pointerLabelHeight: 90,
                                            autoAdjustPointerLabelPosition: false,
                                            pointerLabelComponent: items => {
                                                return (
                                                    <View
                                                        style={{
                                                            height: 90,
                                                            width: 100,
                                                            justifyContent: 'center',
                                                            marginTop: -10,
                                                            marginLeft: -40,
                                                        }}>
                                                        <View style={{ marginHorizontal: 20, paddingVertical: 6, borderRadius: 16, backgroundColor: Colors.BGColor }}>
                                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                                {items[0].value}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                );
                                            },
                                        }}
                                    />
                                </View>
                                <Text style={{textAlign: 'center', fontSize: 12, paddingLeft: 20, paddingTop: 30}}>
                                    Colombo Consumer Price Index (CCPI){"\n"}
                                    (CCPI, 2021=100)
                                </Text>
                            </View>
                        )
                    )}
                    <IconButton
                        style={{ position: 'absolute', bottom: 12, left: 0, right: 0,marginHorizontal:25}}
                        icon={<MaterialIcons name={showPieChart ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={30} color="black"/>}
                        borderRadius="full"
                        _pressed={{
                            bg: "blueGray.200:alpha.50"
                        }}
                        onPress={() => setShowPieChart(!showPieChart)}
                    >
                    </IconButton>
                </>
            )}
        </View>
    );
}
