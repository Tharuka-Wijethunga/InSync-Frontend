import {FlatList,Dimensions} from "react-native";
import {View, Box, VStack, Badge} from "native-base";
import React, {useState} from "react";
import DonutChart from "./DonutChart";
import Colors from "../../Utils/Colors";



export default  function Carousel(){

    const screenWidth =Dimensions.get("window").width;
    const [activeIndex,setActiveIndex]=useState(0);

    const caroselData=[
        {
            id:"01",
            month:"Previous Month"
        },
        {
            id:"02",
            month:"This Month"
        },
        {
            id:"03",
            month:"Next Month"
        },
    ];


//Handel Scroll
    const handelScroll=(event)=>{
        //get the scroll position
        const scrollPosition=event.nativeEvent.contentOffset.x;

        //get the index of current active item
        let index=scrollPosition/screenWidth;
        index=Math.ceil(index);
        console.log(index);
        setActiveIndex(index);
    };

//Render Dot Indicators
    const  renderDotIndicators=()=>{
        return caroselData.map((dot,index)=>{

            if(activeIndex === index){
                return (
                    <View style={{
                        backgroundColor:"#1A91FF",
                        height:10,
                        width: 10,
                        borderRadius:5,
                        marginHorizontal:6,
                    }}>
                    </View>
                )
            }else {
                return(
                    <View
                        key={index}
                        style={{
                            backgroundColor:"#94A3B8",
                            height:10,
                            width: 10,
                            borderRadius:5,
                            marginHorizontal:6,
                        }}>
                    </View>
                )
            }
        })
    };

    const renderItem=({item})=>{
        return(
            <View>
                <Box flexGrow={1} width={screenWidth} paddingBottom={4}  alignItems={"center"}>
                    <Box h="100%" width="94%" bg="white" rounded="20" shadow={3} paddingX={5} paddingY={5}>
                        <VStack flex={1} >
                            {/*DonutChart get the rest of the Body*/}
                                <DonutChart></DonutChart>
                            {/*Badge is fixed at Bottom*/}
                                <Badge position="absolute" bottom={0}   alignSelf="center" variant="outline" width="155" height="34" rounded="16" borderColor={Colors.Blue} borderWidth={1.5} _text={{fontSize:15,color:Colors.Blue}}>{item.month}</Badge>
                        </VStack>

                    </Box>
                </Box>
            </View>
        )
    };

//main View
    return(
        <View >
            <VStack height={"100%"} >
                <FlatList data={caroselData} renderItem={renderItem} pagingEnabled={true} horizontal showsHorizontalScrollIndicator={false} onScroll={handelScroll} keyExtractor={(item)=>item.id}></FlatList>
                <View style={{flexDirection:'row',justifyContent:'center',}}>{renderDotIndicators()}</View>
            </VStack>

        </View>
    )
}
