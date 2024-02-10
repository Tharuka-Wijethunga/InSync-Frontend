import { Text, StyleSheet } from "react-native";
import React from 'react';
import Colors from "../../Utils/Colors";
import {NativeBaseProvider, Button, View, ScrollView} from "native-base";
import PokemonCard from "../../../Components/PokemonCard";
import Carousel from "./Carousel";


const pokemonCardOne={
    heading: "lihaj",
    description: "eafsefaef",
}

export default function Statistics() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                {/*<ScrollView w="100%">*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*    <PokemonCard {...pokemonCardOne}></PokemonCard>*/}
                {/*</ScrollView>*/}
               <Carousel></Carousel>
            </View>



        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.BGColor,
        flex:1,
        paddingTop:10,
        paddingBottom:10,
    }
})