// LoginScreen.js
import React, { useState } from "react";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { apiClient } from "../../api";
import { changeAuthState } from "../../services/auth";
import { Image } from "react-native";

const ExpensesScreen = ({ navigation }) => {
    const [firstInvoice, setFirstInvoice] = useState('');
    const [firstInvoicePrice, setFirstInvoicePrice] = useState('0');

    const [secondInvoice, setSecondInvoice] = useState('');
    const [secondInvoicePrice, setSecondInvoicePrice] = useState('0');

    const [thirdInvoice, setThirdInvoice] = useState('');
    const [thirdInvoicePrice, setThirdInvoicePrice] = useState('0');

    const [fourthInvoice, setFourthInvoice] = useState('');
    const [fourthInvoicePrice, setFourthInvoicePrice] = useState('0');

    const saveExpenses = async () => {
        // Here you can implement your logic to save expenses
        navigation.replace("bank");
    };

    return (
        <Layout style={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            paddingHorizontal: 20
        }}>
            <Image
                source={require("../../../assets/logo.png")}
                style={{ width: 150, height: 150, marginBottom: 10 }}
            />
            <Text category="h1" style={{ marginBottom: 20 }}>Expenses</Text>
            <Layout style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Icon name='shopping-cart-outline' fill='#8F9BB3' style={{ width: 24, height: 24 }} />
                <Input
                    style={{ marginBottom: 10, marginTop: 10, width: '65%' }}
                    placeholder="Invoice Label"
                    value={firstInvoice}
                    onChangeText={setFirstInvoice}
                />
                <Input
                    style={{ marginBottom: 10, marginTop: 10, marginLeft: 5, width: '20%' }}
                    placeholder="Price"
                    value={firstInvoicePrice}
                    onChangeText={setFirstInvoicePrice}
                />
            </Layout>
            <Layout style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center', // Align items vertically
            }}>
                <Icon name='shopping-cart-outline' fill='#8F9BB3' style={{ width: 24, height: 24 }} />
                <Input
                    style={{ marginBottom: 10, marginTop: 10, width: '65%' }}
                    placeholder="Invoice Label"
                    value={secondInvoice}
                    onChangeText={setSecondInvoice}
                />
                <Input
                    style={{ marginBottom: 10, marginTop: 10, marginLeft: 5, width: '20%' }}
                    placeholder="Price"
                    value={secondInvoicePrice}
                    onChangeText={setSecondInvoicePrice}
                />
            </Layout>
            <Layout style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center', // Align items vertically
            }}>
                <Icon name='shopping-cart-outline' fill='#8F9BB3' style={{ width: 24, height: 24 }} />
                <Input
                    style={{ marginBottom: 10, marginTop: 10, width: '65%' }}
                    placeholder="Invoice Label"
                    value={thirdInvoice}
                    onChangeText={setThirdInvoice}
                />
                <Input
                    style={{ marginBottom: 10, marginTop: 10, marginLeft: 5, width: '20%' }}
                    placeholder="Price"
                    value={thirdInvoicePrice}
                    onChangeText={setThirdInvoicePrice}
                />
            </Layout>
            <Layout style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center', // Align items vertically
            }}>
                <Icon name='shopping-cart-outline' fill='#8F9BB3' style={{ width: 24, height: 24 }} />
                <Input
                    style={{ marginBottom: 10, marginTop: 10, width: '65%' }}
                    placeholder="Invoice Label"
                    value={fourthInvoice}
                    onChangeText={setFourthInvoice}
                />
                <Input
                    style={{ marginBottom: 10, marginTop: 10, marginLeft: 5, width: '20%' }}
                    placeholder="Price"
                    value={fourthInvoicePrice}
                    onChangeText={setFourthInvoicePrice}
                />
            </Layout>
            <Button onPress={saveExpenses}
                style={{
                    width: '100%',
                    marginTop: 20,
                }}>Next</Button>
        </Layout>
    );
};

export default ExpensesScreen;
