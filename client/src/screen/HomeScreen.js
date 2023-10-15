import {View, Text, TouchableOpacity, Button} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AUTH} from '../context/ContextApi';

const HomeScreen = () => {
  const {data} = useContext(AUTH);
  const logoutHandle = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    console.log('logout');
  };
  console.log(data?.email);
  return (
    <View style={{backgroundColor: '#d9d5d4', flex: 1}}>
      <Text>{data?.email}</Text>
      <Text>Hello Benzamin BIkash</Text>
      {/* <TouchableOpacity onPress={logoutHandle}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
      <Button title="Logout" onPress={logoutHandle} />
    </View>
  );
};

export default HomeScreen;
