import { PieChart } from "react-native-gifted-charts";
import { View, Text, HStack, Box, Spacer } from "native-base";
import { FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import Colors from "../../Config/Colors";

export default function PreviousMonth() {
    const isFocused = useIsFocused();
    const [pieData, setPieData] = useState([]);
    const [TotalAmount, setTotalAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

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
            fetchMonthStat();
            fetchMonthTotal();
        }
    }, [isFocused]);

    const fetchMonthTotal = async () => {
        axios.get(`https://0579-2a09-bac5-4863-1028-00-19c-47.ngrok-free.app/api/statistics/previousMonthTotal`)
            .then(response => {
                setTotalAmount(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const fetchMonthStat = async () => {
        axios.get(`https://0579-2a09-bac5-4863-1028-00-19c-47.ngrok-free.app/api/statistics/previousMonthStat`)
            .then(response => {
                let data = response.data.map(item => {
                    const colors = categoryColors[item._id];
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
                setErrorMessage("");  // Clear any previous error messages
            })
            .catch(error => {
                if (error.response && error.response.data.detail) {
                    setErrorMessage(error.response.data.detail);
                }
                console.error(error);
            });
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
        )
    }

    const renderDot = color => {
        return (
            <View
                style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: color, marginRight: 10, }} />
        );
    };

    return (
        <View flex={1} backgroundColor={"white"}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 20, paddingTop: 15 }}>
                Spending History
            </Text>
            {errorMessage ? (
                <View style={{ flex:1, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{ fontSize: 14, color:Colors.DBlue }}>{errorMessage}</Text>
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
