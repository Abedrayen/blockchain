import React, { useEffect, useState } from "react";
import { deleteAuthState, getAuthState } from "../../services/auth";
import { Button, Divider, Layout, List, ListItem, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { primaryColor } from "../../constants/colors";

const data = [
    {
        title: 'Received',
        description: '3.000 TND',
    },
    {
        title: 'Sent to Safoine',
        description: '- 280 TND',
    },
    {
        title: 'Invoice Payment',
        description: '- 300 TND',
    },
    {
        title: 'Invoice Payment',
        description: '- 300 TND',
    }
];


export const Dashboard = ({ navigation }: any) => {
    const [authState, setAuthState] = useState<any>();

    const fetchData = async () => {
        try {
            const state = await getAuthState();
            await setAuthState(state);
        } catch (error) {
            console.error("Error fetching auth state:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = async () => {
        // Clear the token from AsyncStorage
        await deleteAuthState();
        // Navigate to the Login screen
        navigation.replace("login");
    };

    const renderItem = ({ item, index }: { item: any; index: number }): React.ReactElement => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
        />
    );

    return (
        <Layout style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Total</Text>
                <Text category="h3" style={{ color: 'white' }}>3.000 TND</Text>
            </View>
            <View style={{ width: '100%', padding: 10, flexDirection: 'row' }}>
                <View>
                    {/* Your CircularProgressBar component */}
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text>60 %</Text>
                    <Text>20 %</Text>
                    <Text>20 %</Text>
                </View>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <Text category="h3">Monthly History</Text>
                <List
                    style={styles.container}
                    data={data}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
                <Text category="h3">Rest</Text>
                <Text category="h7">80 $</Text>
                <Text category="h3">Target</Text>
                <Text category="h7">Buy a car 2 $</Text>
                <Button onPress={handleLogout}>Logout</Button>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 300,
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
        height: 120,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
    },
    headerText: {
        fontSize: 20,
        color: 'white',
    },
});

export default Dashboard;
