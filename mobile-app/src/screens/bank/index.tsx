import React, { useState } from "react";
import { Button, Input, Layout, Text, Select, SelectItem } from "@ui-kitten/components";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const banks = [
    { text: "Zitouna Bank", value: "zitouna" },
    { text: "Biat Bank", value: "biat" },
    { text: "Attijeri Bank", value: "attijeri" }
];

const BankScreen = ({ navigation }) => {
    const [selectedBank, setSelectedBank] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fingerprintImage, setFingerprintImage] = useState("");

    const handleNext = () => {
        // Navigate to the next screen
        // You can replace 'NextScreen' with the name of your next screen
        navigation.navigate('blockchain');
    };

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
            <Image
                source={require("../../../assets/logo.png")}
                style={{ width: 150, height: 150, marginBottom: 10 }}
            />
            <Text category="h1" style={{ marginBottom: 30 }}>Select Your Bank</Text>
            <Select
                selectedIndex={selectedBank}
                onSelect={(index) => setSelectedBank(index)}
                value={selectedBank ? banks[selectedBank.row].text : ''}
                placeholder="Select Bank"
                style={{ marginBottom: 20, width: '100%' }}
            >
                {banks.map((bank, index) => (
                    <SelectItem key={index} title={bank.text} />
                ))}
            </Select>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 20, width: '100%' }}
            />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={{ marginBottom: 20, width: '100%' }}
            />
            <TouchableOpacity
                onPress={() => setFingerprintImage("../../../assets/fingerprint.png")}>
                {fingerprintImage?.length <=1 ?
                    <Image
                        source={require("../../../assets/fingerprint.jpg")}
                        style={{ width: 100, height: 100, marginBottom: 20 }}
                    />
                    :
                    <Image
                        source={require("../../../assets/fingerprint.png")}
                        style={{ width: 100, height: 100, marginBottom: 20 }}
                    />
                }
            </TouchableOpacity>
            <Button onPress={handleNext}
                style={{
                    width: '100%',
                    marginTop: 20,
                }}>Next</Button>
        </Layout>
    );
};

export default BankScreen;
