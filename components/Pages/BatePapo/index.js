import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import io from 'socket.io-client';
import firebase from '../../firebase/firebaseConnection';

const BatePapo = ({ route }) => {
    const { nomeLoja, uidLoja } = route.params;
    const [mensagem, setMensagem] = useState('');
    const [mensagens, setMensagens] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Substitua 'http://SEU_SERVIDOR_SOCKET_IO' pelo endereço do seu servidor Socket.IO
        const socket = io('http://localhost:3000');
        setSocket(socket);

        return () => {
            // Desconecte o socket quando o componente for desmontado
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Adicione um ouvinte para receber mensagens da loja
        if (socket) {
            socket.on('mensagemLoja', (mensagem) => {
                setMensagens((prevMensagens) => [...prevMensagens, { remetente: nomeLoja, texto: mensagem }]);
            });
        }

        return () => {
            // Remova o ouvinte ao desmontar o componente
            if (socket) {
                socket.off('mensagemLoja');
            }
        };
    }, [socket, nomeLoja]);

    const enviarMensagem = () => {
        if (mensagem.trim() === '' || !socket) {
            return;
        }

        // Enviar a mensagem para a loja
        socket.emit('clienteParaLoja', { remetente: uidCliente, destinatario: uidLoja, mensagem });

        // Limpar o campo de mensagem após o envio
        setMensagem('');
    };

    return (
        <SafeAreaView>
            {/* Renderizar a lista de mensagens */}
            <FlatList
                data={mensagens}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.remetente}: {item.texto}</Text>
                    </View>
                )}
            />

            {/* Input para escrever e enviar mensagens */}
            <View>
                <TextInput
                    placeholder="Mensagem"
                    value={mensagem}
                    onChangeText={(text) => setMensagem(text)}
                />
                <TouchableOpacity onPress={enviarMensagem}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default BatePapo;