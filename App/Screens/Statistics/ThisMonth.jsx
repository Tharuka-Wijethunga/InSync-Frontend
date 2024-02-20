import { PieChart } from "react-native-gifted-charts";
import {View, Text, HStack,Box,Spacer} from "native-base";
import {FlatList} from "react-native";

export default  function ThisMonth() {
    const pieData = [
        {value: 47, color: '#009FFF', gradientCenterColor: '#006DFF',categoryName:"Food", amount:47000},
        {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE',categoryName:"Shopping", amount:4000},
        {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3',categoryName:"Shopping", amount:4000},
        {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97',categoryName:"Shopping", amount:4000},
        {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3',categoryName:"Shopping", amount:4000},
        {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97',categoryName:"Shopping", amount:4000},
        {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97',categoryName:"Shopping", amount:4000},

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