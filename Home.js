import React, {useRef, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  useColorScheme,
  Switch,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {arr} from './Data';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import {btn} from './Hellow';

const Home = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const viewShotRef = useRef();

  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const shareOptions = {
        title: 'Price List',
        url: uri,
        type: 'image/png',
      };
      await Share.open(shareOptions);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{format: 'png', quality: 0.9}}>
        <View style={styles.hash}>
          <Image
            source={require('./assets/images/logo.png')}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.stack}>HashStack Technologies</Text>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? '#444' : '#fff',
            width: '95%',
            height: 490,
            borderRadius: 5,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowRadius: 5.84,
            elevation: 10,
          }}>
          <View style={styles.table}>
            <Text style={styles.brand}>BRAND</Text>
            <Text style={styles.brandd}>DESCRIPTION</Text>
            <Text style={styles.branddd}>RATES</Text>
          </View>

          <FlatList
            data={arr}
            renderItem={item => {
              const brandStyle =
                item.item.Brand.toLowerCase() === 'phono solar'
                  ? styles.phonoBrand
                  : item.item.Brand.toLowerCase() === 'canadian'
                  ? styles.candianBrand
                  : {};
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('About', {item})}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={[
                        {
                          borderWidth: 1,
                          width: 110,
                          padding: 4,
                          textAlign: 'center',
                          margin: 0.4,
                          color: isDarkMode ? '#fff' : '#000',
                        },
                        brandStyle,
                      ]}>
                      {item.item.Brand}
                    </Text>
                    <Text
                      style={{
                        borderWidth: 1,
                        width: 110,
                        padding: 4,
                        margin: 0.4,
                        textAlign: 'center',
                        color: isDarkMode ? '#fff' : '#000',
                      }}>
                      {item.item.Description}
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        width: 110,
                        padding: 4,
                        textAlign: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        margin: 0.4,
                        color: isDarkMode ? '#fff' : '#000',
                      }}>
                      <Text style={{color: isDarkMode ? '#fff' : '#000'}}>
                        {item.item.Rates}
                      </Text>
                      <MaterialIcons
                        name="keyboard-double-arrow-down"
                        size={20}
                        color="green"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
           
          <Image
            source={require('./assets/images/panel.png')}
            style={{height: 150, width: '50%', marginBottom: 16}}
          />
          <TouchableOpacity
            onPress={handleShare}
            style={{position: 'absolute', left: 10, bottom: 10}}>
            <Image
              source={require('./assets/images/share.png')}
              style={{
                width: 20,
                height: 20,
                marginRight: 300,
              }}
            />
          </TouchableOpacity>
        </View>
      </ViewShot>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Dark Mode</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
    </View>
  );
};

const createStyles = isDarkMode =>
  StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#333' : '#fff',
    },
    hash: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 60,
    },
    stack: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 35,
      color: isDarkMode ? '#fff' : '#000',
    },
    table: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      alignSelf: 'center',
      margin: 0.2,
    },
    brand: {
      borderWidth: 1,
      width: 110,
      height: 30,
      textAlign: 'center',
      paddingTop: 5,
      fontWeight: 'bold',
      borderTopLeftRadius: 5,
      margin: 0.2,
      color: isDarkMode ? '#fff' : '#000',
    },
    brandd: {
      borderWidth: 1,
      width: 110,
      height: 30,
      textAlign: 'center',
      paddingTop: 5,
      fontWeight: 'bold',
      margin: 0.2,
      color: isDarkMode ? '#fff' : '#000',
    },
    branddd: {
      borderWidth: 1,
      borderTopRightRadius: 5,
      width: 110,
      height: 30,
      textAlign: 'center',
      paddingTop: 5,
      fontWeight: 'bold',
      margin: 0.2,
      color: isDarkMode ? '#fff' : '#000',
    },
    phonoBrand: {
      color: 'green',
    },
    candianBrand: {
      color: 'red',
    },
    both: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    toggleText: {
      fontSize: 18,
      color: isDarkMode ? '#fff' : '#000',
      marginRight: 10,
    },
  });

export default Home;
