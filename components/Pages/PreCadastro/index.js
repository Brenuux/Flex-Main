import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from '../../img/LogoFlex.svg';
import { useNavigation } from "@react-navigation/native";
import Cadastro from "../Cadastro";
import Arrow from '../../img/ArrowLeft.svg';

export default function PreCadastro() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Entrar')}>
        <Arrow style={{top: 50, left: 30}}/>
        </TouchableOpacity>
        {/* Botão para navegar para a tela de cadastro Cliente*/}
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.textBtn}>Cadastro Cliente</Text>
      </TouchableOpacity>

      {/* Botão para navegar para a tela de cadastro Loja*/}
      <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('CadastroLoja')}>
        <Text style={styles.textBtn2}>Cadastro Loja</Text>
      </TouchableOpacity>

      {/* Componente de logotipo */}
      <Logo style={{ top: -50, marginLeft: 4, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  btn: {
    top: 350,
    alignSelf: 'center',
    width: 326,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 35,
    marginTop: 15
  },
  btn2: {
    top: 350,
    alignSelf: 'center',
    width: 326,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#000000"
  },
  textBtn: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Segoe UI Bold'
  },
  textBtn2: {
    color: "#000000",
    fontSize: 20,
    fontFamily: 'Segoe UI Bold'
  },
})