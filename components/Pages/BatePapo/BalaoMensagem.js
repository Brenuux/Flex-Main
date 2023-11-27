import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const BalaoMensagem = ({ mensagem }) => {
    const [balaoWidth, setBalaoWidth] = useState(0);
    const [balaoHeight, setBalaoHeight] = useState(0);

    useEffect(() => {
        setBalaoWidth(0);
        setBalaoHeight(0);
    }, [mensagem]);

    const handleLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;

        const MIN_BALAO_WIDTH = Dimensions.get('window').width * 0.6;
        const MIN_BALAO_HEIGHT = 40;

        setBalaoWidth(Math.max(width, MIN_BALAO_WIDTH));
        setBalaoHeight(Math.max(height, MIN_BALAO_HEIGHT));
    };

    return (
        <View style={[styles.balaoContainer, { width: balaoWidth, height: balaoHeight }]}>
            <Text onLayout={handleLayout}>{mensagem}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    balaoContainer: {
        backgroundColor: 'gray',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignSelf: 'center',
        top: -100,
    },
});

export default BalaoMensagem;