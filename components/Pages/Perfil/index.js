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
import Logout from '../../img/Logout.svg';
import { useNavigation } from "@react-navigation/native";

export default function Perfil() {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

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
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={{fontSize: 30, left: 170, fontFamily: 'Segoe UI Bold'}}>FLEX</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Entrar')}>
          <Logout style={{left: 260}}/>
        </TouchableOpacity>
      </View>
      <View>
          <UserP style={{ alignSelf: 'center', top: 45 }}/>
        <Text style={{ fontSize: 20, fontFamily: 'Segoe UI Bold', top: 66, left: 177 }}>{userName}</Text>
      </View>
        <TouchableOpacity style={styles.btns}>
          <View style={{ top: 40}}>
          <BatePapo style={styles.icons} />
          <Text style={styles.textBtn}>Conversas</Text>
          <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Histórico de conversas</Text>
          </View>
        </TouchableOpacity>
      
      <TouchableOpacity style={styles.btns}>
        <View style={{ top: 10}}>
        <Ring style={styles.icons} />
        <Text style={styles.textBtn}>Notificações</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Central de Notificações</Text>
        </View>
      </TouchableOpacity>
      
      <View style={{flexDirection:'row', top: -10}}>
      <TouchableOpacity style={styles.btns}>
        <Wallet style={styles.icons} />
        <Text style={styles.textBtn}>Pagamentos</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Saldos e Cartões</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btns}>
        <View style={{top: -30}}>
        <Ticket style={styles.icons} />
        <Text style={styles.textBtn}>Cupons</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Cupons de Descontos</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btns}>
        <View style={{top: -55}}>
        <Star style={styles.icons} />
        <Text style={styles.textBtn}>Fidelidade</Text>
        <Text style={[styles.textBtn, { marginTop: 10, fontFamily: 'Segoe UI', fontSize: 16 }]}>Minhas Fidelidades</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btns}>
        <View style={{top: -85}}>
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