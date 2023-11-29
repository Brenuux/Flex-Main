import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import firebase from '../../firebase/firebaseConnection';
import Cell from '../../img/Cell.svg';
import Arrow from '../../img/ArrowLeft.svg';
import ArrowD from '../../img/Arrow_Right.svg';
import { useNavigation } from '@react-navigation/native';

const BatePapo = ({ route }) => {
    const navigation = useNavigation();
    const { nomeLoja, uidLoja } = route.params;
    const [mensagem, setMensagem] = useState('');
    const [mensagens, setMensagens] = useState([]); // Alterado para armazenar mensagens localmente
    const [socket, setSocket] = useState(null);
    const [uidCliente, setUidCliente] = useState(null);
    const [nomeLojaAtual, setNomeLojaAtual] = useState('');
    const [mostrarBalao, setMostrarBalao] = useState(false);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        setSocket(socket);

        const usuarioAtual = firebase.auth().currentUser;
        if (usuarioAtual) {
            setUidCliente(usuarioAtual.uid);
        }

        setNomeLojaAtual(nomeLoja);

        return () => {
            socket.disconnect();
        };
    }, [nomeLoja]);

    useEffect(() => {
        if (socket) {
            socket.on('mensagemLoja', (mensagem) => {
                // Obtenha o usuário atualmente logado
                const usuarioAtual = firebase.auth().currentUser;

                // Se o usuário estiver logado, use o nome dele como remetente
                const nomeRemetente = usuarioAtual ? usuarioAtual.displayName : 'Nome Padrão';

                // Adiciona a mensagem localmente ao estado
                setMensagens((prevMensagens) => [...prevMensagens, { remetente: nomeRemetente, texto: mensagem }]);
                // Mostra o balão
                setMostrarBalao(true);
            });
        }

        return () => {
            if (socket) {
                socket.off('mensagemLoja');
            }
        };
    }, [socket]);
    const enviarMensagem = async () => {
        if (mensagem.trim() === '' || !socket) {
          return;
        }
        const usuarioAtual = firebase.auth().currentUser;
      
        // Se o usuário estiver logado, use o nome dele como remetente
        const nomeRemetente = usuarioAtual ? usuarioAtual.displayName : 'Nome Padrão';
      
        try {
          // Adicione a mensagem ao Firestore
          await firebase.firestore().collection('mensagens').add({
            remetente: nomeRemetente,
            destinatario: uidLoja,
            mensagem: mensagem,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      
          console.log('Mensagem enviada com sucesso para o Firestore.');
        } catch (error) {
          console.error('Erro ao enviar mensagem para o Firestore:', error);
        }
      
        // Adiciona a mensagem localmente ao estado
        setMensagens((prevMensagens) => [...prevMensagens, { remetente: "Você", texto: mensagem }]);
        // Mostra o balão
        setMostrarBalao(true);
      
        // Limpa o campo de mensagem após o envio
        setMensagem('');
      };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
                    <Arrow style={{ left: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, left: 145, fontFamily: 'Segoe UI Bold' }}>FLEX</Text>
            </View>
            <View style={styles.line}></View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'Segoe UI Bold', fontSize: 18, left: 60, top: 5 }}>{nomeLojaAtual}</Text>
                <Cell style={{ left: 250 }} />
            </View>
            <View style={[styles.line, { top: 10 }]}></View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={mensagens}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.remetente}: {item.texto}</Text>
                        </View>
                    )}
                />
                {/* {mostrarBalao && mensagens.length > 0 && <BalaoMensagem mensagem={mensagens[mensagens.length - 1].texto} />} */}

                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        placeholder="Mensagem"
                        value={mensagem}
                        onChangeText={(text) => setMensagem(text)}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={enviarMensagem} style={{ top: 5 }}>
                        <ArrowD style={{ left: -55 }} />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#000',
        marginVertical: 20,
        marginHorizontal: 10,
        top: -5,
        left: -10,
    },
    input: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        top: -10,
        width: 420,
        alignSelf: 'center',
        height: 50,
        paddingLeft: 30,
    },
});

export default BatePapo;