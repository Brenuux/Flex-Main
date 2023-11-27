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
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
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

export default function Perfil() {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`usuarios/${user.uid}/nome`)
          .once("value")
          .then((snapshot) => {
            const nome = snapshot.val();
            setUserName(nome);
          })
          .catch((error) => {
            console.error("Erro ao recuperar o nome do usuário:", error);
          });
      }
    });

    return unsubscribe;
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setUserImage(result.uri);
        uploadImage(result.uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar a imagem:", error);
      // Você pode exibir um alerta ou realizar outras ações de tratamento de erro aqui
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref(`usuarios/${user.uid}/profile.jpg`);

    storageRef.put(blob).then(() => {
      console.log("Imagem enviada com sucesso!");
    });
  };

  const requestNotificationPermission = async () => {
    const { status } = await registerForPushNotificationsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Permissões necessárias",
        "Para receber notificações, por favor, habilite as permissões de notificação nas configurações do aplicativo.",
        [{ text: "OK" }]
      );
    }
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
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Segoe UI Bold",
              top: 66,
              left: 177,
            }}
          >
            {userName}
          </Text>
        </View>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('Home')}>
          <View style={{ top: 40 }}>
            <BatePapo style={styles.icons} />
            <Text style={styles.textBtn}>Conversas</Text>
            <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Histórico de conversas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btns} onPress={requestNotificationPermission}>
          <View style={{ top: 10 }}>
            <Ring style={styles.icons} />
            <Text style={styles.textBtn}>Notificações</Text>
            <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Central de Notificações</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', top: -10 }}>
          <TouchableOpacity style={styles.btns}>
            <Wallet style={styles.icons} />
            <Text style={styles.textBtn}>Pagamentos</Text>
            <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Saldos e Cartões</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btns}>
          <View style={{ top: -30 }}>
            <Ticket style={styles.icons} />
            <Text style={styles.textBtn}>Cupons</Text>
            <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Cupons de Descontos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btns}>
          <View style={{ top: -55 }}>
            <Star style={styles.icons} />
            <Text style={styles.textBtn}>Fidelidade</Text>
            <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Minhas Fidelidades</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btns}>
          <View style={{ top: -85 }}>
            <Heart style={styles.icons} />
            <Text style={styles.textBtn}>Favoritos</Text>
            <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Locais Favoritos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btns}>
          <Text></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btns}>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  console.log(token);

  // Aqui você enviaria o token para o seu servidor
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