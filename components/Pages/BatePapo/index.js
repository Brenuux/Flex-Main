import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../firebase/firebaseConnection";
import Arrow from '../../img/ArrowLeft.svg';
import ArrowR from '../../img/Arrow_Right.svg';

export default function BatePapo({ route }) {
    const navigation = useNavigation();
    const { nomeLoja, uidLoja } = route.params;
    const [mensagem, setMensagem] = useState("");
    const [mensagens, setMensagens] = useState([]);
    const [uidCliente, setUidCliente] = useState("");

    useEffect(() => {
        const usuarioLogado = firebase.auth().currentUser;
        if (usuarioLogado) {
            setUidCliente(usuarioLogado.uid);
        }

        if (!uidCliente || !uidLoja) {
            return;
        }
        useEffect(() => {
            console.log("nomeLoja:", nomeLoja);
            console.log("uidLoja:", uidLoja);
            // Restante do código do useEffect...
        }, [nomeLoja, uidLoja])

        const listener = firebase.database().ref('mensagens')
            .orderByChild('destinatario')
            .equalTo(uidLoja)
            .on('value', (snapshot) => {
                const mensagensArray = [];
                snapshot.forEach((childSnapshot) => {
                    mensagensArray.push(childSnapshot.val());
                });
                setMensagens(mensagensArray);
            });

        return () => {
            firebase.database().ref('mensagens').off('value', listener);
        };
    }, [uidCliente, uidLoja]);

    const enviarMensagem = async () => {
        try {
            console.log("uidCliente:", uidCliente);
            console.log("uidLoja:", uidLoja);
            console.log("mensagem:", mensagem);

            if (!uidCliente || !uidLoja || mensagem.trim() === "") {
                console.log("Dados inválidos para enviar mensagem");
                return;
            }

            console.log("Enviando mensagem...");

            const novaMensagem = {
                remetente: uidCliente,
                destinatario: uidLoja,
                texto: mensagem,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            };

            console.log("Nova mensagem:", novaMensagem);

            // Envia a mensagem para o banco de dados
            await firebase.database().ref('mensagens').push(novaMensagem);

            console.log("Mensagem enviada com sucesso!");

            // Limpa o campo de mensagem após o envio
            setMensagem("");
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    };
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 30, left: 175, fontFamily: 'Segoe UI Bold' }}>FLEX</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SecondTabNavigator')}>
                    <Arrow style={{ left: -50 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <Text style={{ fontSize: 20, left: 70, top: 12 }}>{nomeLoja}</Text>
            <View style={styles.line}></View>
            <FlatList
                data={mensagens}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.mensagemContainer}>
                        <Text style={styles.mensagemRemetente}>{item.remetente}</Text>
                        <Text style={styles.mensagemTexto}>{item.texto}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Mensagem"
                    placeholderTextColor="#C5C5C5"
                    style={styles.input}
                    onChangeText={(text) => setMensagem(text)}
                    value={mensagem}
                />
                <TouchableOpacity style={{ left: -100 }} onPress={enviarMensagem}>
                    <ArrowR />
                </TouchableOpacity>
            </View>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#000',
        top: 497,
        width: 500,
        left: -10
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingVertical: 10,
        marginLeft: 20
    },
    mensagemContainer: {
        marginVertical: 10,
    },
    mensagemRemetente: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    mensagemTexto: {
        fontSize: 16,
    },
});