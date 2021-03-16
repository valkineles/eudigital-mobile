import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import InfinitLoading from './components/InfinitLoading';

export default function App() {
    return (
        <View style={styles.container}>
            <InfinitLoading />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
