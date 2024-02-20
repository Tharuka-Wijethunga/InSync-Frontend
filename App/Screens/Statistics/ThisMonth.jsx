import { PieChart } from "react-native-gifted-charts";
import {View, Text, HStack,Box,Spacer} from "native-base";
import {FlatList} from "react-native";

export default  function ThisMonth() {
    const pieData = [
        {value: 60, color: '#F87171',gradientCenterColor: '#F87171',categoryName:"Food", amount:30000},
        {value: 9, color: '#60A5FA',gradientCenterColor: '#60A5FA',categoryName:"Shopping", amount:4500},
        {value: 2, color: '#4ADE80',gradientCenterColor: '#4ADE80',categoryName:"Health", amount:1000},
        {value: 10, color: '#A8A29E',gradientCenterColor: '#A8A29E',categoryName:"Vehicle", amount:5000},
        {value: 12, color: '#FACC15',gradientCenterColor: '#FACC15',categoryName:"Rent", amount:6000},
        {value: 1, color: '#818CF8',gradientCenterColor: '#818CF8',categoryName:"Transport", amount:500},
        {value: 6, color: '#FB923C',gradientCenterColor: '#FB923C',categoryName:"Other", amount:3000},

    ];

    const renderItem=({item})=>{
        return(
            <View>
                <Box pl={["8", "4"]} pr={["8", "5"]} py="3">
                    <HStack space={[2,3]} justifyContent={"space-between"} alignItems={"center"}>
                        {renderDot(item.color)}
                        <Text>{item.categoryName}</Text>
                        <Spacer/>
                        <Text>{item.amount}</Text>
                    </HStack>
                </Box>
            </View>
        )
    }

    const renderDot = color => {
        return (
            <View
                style={{height: 10, width: 10, borderRadius: 5, backgroundColor: color, marginRight: 10,}}/>
        );
    };


    return (
        <View  flex={1} backgroundColor={"white"}>

            <Text style={{fontSize: 16, fontWeight: 'bold', paddingLeft:20,  paddingTop:15}}>
                Spending
            </Text>
            <View style={{padding: 22, alignItems: 'center'}}>
                <PieChart
                    data={pieData}
                    donut
                    showGradient
                    radius={90}
                    innerRadius={60}
                    centerLabelComponent={() => {
                        return (
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text
                                    style={{fontSize: 22, fontWeight: 'bold'}}>
                                    All
                                </Text>
                                <Text style={{fontSize: 14}}>$1000,00</Text>
                            </View>
                        );
                    }}
                />
            </View>
            {/*maxH is used to show only 6 categories,to see more scroll*/}
            <View maxH={"280"}>
                <FlatList data={pieData} renderItem={renderItem}></FlatList>
            </View>

        </View>);
}