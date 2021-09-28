import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [listItems, setListItems] = useState([{item: '', id: ''}]);
  const [isChecked, setChecked] = useState([]);

  const handleItemDelete = id => {
    const remainsAfterDelete = listItems.filter(deleted => {
      return deleted.id !== id;
    });
    setListItems(remainsAfterDelete);
  };

  const handleChecked = id => {
    const checked = listItems.filter(checked => {
      return checked.id == id;
    });
    setChecked([checked, ...isChecked]);
  };

  return (
    <SafeAreaView>
      <Text>Hello Teenoh</Text>
      <View style={styles.listContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={styles.inputField}
            onChangeText={newItem => setNewItem(newItem)}
            value={newItem}
            placeholder="Happy Listing"
          />
          <Button
            color="black"
            title="Enter"
            onPress={() => {
              if (!newItem) {
                Alert.alert('Enter a new task');
                return;
              }
              const addedItem = {
                item: newItem,
                id: new Date().getTime(),
              };
              setListItems([addedItem, ...listItems]);
            }}
          />
        </View>
        <ScrollView>
          <View style={styles.listItems}>
            {!listItems ? (
              <View></View>
            ) : (
              listItems.map(item => {
                return (
                  <View style={styles.listItemContainer} key={item.id}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <CheckBox
                        value={isChecked.includes(item.id)}
                        onValueChange={() => handleChecked(item.id)}
                      />
                      <Text
                        style={
                          isChecked.includes(item.id)
                            ? styles.checked
                            : styles.listItem
                        }>
                        {item.item}{' '}
                      </Text>
                    </View>

                    <Text
                      style={styles.cancelBtn}
                      onPress={() => handleItemDelete(item.id)}>
                      x
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    height: 400,
    width: '90%',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  inputField: {
    height: 40,
    width: '80%',
    marginVertical: 12,
    marginLeft: 12,
    marginRight: 0,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
  },
  listItems: {
    height: 350,
    margin: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'purple',
    borderRadius: 5,
    paddingVertical: 5,
    overflow: 'scroll',
  },
  listItemContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 0,
    borderWidth: 1,
    color: 'black',
    borderColor: 'transparent',
    backgroundColor: 'pink',
    padding: 10,
  },
  listItem: {
    marginLeft: 15,
  },
  checked: {
    marginLeft: 15,
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  cancelBtn: {
    color: 'black',
  },
});
export default App;
