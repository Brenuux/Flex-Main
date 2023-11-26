import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Arrow from "../../img/ArrowLeft.svg";
import { useNavigation } from "@react-navigation/native";


export default function Gerencia() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SecondTabNavigator')}>
                    <Arrow style={{ top: 10, left: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, left: 130, fontFamily: 'Segoe UI Bold' }}>Gerenciamento <br/> de vendas</Text>
            </View>
        </SafeAreaView>
    )
}