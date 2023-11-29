import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import io from 'socket.io-client';
import firebase from "../../firebase/firebaseConnection";
import Arrow from '../../img/ArrowLeft.svg';

export default function ConversasLoja({ route }) {

    const [mensagensLoja, setMensagensLoja] = useState([]);
    const [clientes, setClientes] = useState({});
    const navigation = useNavigation();
    const { params } = route;
    const uidLoja = params && params.uidLoja ? params.uidLoja : null;
    console.log('Params:', route.params); // Verifique se route.params está definido
    console.log('uidLoja:', uidLoja); // Verifique se uidLoja está definido

    useEffect(() => {
        // Use o UID da loja obtido na navegação
        // const uidLoja = 'wu7UomBgNFUvuoco2UleNv2o0MK2';

        const unsubscribe = firebase.database().ref('mensagens')
            .orderByChild('destinatario')
            .equalTo(uidLoja)
            .on('value', async (snapshot) => {
                const mensagens = [];

                // Verifica se há dados no snapshot antes de tentar iterar sobre eles
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        const mensagem = childSnapshot.val();
                        mensagens.push({
                            id: childSnapshot.key,
                            ...mensagem,
                        });
                    });

                    setMensagensLoja(mensagens);
                } else {
                    console.log('Nenhuma mensagem encontrada');
                }
            });

        return () => {
            unsubscribe();
        };
    }, [uidLoja]);

    const handleClientePress = (clienteId) => {
        // Navegar para o chat com o cliente, enviando o ID do cliente como parâmetro
        navigation.navigate('Chat', { uidCliente: clienteId });
    };

    return (
        <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SecondTabNavigator')}>
                        <Arrow style={{ left: 20 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, left: 145, fontFamily: 'Segoe UI Bold' }}>FLEX</Text>
                </View>
                <Text style={{ alignSelf: "center", top: 30, fontSize: 25 }}>Conversas</Text>
                <View style={styles.line}></View>
                <View style={styles.totalMensagensContainer}>
                    <Text style={styles.totalMensagensTexto}>Mensagens da Loja:</Text>
                    {Object.entries(clientes).map(([clienteId, quantidadeMensagens]) => (
                        <TouchableOpacity key={clienteId} onPress={() => handleClientePress(clienteId)}>
                            <Text>{`Cliente: ${clienteId}, Mensagens: ${quantidadeMensagens}`}</Text>
                            {/* Adicione mais informações ou estilização conforme necessário */}
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#000',
        marginVertical: 20,
        marginHorizontal: 10,
        top: 30,
        left: -10
    },
    totalMensagensContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    totalMensagensTexto: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red', // Adapte a cor conforme necessário
    },
});