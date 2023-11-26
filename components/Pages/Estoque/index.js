import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import Arrow from "../../img/ArrowLeft.svg";
import { useNavigation } from "@react-navigation/native";
import Add from '../../img/Add.svg';


export default function Estoque() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SecondTabNavigator')}>
                    <Arrow style={{ top: 10, left: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, left: 130, fontFamily: 'Segoe UI Bold' }}>Estoque</Text>
            </View>
            <View style={styles.line}></View>
            <Text style={{alignSelf: 'center', fontSize: 20}}>
                Adições Recentes
            </Text>
            <View style={[styles.line, {top: 150}]}></View>
            <Add style={{top: 150, left: 340}}/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#000',
        marginVertical: 20,
        marginHorizontal: 10,
        top: 10,
        left: -10
    },
})