import React,{useState} from 'react';
import { HStack, IconButton, Modal, ScrollView, Text, View, VStack} from "native-base";
import { MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import CatButton from "../CatButton";

const CategoryModal = ({modalVisible, setModalVisible,setSelectedCategory,setAvatarColor,setCategoryName,setCategory}) => {
    const handelSelectedCategory=(icon,avatarColor,catName)=>{
        setSelectedCategory(icon);
        setAvatarColor(avatarColor);
        setCategoryName(catName);
        setModalVisible(false);

    }
    return (
        <Modal isOpen={modalVisible} animationPreset="slide"  backdropVisible={true} >
            <View backgroundColor={"white"}  marginTop={"30%"} marginBottom={"17%"}  w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3}>
                <VStack h="100%" alignSelf="center" paddingTop={2} >
                    <HStack justifyContent="space-between" alignItems="center" paddingLeft={4} >
                        <IconButton
                            icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black"/>}
                            onPress={()=>setModalVisible(false)}
                            borderRadius="full"
                            _pressed={{
                                bg: "blueGray.200:alpha.50"
                            }}
                        />
                        <Text fontSize={18} fontWeight={"medium"} paddingRight={6}>Categories</Text>
                    </HStack>
                    <View h={0.480} bg="black"/>
                    <ScrollView showsVerticalScrollIndicator={false} maxH={570}>
                        <VStack  paddingBottom={3} paddingTop={4} paddingX={1}>
                            <HStack>
                                <CatButton
                                    icon={<MaterialCommunityIcons name="food" size={30} color="white" />}
                                    color={"amber.400"}
                                    name={"Foods & Drinks"}
                                    onPress={()=>handelSelectedCategory("food","amber.400","Foods & Drinks")}
                                />
                                <CatButton
                                    icon={<MaterialCommunityIcons name="shopping" size={30} color="white" />}
                                    color={"violet.500"}
                                    name={"shopping"}
                                    onPress={()=>handelSelectedCategory("shopping","violet.500","shopping")}
                                />
                            </HStack>
                            <HStack>
                                <CatButton
                                    icon={<MaterialCommunityIcons name="heart-pulse" size={30} color="white" />}
                                    color={"rose.500"}
                                    name={"Health"}
                                    onPress={()=>handelSelectedCategory("heart-pulse","rose.500","Health")}
                                />
                                <CatButton
                                    icon={<MaterialCommunityIcons name="cash-plus" size={35} color="white" />}
                                    color={"green.500"}
                                    name="Income"
                                    onPress={()=>handelSelectedCategory("cash-plus","green.500","Income")}
                                />
                            </HStack>
                            <HStack>
                                <CatButton
                                    icon={<MaterialCommunityIcons name="car-hatchback" size={30} color="white" />}
                                    color={"lightBlue.400"}
                                    name="Vehicle"
                                    onPress={()=>handelSelectedCategory("car-hatchback","lightBlue.400","Vehicle")}
                                />
                                <CatButton
                                    icon={<MaterialCommunityIcons name="road-variant" size={30} color="white" />}
                                    color={"indigo.500"}
                                    name="Public transport"
                                    onPress={()=>handelSelectedCategory("road-variant","indigo.500","Public transport")}
                                />
                            </HStack>
                            <HStack>
                                <CatButton
                                    icon={<MaterialCommunityIcons name="file-document" size={30} color="white" />}
                                    color={"emerald.400"}
                                    name="Bills"
                                    onPress={()=>handelSelectedCategory("file-document","emerald.400","Bills")}
                                />
                                <CatButton
                                    icon={<MaterialCommunityIcons name="hand-coin" size={30} color="white" />}
                                    color={"secondary.500"}
                                    name="Loans"
                                    onPress={()=>handelSelectedCategory("hand-coin","secondary.500","Loans")}
                                />
                            </HStack>
                            <HStack>
                                <CatButton
                                    icon={<MaterialCommunityIcons name="home-alert" size={30} color="white" />}
                                    color={"warning.500"}
                                    name="Rent"
                                    onPress={()=>handelSelectedCategory("home-alert","warning.500","Rent")}
                                />
                                <CatButton
                                    icon={<MaterialCommunityIcons name="menu" size={30} color="white" />}
                                    color={"grey"}
                                    name="Other"
                                    onPress={()=>handelSelectedCategory("menu","grey","Other")}
                                />
                            </HStack>
                        </VStack>
                    </ScrollView>
                </VStack>

            </View>
        </Modal>
    );
};


export default CategoryModal;