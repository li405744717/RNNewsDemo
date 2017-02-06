/**
 * Created by dp-k on 2016/11/22.
 */
import{Dimensions, Platform, NativeModules} from "react-native"

var highVersion = () => {
  console.log("SystemVersion：")
  NativeModules.NativeManager.getSystemVersion((err,value)=>{
    var systemVersion_number = parseInt(value.charAt(0))
    console.log("SystemVersion：",systemVersion_number)
    if(systemVersion_number < 5){
      return false
    }
  })
}
window.pixel = 1/PixelRatio.get()
window.width = Dimensions.get("window").width
window.height = Platform.OS == 'ios' ? Dimensions.get("window").height :
  highVersion? Dimensions.get("window").height :
  Dimensions.get("window").height - 20
window.systemHeight = Dimensions.get("window").height
const navHeight = Platform.OS == 'ios' ? 64 : highVersion ? 64 : 44
const navTop = Platform.OS == 'ios' ? 20 : highVersion? 20 : 0
const tabHeight = 48
console.log("navHeight",navHeight)
console.log("navTop",navTop)
import {StyleSheet,PixelRatio} from 'react-native'
export default containerStyles = StyleSheet.create({
  common:{
    height:window.height,
    width:window.width,
    backgroundColor:"whitesmoke"
  },
  y_mediate:{
    justifyContent:"center"
  },
  x_mediate:{
    alignItems:"center"
  },
  mediate:{
    justifyContent:"center",
    alignItems:"center"
  },
  top:{
    position:"absolute",
    //left:0,
    top:0
  },
  navLeftView:{
    position:"absolute",
    justifyContent:"center",
    flex:1,
    alignItems:"flex-start",
    height:44,
    left:10,
    top:navTop,
  },
  navMidView:{
    position:"absolute",
    width:window.width,
    justifyContent:"center",
    alignItems:"center",
    height:44,
    left:0,
    top:navTop
  },
  navRightView:{
    position:"absolute",
    justifyContent:"center",
    alignItems:"flex-end",
    height:44,
    right:10,
    top:navTop,
  },
  navBar:{
    height:navHeight,
    width:window.width,
    top:0,
    backgroundColor:"#ff2121",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  navText:{
    fontSize:18,
    color:"white"
  },
  tabContentContainer:{
    height:window.height-tabHeight-navHeight,
    width:window.width,
    backgroundColor:"whitesmoke"
  },
  tab:{
    height:tabHeight
  },
  contentContainer:{
    height:window.height-navHeight,
    width:window.width,
    backgroundColor:"whitesmoke"
  },
  commonScrollViewContainer:{
    backgroundColor:"whitesmoke"
  },
  LoadingViewContainer:{
    height:window.height-navHeight,
    width:window.width,
    backgroundColor:"transparent",
    justifyContent:"center",
    alignItems:"center",
    bottom:0
  },
  LoadingViewModal:{
    height:window.height-navHeight,
    width:window.width,
    backgroundColor:"black",
    justifyContent:"center",
    alignItems:"center",
    bottom:0,
    opacity:0.2
  },
  spinkitContainer:{
    height:50,
    width:50,
    position:"absolute",
    bottom:(window.height-50)/2,
    left:(window.width-50)/2,
    alignItems:"center",
    justifyContent:"center"
  },
  alertContainer:{
    position:"absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:"rgba(0,0,0,0.2)",
    justifyContent:"center",
    alignItems:"center"
  },
  shortAlertView:{
    backgroundColor: "#fff",
    borderRadius:10,
    //width:window.width*3/5,
    height:40,
    paddingLeft:10,
    paddingRight:10,

  },
  alertView:{
    backgroundColor: "#fff",
    borderRadius:10,
    padding:10,
    margin:10,
    width:window.width*3/4,
    height:150
  },
  tipLeftContentView: {
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    borderWidth: 1,
    flex:1,
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
    borderColor: "#f0f0f0",
    justifyContent: 'center',
    borderRadius:5
  },
  tipRightContentView: {
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    borderWidth: 1,
    flex:1,
    // borderTopRightRadius: 20,
    // borderBottomRightRadius: 20,
    borderColor: "#F0F0F0",
    justifyContent: 'center',
    borderRadius:5
  },
  tipText:{
    color: "#999999",
    textAlign: 'center',
    fontSize: 15,
    letterSpacing: 1
  },
  tipTitleView: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:5
  },
  tipTitleText:{
    color: "#999999",
    fontSize: 17,
    letterSpacing: 1
  },
})