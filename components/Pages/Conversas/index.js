import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from '../../img/ArrowLeft.svg';
import io from 'socket.io-client';
// Importando o Firebase
import firebase from "../../firebase/firebaseConnection";

export default function Conversas() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [lojas, setLojas] = useState([]);

    // Função para carregar as lojas do Firebase
    const carregarLojas = async () => {
        try {
            const snapshot = await firebase
                .database()
                .ref("lojas")
                .once("value");

            const lojasArray = [];
            snapshot.forEach((childSnapshot) => {
                const uidLoja = childSnapshot.key; // Obtenha o UID da loja
                const data = childSnapshot.val();
                lojasArray.push({ ...data, uid: uidLoja }); // Adicione o UID ao objeto da loja
            });

            setLojas(lojasArray);
            console.log("Lojas atualizadas:", lojasArray);
        } catch (error) {
            console.error("Erro ao carregar lojas:", error);
        }
    };

    const handleLojaPress = (nome, uidLoja) => {
        console.log("Início da função handleLojaPress - UID da loja:", uidLoja);

        if (uidLoja) {
            console.log("Dados da loja:", nome, uidLoja); // Adicione este log
            // Navegar para o componente de bate-papo com o nome da loja e o UID como parâmetros
            navigation.navigate('BatePapo', { nomeLoja: nome, uidLoja: uidLoja });
            // Fechar o modal
            setModalVisible(false);

            // Conectar ao socket da loja ao selecionar uma loja
            const socketLoja = io('http://localhost:3000');
            socketLoja.emit('lojaConectada', uidLoja);

            // Adicionar um ouvinte para receber mensagens da loja
            socketLoja.on('mensagemCliente', (mensagem) => {
                // Lógica para lidar com mensagens da loja para o cliente
            });
        } else {
            console.error("UID da loja não definido.");
        }
    };

    return (
        <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <Text style={{ fontSize: 30, left: 175, fontFamily: 'Segoe UI Bold' }}>FLEX</Text>
                <Text style={{ alignSelf: "center", top: 30, fontSize: 25 }}>Conversas</Text>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(true); carregarLojas(); }}>
                    <Text style={styles.buttonText}>Iniciar nova conversa</Text>
                </TouchableOpacity>

                {/* Modal de lojas */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <SafeAreaView>
                        <View>
                            <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>Escolha uma loja</Text>
                            <FlatList
                                data={lojas}
                                keyExtractor={(item) => item.uid}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleLojaPress(item.nome, item.uid) &&  setModalVisible(false)}>
                                        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 35, fontWeight: 'bold' }}>{item.nome}</Text>
                                        <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5 }}>{item.categoria}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Arrow style={{ top: -110, left: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
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
        top: 30,
        left: -10
    },
    button: {
        width: 300,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#828282',
        top: 420
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
    }
});
