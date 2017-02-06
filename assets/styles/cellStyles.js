/**
 * Created by dp-k on 2016/12/23.
 */
import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
const {width, height} = Dimensions.get("window")
const cellStyles = StyleSheet.create({
  container:{
    alignItems:"center",
    justifyContent:"center",
    height:90*width/750,
    flexDirection: 'row',
    backgroundColor:"white"
  },
  rightView: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent:'flex-end',
    marginRight:20*width/750,
  },
  rightImage: {
    height: 20,
  },
  leftView:{
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent:'flex-start',
    marginLeft:20*width/750
  },
  leftImage: {
    height: 20,
  },
  leftText: {
    color: '#282828',
    fontSize:32*width/750,
  },
  middleView:{
    flex:1,
    alignSelf: 'center',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  midTextInput: {
    color: '#282828',
    fontSize:32*width/750,
    textAlignVertical: "center",
    flex:8
  },
  line: {
    height: 4*pixel,
    backgroundColor: '#dddddd'
  },
  inputDel: {
    position: 'absolute',
    right: 0,
    top: 15,
    width: 16,
    height: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AnimatedInputDel: {
    position: 'absolute',
    right: 0,
    top: 30,
    width: 16,
    height: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputDelImg: {
    width: 16,
    height: 16,
    opacity: 0.2
  },
  inputDelImgNone: {
    width: 0,
    height: 0
  },
  AnimatedInputContainer: {
    overflow: 'hidden',
    backgroundColor:'white',
    height: 60,
    width:window.width-25,
    marginLeft:10,
    marginRight:10
  },
  AnimatedInputLabel: {
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#ff2121',
  },
  AnimatedInputTextInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingTop: 8,
    paddingLeft: 0,
    color: '#7771ab',
  },
})


export default cellStyles