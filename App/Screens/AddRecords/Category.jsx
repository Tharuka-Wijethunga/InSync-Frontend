import React,{useState} from 'react';
import { HStack, IconButton, Modal, ScrollView, Text, View, VStack} from "native-base";
import { MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import CatButton from "./CatButton";

const CategoryModal = ({modalVisible, setModalVisible,setSelectedCategory,setAvatarColor,setCategorydName}) => {
    const handelSelectedCategory=(icon,avatarColor,catName)=>{
        setSelectedCategory(icon);
        setAvatarColor(avatarColor);
        setCategorydName(catName)
        setModalVisible(false);
    }
    return (
        <Modal isOpen={modalVisible} animationPreset="slide" safeAreaTop={12} backdropVisible={true} >
            <View backgroundColor={"white"} h="83%" w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3}>
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
                                    color={"yellow.400"}
                                    name={"Foods & Drinks"}
                                    onPress={()=>handelSelectedCategory("food","yellow.400","Foods & Drinks")}
                                />
                                <CatButton
                                    icon={<MaterialCommunityIcons name="shopping" size={30} color="white" />}
                                    color={"purple.400"}
                                    name={"shopping"}
                                    onPress={()=>handelSelectedCategory("shopping","purple.400","shopping")}
                                />
                            </HStack>
                            <HStack>
                                <CatButton
                                    icon={<MaterialCommunityIcons name="heart-pulse" size={30} color="white" />}
                                    color={"red.500"}
                                    name={"Health"}
                                    onPress={()=>handelSelectedCategory("heart-pulse","red.500","Health")}
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
                                    color={"blue.500"}
                                    name="Vehicle"
                                    onPress={()=>handelSelectedCategory("car-hatchback","blue.500","Vehicle")}
                                />
                                <CatButton
                                    icon={<MaterialCommunityIcons name="road-variant" size={30} color="white" />}
                                    color={"purple.600"}
                                    name="Public transport"
                                    onPress={()=>handelSelectedCategory("road-variant","purple.600","Public transport")}
                                />
                            </HStack>
                            <HStack>
                                <CatButton
                                    icon={<MaterialCommunityIcons name="file-document" size={30} color="white" />}
                                    color={"orange.400"}
                                    name="Bills"
                                    onPress={()=>handelSelectedCategory("file-document","orange.400","Bills")}
                                />
                                <CatButton
                                    icon={<MaterialCommunityIcons name="hand-coin" size={30} color="white" />}
                                    color={"blue.400"}
                                    name="Loans"
                                    onPress={()=>handelSelectedCategory("hand-coin","blue.400","Loans")}
                                />
                            </HStack>
                            <HStack>
                                <CatButton
                                    icon={<MaterialCommunityIcons name="home-alert" size={30} color="white" />}
                                    color={"rose.400"}
                                    name="Rent"
                                    onPress={()=>handelSelectedCategory("home-alert","rose.400","Rent")}
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