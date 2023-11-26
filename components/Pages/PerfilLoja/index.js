import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import firebase from "../../firebase/firebaseConnection";
import UserP from "../../img/UserP.svg";
import Ring from "../../img/Ring.svg";
import Wallet from "../../img/Wallet.svg";
import Ticket from "../../img/Ticket.svg";
import Heart from "../../img/Heart.svg";
import Star from "../../img/Star.svg";
import Arrow from "../../img/ArrowLeft.svg";
import BatePapo from "../../img/BatePapo.svg";
import Logout from "../../img/Logout.svg";
import { useNavigation } from "@react-navigation/native";
import Bag from '../../img/Bag.svg';
import Document from '../../img/Document.svg';
import Menu from '../../img/Menu.svg';

export default function PerfilLoja() {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // Recupere o nome da loja
                firebase
                    .database()
                    .ref(`lojas/${user.uid}/nome`)
                    .once("value")
                    .then((snapshot) => {
                        const nome = snapshot.val();
                        setUserName(nome);
                    })
                    .catch((error) => {
                        console.error("Erro ao recuperar o nome da Loja:", error);
                    });

                // Recupere as categorias da loja
                firebase
                    .database()
                    .ref(`lojas/${user.uid}/categoria`)
                    .once("value")
                    .then((snapshot) => {
                        const categorias = snapshot.val();
                        if (categorias) {
                            setCategories(categorias.split(', ')); // Divida a string em um array de categorias
                        }
                    })
                    .catch((error) => {
                        console.error("Erro ao recuperar as categorias da Loja:", error);
                    });
            }
        });

        return unsubscribe;
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUserImage(result.uri);
            uploadImage(result.uri);
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const user = firebase.auth().currentUser;
        const storageRef = firebase.storage().ref(`lojas/${user.uid}/profile.jpg`);

        storageRef.put(blob).then(() => {
            console.log("Imagem enviada com sucesso!");
        });
    };

    return (
        <SafeAreaView>
            <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ fontSize: 30, left: 170, fontFamily: "Segoe UI Bold" }}>
                        FLEX
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Entrar")}>
                        <Logout style={{ left: 260 }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={pickImage}>
                        {userImage ? (
                            <Image source={{ uri: userImage }} style={styles.userImage} />
                        ) : (
                            <UserP style={{ alignSelf: "center", top: 45 }} />
                        )}
                    </TouchableOpacity>
                    <View>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: "Segoe UI Bold",
                            top: 66,
                            alignSelf: 'center'
                        }}
                    >
                        {userName}
                    </Text>
                    {categories.length > 0 && (
                        <Text style={{ fontSize: 16, fontFamily: 'Segoe UI', alignSelf: 'center', top: 70}}>
                            Categorias: {categories.join(', ')}
                        </Text>
                    )}
                </View>
                </View>
                <View style={{ top: 40 }}>
                    <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('ConversasLoja')}>

                        <BatePapo style={styles.icons} />
                        <Text style={styles.textBtn}>Conversas</Text>
                        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Histórico de conversas</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ top: 10 }}>
                    <TouchableOpacity style={styles.btns}>

                        <Ring style={styles.icons} />
                        <Text style={styles.textBtn}>Notificações</Text>
                        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Central de Notificações</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', top: -10 }}>
                    <TouchableOpacity style={styles.btns}>
                        <Bag style={styles.icons} />
                        <Text style={styles.textBtn}>Estoque</Text>
                        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Estoque compras e vendas</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ top: -30 }}>
                    <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('Gerencia')}>

                        <Document style={styles.icons} />
                        <Text style={styles.textBtn}>Relatório</Text>
                        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Relatório de vendas</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ top: 65, left: 40 }}>
                    <Menu style={styles.icons} />
                    <Text style={styles.textBtn}>Dados</Text>
                    <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>informações funcionários</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    userImage: {
        width: 97,
        height: 97,
        borderRadius: 97 / 2,
        left: 33,
        top: 39,
    },
    semFoto: {
        width: 97,
        height: 97,
        borderWidth: 1,
        borderColor: '#25985C',
        borderRadius: 97 / 2,
        left: 33,
        top: 39
    },
    textBtn: {
        fontSize: 20,
        fontFamily: 'Segoe UI Bold',
        marginLeft: 70,
        top: -80
    },
    btns: {
        top: 120,
        left: 40,
    },
    icons: {
        marginBottom: 10,
        top: -24
    }
})