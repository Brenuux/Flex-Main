import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList, Keyboard } from "react-native";
import Cart from '../../img/Cart.svg';
import Lupa from '../../img/LupaCinza.svg';
import { useNavigation } from "@react-navigation/native";
import Food from '../../img/Food.svg';
import Farmacia from '../../img/Farmacia.svg';
import Saude from '../../img/Saude.svg';
import Casa from '../../img/Casa.svg';
import Outros from '../../img/Outros.svg';
import Arrow from '../../img/Arrow_Right.svg';

// Importando o Firebase
import firebase from "../../firebase/firebaseConnection";

export default function Explorar() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const snapshot = await firebase
                    .database()
                    .ref("lojas")
                    .orderByChild("nome")
                    .startAt(searchQuery.toLowerCase())
                    .endAt(searchQuery.toLowerCase() + "\uf8ff")
                    .once("value");

                const results = [];
                snapshot.forEach((childSnapshot) => {
                    const lojaData = childSnapshot.val();

                    if (lojaData && lojaData.produtos) {
                        results.push({ loja: lojaData });
                    }
                });

                setSearchResults(results);
            } catch (error) {
                console.error("Erro ao buscar resultados de pesquisa:", error);
            }
        };

        if (searchQuery.trim() !== "") {
            fetchSearchResults();
        }
    }, [searchQuery]);


    // Adicionando um ouvinte para detectar mudanças no estado do teclado
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // O teclado foi fechado, então abra o modal
                setModalVisible(true);
            }
        );

        // Removendo o ouvinte quando o componente é desmontado
        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);
    console.log("Search Results:", searchResults);
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
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />
            <Lupa style={{ top: -10, left: 50 }} />
            <View style={{ flexDirection: 'row', top: 30, left: 20 }}>
                <TouchableOpacity onPress={() => setSearchQuery("Lanches")}>
                    <Food />
                    <Text style={{ top: 5 }}>Lanches</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => setSearchQuery("Farmácia")}>
                    <Farmacia />
                    <Text style={{ top: 5 }}>Farmácia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns} onPress={() => setSearchQuery("Saúde & Bem-estar")}>
                    <Saude />
                    <Text style={{ top: 5, left: 1 }}>Saúde &</Text>
                    <Text style={{ top: 5, left: -5 }}>Bem-estar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btns, { left: -8 }]} onPress={() => setSearchQuery("Casa de Construção")}>
                    <Casa />
                    <Text style={{ top: 5, left: 4 }}>Casa de</Text>
                    <Text style={{ top: 5, left: -5 }}>Construção</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btns, { left: -15 }]} onPress={() => setSearchQuery("Outros Serviços")}>
                    <Outros />
                    <Text style={{ top: 5, left: 7 }}>Outros</Text>
                    <Text style={{ top: 5, left: 2 }}>Serviços</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <Text style={{ top: 35, left: 10 }}>Ainda não há pedidos</Text>
            <TouchableOpacity style={styles.orderButton}>
                <Text style={{ color: '#C5C5C5', left: -15 }}>Ir para os meus pedidos</Text>
                <Arrow style={{ left: 30 }} />
            </TouchableOpacity>
            <View style={styles.line}></View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View>
                        <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>Lojas e Produtos Relacionados</Text>
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.loja.uid} // Use o UID da loja como chave única
                            renderItem={({ item }) => (
                                <View>
                                    <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>{item.loja.nome}</Text>

                                    {/* Adiciona a lista de produtos relacionados */}
                                    {item.loja.produtos && item.loja.produtos.length > 0 && (
                                        <FlatList
                                            data={item.loja.produtos}
                                            keyExtractor={(produto, index) => index.toString()} // Use o índice como chave única
                                            renderItem={({ produto }) => (
                                                <View>
                                                    <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5 }}>Produto: {produto.nome}</Text>
                                                    <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5 }}>Preço: {produto.preco}</Text>
                                                    <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5 }}>Descrição: {produto.descricao}</Text>
                                                </View>
                                            )}
                                        />
                                    )}
                                </View>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{ fontSize: 18, textAlign: 'center', color: 'blue', marginTop: 20 }}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
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
});