import { Button, Spinner, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BlockchainScreen = ({ navigation }) => {
    const handleButtonPress = () => {
        // Handle button press action
        navigation.replace("home");
    };
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("home");
        }, 1500)
    }, [])

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/blockchain.png')}
                style={styles.image}
            />
            <Text>Connecting to Your Bank's Blockchain...</Text>
            <View style={styles.loading}>
                <Spinner size='large' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f3f3'
    },
    image: {
        width: "100%",
        height: 250,
        marginBottom: 20,
    },
    loading: {
        justifyContent: 'center',
        margin: 10
    },
});

export default BlockchainScreen;
