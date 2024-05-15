import React from 'react';
import { HStack, IconButton, Modal, ScrollView, Text, View, VStack} from "native-base";
import { MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import CatButton from "../CatButton";
import {Platform, StyleSheet} from "react-native";

const CategoryModal = ({modalVisible, setModalVisible,setSelectedCategory,setAvatarColor,setCategoryName}) => {
    const handleSelectedCategory=(icon,avatarColor,catName)=>{
        setSelectedCategory(icon);
        setAvatarColor(avatarColor);
        setCategoryName(catName);
        setModalVisible(false);
    }
    return (
        <Modal isOpen={modalVisible} animationPreset="slide">
            <View style={styles.container} rounded="2xl" shadow={3}>
                <Modal.Content w="100%" h="100%" bg="white" rounded={"2xl"}>
                    <Modal.Header bg={"white"}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <IconButton
                                icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="black"/>}
                                onPress={() => setModalVisible(!modalVisible)}
                                borderRadius="full"
                                _pressed={{
                                    bg: "blueGray.200:alpha.50"
                                }}
                            />
                            <Text fontSize={18} fontWeight={"medium"}>Categories</Text>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <VStack>
                                <HStack>
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="food" size={30} color="white" />}
                                        color={"yellow.400"}
                                        name={"Foods & Drinks"}
                                        onPress={()=>handleSelectedCategory("food","yellow.400","Foods & Drinks")}
                                    />
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="shopping" size={30} color="white" />}
                                        color={"purple.400"}
                                        name={"shopping"}
                                        onPress={()=>handleSelectedCategory("shopping","purple.400","shopping")}
                                    />
                                </HStack>
                                <HStack>
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="heart-pulse" size={30} color="white" />}
                                        color={"red.500"}
                                        name={"Health"}
                                        onPress={()=>handleSelectedCategory("heart-pulse","red.500","Health")}
                                    />
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="cash-plus" size={35} color="white" />}
                                        color={"green.500"}
                                        name="Income"
                                        onPress={()=>handleSelectedCategory("cash-plus","green.500","Income")}
                                    />
                                </HStack>
                                <HStack>
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="car-hatchback" size={30} color="white" />}
                                        color={"blue.500"}
                                        name="Vehicle"
                                        onPress={()=>handleSelectedCategory("car-hatchback","blue.500","Vehicle")}
                                    />
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="road-variant" size={30} color="white" />}
                                        color={"purple.600"}
                                        name="Public transport"
                                        onPress={()=>handleSelectedCategory("road-variant","purple.600","Public transport")}
                                    />
                                </HStack>
                                <HStack>
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="file-document" size={30} color="white" />}
                                        color={"orange.400"}
                                        name="Bills"
                                        onPress={()=>handleSelectedCategory("file-document","orange.400","Bills")}
                                    />
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="hand-coin" size={30} color="white" />}
                                        color={"blue.400"}
                                        name="Loans"
                                        onPress={()=>handleSelectedCategory("hand-coin","blue.400","Loans")}
                                    />
                                </HStack>
                                <HStack>
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="home-alert" size={30} color="white" />}
                                        color={"rose.400"}
                                        name="Rent"
                                        onPress={()=>handleSelectedCategory("home-alert","rose.400","Rent")}
                                    />
                                    <CatButton
                                        icon={<MaterialCommunityIcons name="menu" size={30} color="white" />}
                                        color={"grey"}
                                        name="Other"
                                        onPress={()=>handleSelectedCategory("menu","grey","Other")}
                                    />
                                </HStack>
                            </VStack>
                        </ScrollView>
                    </Modal.Body>
                </Modal.Content>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        borderRadius: "2xl",
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,

    },
    content: {
        ...Platform.select({
            android: {
                margin: "auto",
                height: '100%'
            }
        })
    }
})

export default CategoryModal;