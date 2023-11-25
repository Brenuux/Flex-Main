import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from '../../img/LogoFlex.svg';
import { useNavigation } from "@react-navigation/native";
import Cadastro from "../Cadastro";
import Arrow from '../../img/ArrowLeft.svg';
import { ScrollView } from "react-native-gesture-handler";

export default function Carrinho() {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
                        <Arrow style={{ top: 50, left: 30 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, left: 115, fontFamily: 'Segoe UI Bold', top: 45 }}>Carrinho</Text>
                </View>
                <View style={styles.line}></View>

                <View style={[styles.line, {top: 470}]}></View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Finalizar pedido</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#000',
        marginVertical: 20,
        marginHorizontal: 10,
        top: 45,
        left: -10
    },
    // Adicione os estilos para o botão
    button: {
        width: 151,
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',  // Altere para a cor desejada
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#828282',
        top: 520
    },
    buttonText: {
        fontSize: 16,
        color: 'white',  // Altere para a cor desejada
    }
});