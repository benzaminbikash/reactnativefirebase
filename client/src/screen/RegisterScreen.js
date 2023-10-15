import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerHandler = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User account created & signed in!');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#d9d5d4'}}>
      <View style={{margin: 10}}>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
          Registration
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
          onPress={registerHandler}
          style={{
            backgroundColor: 'blue',
            height: 40,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Register </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 5}}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
