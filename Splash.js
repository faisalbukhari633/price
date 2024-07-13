import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const navigation = useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
         navigation.navigate("Home")
        },3000)
    },[])
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30}}>Splash</Text>
      <Image source={require("./assets/images/solarpanel.png")}/>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
