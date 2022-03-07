import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Picker,
  FlatList,
  SafeAreaView,
  TextInput,
  Alert
} from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-web";

export default function Feed() {
  const [cities, setCities] = useState([]);
  const [universities, setUniversities] = useState([]);
  
  function getAllCities() {
    return axios({
      url: `https://restcountries.com/v2/all`,
    })
      .then((response) => {
        setCities(response.data);
        console.log("data", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllCities();
  }, []);

  const [selectedCity, setSelectedCity] = useState();
  const [selectedUnv, setSelectedUnv] = useState();

  function getAllUniversities() {
    return axios({
      url: `http://universities.hipolabs.com/search?country=United+States`,
    })
      .then((response) => {
        setUniversities(response.data);
        console.log("unv", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllUniversities();
  }, []);

  const [arrayholder, setArrayholder] = useState([]);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(false);

  const fetchAPI = () => {
    return fetch("https://api.covid19api.com/countries")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
        setLoading(false);
        setArrayholder(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  const simpleAlertHandler = () => {
      if(text==''){
        //alert('input text required')
        setError(true)
      }else{alert('done');}
    
  };
  const searchData = (text) => {
    const newData = arrayholder.filter((item) => {
      const itemData = item.Country.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setData(newData);
    setText(text);
  };

  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };
  const [array,setArray]=useState()
  return (
    <View
     //style={styles.container}
     >
      <View style={{ marginTop: 10, backgroundColor:'grey',height:150 }}>
          <Text style ={{color:'red', fontWeight:'bold'}}>Simple selection</Text>
        <Picker
          style={{
            width: 300,
            marginTop: 15,
            marginLeft: 20,
            marginRight: 20,
            borderColor: "black",
            borderBottomWidth: 1,
            borderRadius: 10,
            alignSelf: "center",
          }}
          selectedValue={selectedCity}
          onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
        >
          {cities.map((city) => (
            <Picker.Item
              label={city.name.normalize("NFD").replace(/\p{Diacritic}/gu, "")}
              value={city.name.normalize("NFD").replace(/\p{Diacritic}/gu, "")}
            />
          ))}
        </Picker>
      </View>
      <View style={{ flex: 1, marginTop: 20, backgroundColor:'grey' }}>
     
        <View style={styles.MainContainer}>
        <Text style ={{color:'red', fontWeight:'bold'}}>filtred search</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => searchData(text)}
            value={text}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          {error == true ? <Text style={{color:'red'}}>input required</Text>:null}

          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={itemSeparator}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>setText(item.Country.toUpperCase())}  style={styles.row}>{item.Country}</TouchableOpacity>
            )}
            style={{ marginTop: 10 }}
          />
          
        </View>
      </View>
      {/*<div style={{ height: 120, backgroundColor: "red" }} />*/}
      {/*<View style={{ marginTop: 5 }}>
        <Text style={{ color: "red", fontWeight: "bold" }}>
          Please select more than one university
        </Text>
        <select multiple style={{ marginTop: 30, marginBottom: 30 }}>
          {universities.map((universities) => (
            <option value={universities.name}>{universities.name}</option>
          ))}
        </select>
      </View>*/}
      <View style={{marginTop:10, marginBottom:10}}>
          <TouchableOpacity  onPress={simpleAlertHandler} style={styles.button}>Submit</TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  listItemText: {
    fontSize: 18,
  },
  row: {
    fontSize: 18,
    padding: 12,
  },
  textInput: {
    textAlign: "center",
    height: 42,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 8,
    backgroundColor: "white",
  },
  MainContainer: {
    paddingTop: 50,
    justifyContent: "center",
    //flex: 1,
    margin: 5,
    height: 800,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
