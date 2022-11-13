import React, {useState} from 'react'
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert, Platform} from 'react-native'

/* Img picker */
import * as ImagePicker from 'expo-image-picker'
/* Sharing */
import * as Sharing from 'expo-sharing'


const App = () => {

  const [selectedImg, setSelectedImg] = useState(false)

  let openImagePicker = async() =>{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(permissionResult.granted === false){
      alert('Permission to acces camera i required')
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    
    if(pickerResult.canceled === true){
      return;
    }

    setSelectedImg({localUri:pickerResult.assets[0].uri})
  }


  const openShareDialog = async() =>{

    if(await Sharing.isAvailableAsync()){
      await Sharing.shareAsync(selectedImg.localUri)
        .catch(err => {
          alert('Share, is not available on your platform or your browser not support that')
        })
    }else{
      alert('Share, is not available on your platform')
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an Image</Text>

      <TouchableOpacity onPress={openImagePicker}>
        <Image source={{uri: selectedImg ? selectedImg.localUri : 'https://www.programaenlinea.net/wp-content/uploads/2020/08/react-native.jpg'}} style={styles.img}/>
      </TouchableOpacity>

      {
        selectedImg ?
        (
          <TouchableOpacity onPress={openShareDialog} style={styles.button}>
            <Text style={styles.buttonText}>Share this Image!</Text>
          </TouchableOpacity>
        )
        : 
          null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#888'
  },
  title:{
    fontSize:30,
    color:'#fff',
    marginBottom:10
  },
  img:{
    height:150,
    width:150,
    borderRadius:10,
  },
  button:{
    backgroundColor:'#555',
    padding:10,
    marginTop:20
  },
  buttonText:{
    fontSize:14,
    color:'#fff',
    textTransform:'uppercase',
    fontWeight:'bolder'
  }
})

export default App