import * as React from 'react';
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold
  } from '@expo-google-fonts/roboto';
  import AppLoading from 'expo-app-loading';
  import { StatusBar } from 'expo-status-bar';  

  import { Home } from './src/screens/Home';  
import { View, StyleSheet } from 'react-native';
import InfinitLoading from './src/components/InfinitLoading';

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold
      });
    
      if (!fontsLoaded) {
        return <AppLoading />
      }
    
    return (
        // <View style={styles.container}>
        //     <InfinitLoading />
        // </View>
        <>
 <StatusBar
        style="light"
        translucent
        backgroundColor="transparent"
        />        
        
       <Home />
        </>
    );
}

