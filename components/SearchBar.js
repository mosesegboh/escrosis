import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import SearchDropDown from './SearchDropDown'
// import { SearchBar } from 'react-native-elements';


export default function SearchBar() {
    const [dataSource] = useState(['apple', 'banana', 'cow', 'dex', 'zee', 'orange', 'air', 'bottle'])
    const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', "#E8DEF3",])
    const [filtered, setFiltered] = useState(dataSource)
    const [searching, setSearching] = useState(false)
    const [optionValue, setOptionValue] = useState()

    const onSearch = (text) => {
      setOptionValue(text)
      if (text) {
        // if(optionValue){
        //   setSearching(false)
        // }
        
        setSearching(true)
        const temp = text.toLowerCase()
  
        const tempList = dataSource.filter(item => {
          if (item.match(temp))
            return item
        })
        setFiltered(tempList)
        // console.log(option)
      }
      else {
        setSearching(false)
        setFiltered(dataSource)
        // setOption(value)
        // console.log(optionValue)
        
      }
  
    }

      // const BackspaceAction = () => {
      //   setSearching(true)
      //   setOptionValue(optionValue)
      // } 
      const randomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)]
      }

      // const handlePress = () => {
      //   //set option
      //   console.log(item)
      // }
      // const initialState = {
      //   optionValue: '',
      // };

      // const { optionValue } = state;
    return (
      //   <View>
      //   <View>
      //       <TextInput
      //           style={styles.textInput}
      //           placeholder="Search"
      //           placeholderTextColor='white'
      //           onChangeText={onSearch}
      //           value={optionValue ? optionValue : null} 
      //       />
      //     </View>

      //  <View style={styles.options}>

      

      // {/* your components can stay here like anything */}
      // {/* and at the end of view */}
      // {
      //   searching &&
      //   <SearchDropDown
      //     onPress={() => setSearching(false)}
      //     dataSource={filtered} 
      //     placeInput={optionValue => {
      //       if(optionValue){
      //       setOptionValue(optionValue)
      //       setSearching(false)
            
      //       }
      //     }
      //     }
      //     />
      // }
      //   </View>
      //   </View>
      <View style={styles.container}>

      <TextInput
         style={styles.textInput}
          placeholder="Search"
          placeholderTextColor='white'
          onChangeText={onSearch}
          value={optionValue ? optionValue : ''}
          // onKeyPress={({ nativeEvent }) => {
          //   // nativeEvent.key === 'Backspace' ? {BackspaceAction} : {onSearch}
          //   if( nativeEvent.key === 'Backspace' ){
          //     {BackspaceAction}
          //   }else{
          //     {onSearch}
          //   }
          // }}

        />
      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, }}> List of data</Text>
        <View style={{
          flexWrap: 'wrap', flexDirection: 'row',
          justifyContent: 'center'

        }}>
          {
            dataSource.map((item, index) => {
              return (
                <View style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 80, width: 80, backgroundColor: randomColor()
                }}>
                  <Text style={{ fontSize: 15, }}>
                    {item}
                  </Text>
                </View>
              )
            })
          }
        </View>

      </View>

      {/* your components can stay here like anything */}
      {/* and at the end of view */}
      {
        searching &&
        <SearchDropDown
            onPress={() => setSearching(false)}
            dataSource={filtered} 
            placeInput={optionValue => {
              //if(optionValue){
              setOptionValue(optionValue)
              setSearching(false)
              
              //}
            }
            }
            />
      }
    </View>
    )
}


const styles = StyleSheet.create({
    textInput: {
        height: 40,
        paddingLeft: 10, 
        height: 60, 
        borderWidth: 1, 
        color:'#78757c', 
        backgroundColor: '#1b181f'
    },
    // options: {

    // }
  });