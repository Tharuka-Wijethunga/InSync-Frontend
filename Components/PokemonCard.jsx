import { View, Text, } from "native-base";
import { StyleSheet  } from "react-native";

export default  function PokemonCard({heading,description}){
    return(
        <View style={styles.card}>
            <Text>{heading}</Text>
            <Text>{description}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    card:{
        borderRadius: 16,
        borderWidth:2,
        padding:16,
        margin:3,
        width:"98%"
    }
})