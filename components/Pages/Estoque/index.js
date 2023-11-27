import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Arrow from "../../img/ArrowLeft.svg";
import Add from '../../img/Add.svg';
import firebase from 'firebase';
import { useNavigation } from "@react-navigation/native";

export default function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const uid = firebase.auth().currentUser.uid;
        const lojasRef = firebase.database().ref(`lojas/${uid}`);
        const produtosRef = lojasRef.child('produtos');

        const produtosListener = produtosRef.on('value', (snapshot) => {
            const produtosArray = [];
            snapshot.forEach((childSnapshot) => {
                const produto = childSnapshot.val();
                produtosArray.push(produto);
            });

            setProdutos(produtosArray);
        });

        return () => {
            produtosRef.off('value', produtosListener);
        };
    }, []);

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
            <View style={[styles.line, {top: 120}]}></View>

            <FlatList
                data={produtos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>Nome: {item.nome}</Text>
                        <Text>Preço: {item.preco}</Text>
                        <Text>Descrição: {item.descricao}</Text>
                    </View>
                )}
                horizontal={true} // Torna a FlatList horizontal
            />

            <TouchableOpacity onPress={() => navigation.navigate('Produto')}>
                <Add style={{top: 30, left: 340}}/>
            </TouchableOpacity>
        </SafeAreaView>
    );
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
    item: {
        width: 300, // Largura do item na horizontal
        marginRight: 10, // Espaçamento entre os itens
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
});