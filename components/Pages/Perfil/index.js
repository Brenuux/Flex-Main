import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import firebase from "../../firebase/firebaseConnection";
import UserP from '../../img/UserP.svg';
import Ring from '../../img/Ring.svg';
import Wallet from '../../img/Wallet.svg';
import Ticket from '../../img/Ticket.svg';
import Heart from '../../img/Heart.svg';
import Star from '../../img/Star.svg';
import Arrow from '../../img/ArrowLeft.svg';
import BatePapo from '../../img/BatePapo.svg';

export default function Perfil() {
  const [userName, setUserName] = useState('');

  // UseEffect para carregar o nome do usuário a partir do Firebase
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`usuarios/${user.uid}/nome`)
          .once('value')
          .then((snapshot) => {
            const nome = snapshot.val();
            setUserName(nome);
          })
          .catch((error) => {
            console.error('Erro ao recuperar o nome do usuário:', error);
          });
      }
    });

    return unsubscribe; // Cancela a inscrição no Firebase quando o componente é desmontado
  }, []);

  return (
    <SafeAreaView>
    <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={false}>
      <View>
        <TouchableOpacity>
          <UserP style={{ alignSelf: 'center', top: 45 }}/>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: 'Segoe UI Bold', top: 66, left: 177 }}>{userName}</Text>
      </View>
      <View style={{ flexDirection: 'row', top: 30}}>
        <TouchableOpacity style={styles.btns}>
          <BatePapo style={styles.icons} />
          <Text style={styles.textBtn}>Conversas</Text>
          <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Histórico de conversas</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btns}>
        <Ring style={styles.icons} />
        <Text style={styles.textBtn}>Notificações</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Central de Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btns}>
        <Wallet style={styles.icons} />
        <Text style={styles.textBtn}>Pagamentos</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Saldos e Cartões</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btns}>
        <Ticket style={styles.icons} />
        <Text style={styles.textBtn}>Cupons</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Cupons de Descontos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btns}>
        <Star style={styles.icons} />
        <Text style={styles.textBtn}>Fidelidade</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Minhas Fidelidades</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btns}>
        <Heart style={styles.icons} />
        <Text style={styles.textBtn}>Favoritos</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Locais Favoritos</Text>
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

const styles = StyleSheet.create({
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