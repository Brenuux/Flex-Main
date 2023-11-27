import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList} from "react-native";
import Cart from '../../img/Cart.svg';
import Lupa from '../../img/LupaCinza.svg';
import { useNavigation } from "@react-navigation/native";
import Food from '../../img/Food.svg';
import Farmacia from '../../img/Farmacia.svg';
import Saude from '../../img/Saude.svg';
import Casa from '../../img/Casa.svg';
import Outros from '../../img/Outros.svg';
import Arrow from '../../img/Arrow_Right.svg';

export default function Explorar() {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontSize: 30, left: 170, fontFamily: 'Segoe UI Bold' }}>FLEX</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                    <Cart style={{ left: 260 }} />
                </TouchableOpacity>
            </View>
            <TextInput
                placeholder="Pesquisar"
                placeholderTextColor='#C5C5C5'
                style={styles.inputs}
            />
            <Lupa style={{ top: -10, left: 50 }} />
            <View style={{ flexDirection: 'row', top: 30, left: 20 }}>
                <TouchableOpacity>
                    <Food />
                    <Text style={{ top: 5 }}>Lanches</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns}>
                    <Farmacia />
                    <Text style={{ top: 5 }}>Farmácia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns}>
                    <Saude />
                    <Text style={{ top: 5, left: 1 }}>Saúde &</Text>
                    <Text style={{ top: 5, left: -5 }}>Bem-estar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btns, { left: -8 }]}>
                    <Casa />
                    <Text style={{ top: 5, left: 4 }}>Casa de</Text>
                    <Text style={{ top: 5, left: -5 }}>Construção</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btns, { left: -15 }]}>
                    <Outros />
                    <Text style={{ top: 5, left: 7 }}>Outros</Text>
                    <Text style={{ top: 5, left: 2 }}>Serviços</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <Text style={{top: 35, left: 10}}>Ainda não há pedidos</Text>
            <TouchableOpacity style={styles.orderButton}>
                <Text style={{ color: '#C5C5C5', left: -15}}>Ir para os meus pedidos</Text>
                <Arrow style={{left: 30}}/>
            </TouchableOpacity>
            <View style={styles.line}></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputs: {
        width: 335,
        height: 47,
        borderWidth: 1,
        backgroundColor: '#828282',
        alignSelf: 'center',
        top: 30,
        borderRadius: 10,
        paddingLeft: 55,
        fontSize: 20
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#C5C5C5',
        marginVertical: 20,
        marginHorizontal: 10,
        top: 40,
        left: -10
    },
    orderButton: {
        width: 285,
        height: 45,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#C5C5C5',
        backgroundColor: '#828282',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        top: 40,
        flexDirection: "row"
    },
    btns: {
        marginLeft: 15,
    },
})