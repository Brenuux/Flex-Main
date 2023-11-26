import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Arrow from '../../img/ArrowLeft.svg';
import { useNavigation } from "@react-navigation/native";
import Img from '../../img/Img.svg';
import ArrowD from '../../img/ArrowD.svg';

export default function Produto() {
    const navigation = useNavigation();
    const [nomeProduto, setNomeProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState('');
    const [descricaoProduto, setDescricaoProduto] = useState('');

    return (
        <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SecondTabNavigator')}>
                        <Arrow style={{ left: 20, top: 10 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontFamily: "Segoe UI Bold", left: 80 }}>
                        Novo produto
                    </Text>
                </View>

                <TouchableOpacity style={styles.btn1}>
                    <Img style={{ alignSelf: 'center', top: 50 }} />
                    <Text style={{ alignSelf: 'center', color: '#C5C5C5', top: 60 }}>Adicionar fotos</Text>
                </TouchableOpacity>

                {/* Nome do Produto */}
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#C5C5C5"
                    onChangeText={(text) => setNomeProduto(text)}
                    value={nomeProduto}
                />

                {/* Preço do Produto */}
                <TextInput
                    style={styles.input}
                    placeholder="Preço"
                    placeholderTextColor="#C5C5C5"
                    onChangeText={(text) => setPrecoProduto(text)}
                    value={precoProduto}
                />

                <TouchableOpacity style={{
                    flexDirection: 'row', width: 325,
                    height: 51,
                    borderWidth: 1,
                    backgroundColor: '#828282',
                    alignSelf: 'center',
                    top: 60
                }}>
                    <Text style={{ color: '#C5C5C5', fontSize: 16, top: 13, left: 10 }}>Categoria</Text>
                    <ArrowD style={{ top: 17, left: 210 }} />
                </TouchableOpacity>

                {/* Descrição do Produto */}
                <TextInput
                    style={styles.descricaoInput}
                    placeholder="Descrição"
                    placeholderTextColor="#C5C5C5"
                    onChangeText={(text) => setDescricaoProduto(text)}
                    value={descricaoProduto}
                    multiline={true}
                />

                {/* Botão Cadastrar */}
                <TouchableOpacity style={styles.btnCadastrar}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center' }}>Cadastrar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    btn1: {
        width: 325,
        height: 177,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#828282',
        alignSelf: 'center',
        top: 40,
    },
    input: {
        width: 325,
        height: 51,
        borderWidth: 1,
        backgroundColor: '#828282',
        alignSelf: 'center',
        top: 60,
        marginBottom: 20,
        paddingLeft: 15,
        fontSize: 16,
        color: '#C5C5C5',
        borderRadius: 5,
    },
    descricaoInput: {
        width: 325,
        height: 199,
        borderWidth: 1,
        backgroundColor: '#828282',
        alignSelf: 'center',
        top: 70,
        marginBottom: 20,
        paddingLeft: 15,
        fontSize: 16,
        color: '#C5C5C5',
        borderRadius: 10,
        paddingTop: 15,
    },
    btnCadastrar: {
        width: 161,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#000000',
        alignSelf: 'center',
        top: 60,
        justifyContent: 'center',
    },
});
