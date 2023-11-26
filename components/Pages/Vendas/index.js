import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet} from "react-native";
import Add from '../../img/Add.svg';
import Bag from '../../img/Bag.svg';
import Tick from '../../img/Tick.svg';
import { useNavigation } from "@react-navigation/native";



export default function Vendas(){
    const navigation = useNavigation();
    return(
        <SafeAreaView>
            <Text style={{ fontSize: 30, left: 175, fontFamily: 'Segoe UI Bold' }}>FLEX</Text>
            <View style={styles.line}></View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Produto')}>
                    <Add style={{top: 145, marginLeft: 25}}/>
                    <Text style={{top: 108, left: 100, fontSize: 20, fontWeight: 'bold', fontFamily: 'Segoe UI Bold'}}>Cadastro de Itens</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Estoque')}>
                    <Bag style={{top: 149, marginLeft: 23}}/>
                    <Text style={{top: 112, left: 100, fontSize: 20, fontWeight: 'bold', fontFamily: 'Segoe UI Bold'}}>Estoque</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Estoque')}>
                    <Tick style={{top: 149, marginLeft: 23}}/>
                    <Text style={{top: 112, left: 100, fontSize: 20, fontWeight: 'bold', fontFamily: 'Segoe UI Bold'}}>Itens Cadastrados</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#000',
        marginVertical: 20,
        marginHorizontal: 10,
        top: 130,
        left: -10}
    
    
    })