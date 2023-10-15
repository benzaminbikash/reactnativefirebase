import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginHandle = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(r => {
        Alert.alert('Login Successfully');
        console.log(r);
        navigation.navigate('home');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#d9d5d4'}}>
      <View style={{margin: 10}}>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
          Login
        </Text>

        <TextInput
          onChangeText={e => setEmail(e)}
          placeholder="Enter Email"
          style={{
            width: '100%',
            borderRadius: 5,
            borderWidth: 1,
            marginVertical: 10,
            padding: 10,
            alignSelf: 'center',
          }}
        />
        <TextInput
          onChangeText={e => setPassword(e)}
          placeholder="Enter Password"
          style={{
            width: '100%',
            borderRadius: 5,
            borderWidth: 1,
            marginVertical: 10,
            padding: 10,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={loginHandle}
          style={{
            backgroundColor: 'blue',
            height: 40,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Login </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 5}}>
          <Text>Don't Have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
