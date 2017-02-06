/**
 * Created by dp-k on 2016/12/15.
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'

const btnStyles = StyleSheet.create({
  shortBtn:{
    width: 100,
    height: 40,
    backgroundColor: "transparent",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center"
  },
  tabBarSelectedIcon:{
    width: 30,
    height: 30,
    resizeMode: 'stretch'
  },
  introBtn: {
    height:width/10,
    backgroundColor: 'whitesmoke',
    opacity:0.5,
    borderRadius: 5,
    alignItems:'center',
    justifyContent: 'center',
    position:"absolute",
    width:width/4,
    top:height/20,
    right:width/20
  },
  longBtn:{
    width: window.width*0.95,
    height: 90*window.width/750,
    marginTop:20,
    backgroundColor: "#0000FF",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:'center',
  },
  abledBtn:{
    backgroundColor:"#ff2121",
    shadowColor:"black",
    shadowOpacity:0.5,
    shadowOffset:{height: 1, width: 0},
    elevation: 5,
  },
  abledText:{
    color:"white"
  },
  disabledText:{
    color:"#808080"
  },
  disabledBtn:{
    backgroundColor:"#f0f0f4",
    shadowColor:"black",
    shadowOpacity:0.5,
    shadowOffset:{height: 2, width: 0}
  },
  uploadImageBtn:{
    width:100,
    height:100,
    borderRadius: 5
  },
  selectContactBtn:{
    width:40,
    height:40,
    alignItems:"center",
    justifyContent:"center"
  },
  checkBtn:{
    width:40,
    height:40,
    alignItems:"center",
    justifyContent:"center"
  }
})


export default btnStyles