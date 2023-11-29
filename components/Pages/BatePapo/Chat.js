import React, { useEffect, useState } from "react";
import { GiftedChat, InputToolbar, Composer, Send } from 'react-native-gifted-chat';
import { io } from "socket.io-client";
import firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Camera from '../../img/Camera.svg';
import { useNavigation } from "@react-navigation/native";
import Arrow from '../../img/ArrowLeft.svg';

export default function Chat({ route }) {
    const navigation = useNavigation();
    const { nomeLoja, uidLoja } = route.params;
    const [mensagem, setMensagem] = useState('');
    const [mensagens, setMensagens] = useState([]);
    const [socket, setSocket] = useState(null);
    const [uidCliente, setUidCliente] = useState(null);

    useEffect(() => {
        const carregarMensagensSalvas = async () => {
            try {
                const mensagensSalvas = await AsyncStorage.getItem(`mensagens_${uidLoja}`);
                if (mensagensSalvas) {
                    setMensagens(JSON.parse(mensagensSalvas));
                }
            } catch (error) {
                console.error('Erro ao carregar mensagens salvas:', error);
            }
        };

        carregarMensagensSalvas();

        const socket = io('http://localhost:3000');
        setSocket(socket);

        const usuarioAtual = firebase.auth().currentUser;
        if (usuarioAtual) {
            setUidCliente(usuarioAtual.uid);
        }

        return () => {
            socket.disconnect();
        };
    }, [uidLoja]);

    useEffect(() => {
        if (socket) {
            socket.on('mensagemLoja', (mensagem) => {
                const usuarioAtual = firebase.auth().currentUser;
                const nomeRemetente = usuarioAtual ? usuarioAtual.displayName : 'Nome Padrão';

                const novaMensagem = {
                    _id: Math.random().toString(),
                    text: mensagem,
                    createdAt: new Date(),
                    user: { _id: nomeRemetente },
                };

                setMensagens(prevMensagens => {
                    const novasMensagens = GiftedChat.append(prevMensagens, [novaMensagem]);
                    // Salvar as mensagens localmente
                    AsyncStorage.setItem(`mensagens_${uidLoja}`, JSON.stringify(novasMensagens));
                    return novasMensagens;
                });
            });
        }

        return () => {
            if (socket) {
                socket.off('mensagemLoja');
            }
        };
    }, [socket, uidLoja]);

    const onSend = (newMessages = []) => {
        const novasMensagens = GiftedChat.append(mensagens, newMessages);
        setMensagens(novasMensagens);
        // Salvar as mensagens localmente
        AsyncStorage.setItem(`mensagens_${uidLoja}`, JSON.stringify(novasMensagens));
    };

    const enviarMensagem = async () => {
        if (mensagem.trim() === '' || !socket) {
            return;
        }
        const usuarioAtual = firebase.auth().currentUser;
        const nomeRemetente = usuarioAtual ? usuarioAtual.displayName : 'Nome Padrão';

        try {
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

        const novaMensagem = {
            _id: Math.random().toString(),
            text: mensagem,
            createdAt: new Date(),
            user: { _id: 'Você' },
        };

        const novasMensagens = GiftedChat.append(mensagens, [novaMensagem]);
        setMensagens(novasMensagens);
        // Salvar as mensagens localmente
        AsyncStorage.setItem(`mensagens_${uidLoja}`, JSON.stringify(novasMensagens));

        setMensagem('');
    };

    const handleChoosePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('A permissão para acessar a câmera é necessária para enviar fotos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const imageMessage = {
                _id: Math.random().toString(),
                image: result.uri,
                createdAt: new Date(),
                user: { _id: uidCliente },
            };

            onSend([imageMessage]);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={{left: 20}}>
                    <Arrow style={{}}/>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', paddingVertical: 10, left: 110}}>{nomeLoja}</Text>
            </SafeAreaView>
            <GiftedChat
                messages={mensagens}
                onSend={(newMessages) => onSend(newMessages)}
                user={{ _id: uidCliente }}
                renderInputToolbar={(props) => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            borderTopWidth: 1.5,
                            borderTopColor: '#A9A9A9',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                        }}
                    />
                )}
                renderComposer={(props) => (
                    <Composer
                        {...props}
                        placeholder={'Digite sua mensagem...'}
                    />
                )}
                renderSend={(props) => (
                    <Send {...props} containerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => enviarMensagem()}>
                                <Text style={{ color: '#0080FF', fontSize: 16, fontWeight: 'bold', marginRight: 15 }}>Enviar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleChoosePhoto()}>
                                <Camera width={24} height={24} />
                            </TouchableOpacity>
                        </View>
                    </Send>
                )}
            />
        </View>
    );
}