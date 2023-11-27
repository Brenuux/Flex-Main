import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import Arrow from "../../img/ArrowLeft.svg";
import { useNavigation } from "@react-navigation/native";
import Verificado from "../../img/Verificado.svg";
import firebase from "firebase";

export default function Produto() {
    const navigation = useNavigation();
    const [nomeProduto, setNomeProduto] = useState("");
    const [precoProduto, setPrecoProduto] = useState("");
    const [descricaoProduto, setDescricaoProduto] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = [
        "Lanches",
        "Farmácia",
        "Saúde & Bem-estar",
        "Casa de Construção",
        "Outros",
    ];

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const cadastrarProduto = async () => {
        try {
            // Obtém a referência do banco de dados
            const database = firebase.database();

            // Obtém o UID do usuário atual (assumindo que você já está autenticado)
            const uid = firebase.auth().currentUser.uid;

            // Referência para o nó 'lojas' do usuário
            const lojasRef = database.ref(`lojas/${uid}`);

            // Cria um novo nó 'produtos' para a loja
            const produtosRef = lojasRef.child("produtos");

            // Cria um novo produto com os dados fornecidos
            const novoProdutoRef = produtosRef.child(nomeProduto);

            // Salva os dados do produto no Realtime Database
            await novoProdutoRef.set({
                nome: nomeProduto,
                preco: precoProduto,
                descricao: descricaoProduto,
                categorias: selectedCategories,
            });

            // Limpa os campos após o cadastro
            setNomeProduto("");
            setPrecoProduto("");
            setDescricaoProduto("");
            setSelectedCategories([]);

            // Fecha o modal
            setModalVisible(false);
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
        }
    };

    return (
        <ScrollView
            persistentScrollbar={true}
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SecondTabNavigator")}
                    >
                        <Arrow style={{ left: 20, top: 10 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontFamily: "Segoe UI Bold", left: 80 }}>
                        Novo produto
                    </Text>
                </View>

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

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        width: 325,
                        height: 51,
                        borderWidth: 1,
                        backgroundColor: "#828282",
                        alignSelf: "center",
                        top: 60,
                    }}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{ color: "#C5C5C5", fontSize: 16, top: 13, left: 10 }}>
                        Categoria
                    </Text>
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
                <TouchableOpacity style={styles.btnCadastrar} onPress={cadastrarProduto}>
                    <Text style={{ color: "#FFFFFF", fontSize: 18, textAlign: "center" }}>
                        Cadastrar
                    </Text>
                </TouchableOpacity>

                {/* Modal de Categorias */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {categories.map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.categoryButton,
                                        {
                                            backgroundColor: selectedCategories.includes(category)
                                                ? "#000000"
                                                : "#828282",
                                        },
                                    ]}
                                    onPress={() => toggleCategory(category)}
                                >
                                    <Text style={{ color: "#FFFFFF" }}>{category}</Text>
                                    {selectedCategories.includes(category) && (
                                        <Verificado style={{ marginLeft: 10 }} />
                                    )}
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: "#000000", fontSize: 18 }}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 325,
        height: 51,
        borderWidth: 1,
        backgroundColor: "#828282",
        alignSelf: "center",
        top: 60,
        marginBottom: 20,
        paddingLeft: 15,
        fontSize: 16,
        color: "#C5C5C5",
        borderRadius: 5,
    },
    descricaoInput: {
        width: 325,
        height: 199,
        borderWidth: 1,
        backgroundColor: "#828282",
        alignSelf: "center",
        top: 70,
        marginBottom: 20,
        paddingLeft: 15,
        fontSize: 16,
        color: "#C5C5C5",
        borderRadius: 10,
        paddingTop: 15,
    },
    btnCadastrar: {
        width: 161,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#000000",
        alignSelf: "center",
        top: 60,
        justifyContent: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    categoryButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    closeButton: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },
});