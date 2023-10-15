import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export function CRUD() {
  const [inputTextValue, setInputTextValue] = useState('');
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState('');

  const getDatabase = async () => {
    try {
      const apiData = await firestore().collection('todo').get();
      let arrayList = [];
      apiData.docs.map(item => {
        arrayList.push(item.data());
      });
      setList(arrayList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddData = async () => {
    try {
      if (inputTextValue === '') {
        Alert.alert('Please Enter Information!');
      } else {
        let apiData = firestore().collection('todo').doc();
        await apiData.set({id: apiData.id, title: inputTextValue});
        getDatabase();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteItem = async d => {
    let data = firestore().collection('todo').doc(d.id);
    console.log(data);
    await data.delete();
    getDatabase();
  };
  useEffect(() => {
    getDatabase();
  }, []);

  const updateModel = async d => {
    setShow(true);
    setSelected(d);
  };
  useEffect(() => {
    if (selected) {
      setEdit(selected.title);
    }
  }, [selected]);
  const updateItem = async () => {
    try {
      let data = firestore().collection('todo').doc(selected.id);
      await data.update({title: edit});
      Alert.alert('Update Successfully!');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <StatusBar hidden={true} />
      <Modal visible={show} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: '80%',
              height: 150,
              backgroundColor: 'white',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textDecorationLine: 'underline',
                color: 'black',
              }}>
              Update Your List
            </Text>
            <TextInput
              style={styles.inputBox1}
              value={edit}
              onChangeText={e => setEdit(e)}
            />
            <View style={{flexDirection: 'row', gap: 7}}>
              <TouchableOpacity
                onPress={() => {
                  setShow(false);
                }}
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  width: 100,
                  alignItems: 'center',
                  elevation: 10,
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateItem();
                }}
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  width: 100,
                  alignItems: 'center',
                  elevation: 10,
                }}>
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Todo App
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Any Value"
          value={inputTextValue}
          onChangeText={value => setInputTextValue(value)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddData()}>
          <Text style={{color: '#fff'}}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <Text style={{marginVertical: 5, fontSize: 20, fontWeight: 'bold'}}>
          Todo List
        </Text>

        {list.map(item => {
          return (
            <View
              key={item.id}
              style={{
                backgroundColor: 'white',
                elevation: 11,
                padding: 10,
                width: '90%',
                margin: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{item.title}</Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <TouchableOpacity
                  onPress={() => updateModel(item)}
                  style={{backgroundColor: 'red', padding: 5, borderRadius: 5}}>
                  <Text style={{color: 'white'}}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteItem(item)}
                  style={{backgroundColor: 'red', padding: 5, borderRadius: 5}}>
                  <Text style={{color: 'white'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  cardContainer: {
    // marginVertical: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: 'red',
    width: width - 40,
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
  },
  inputBox1: {
    width: 300,
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
