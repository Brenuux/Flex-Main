import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function Conversas() {

    return (
        <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <Text style={{ fontSize: 30, left: 175, fontFamily: 'Segoe UI Bold' }}>FLEX</Text>
                <Text style={{ alignSelf: "center", top: 30, fontSize: 25 }}>Conversas</Text>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar nova conversa</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#000',
        marginVertical: 20,
        marginHorizontal: 10,
        top: 30,
        left: -10
    },
    button: {
        width: 300,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#828282',
        top: 420
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
    }
})