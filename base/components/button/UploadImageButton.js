import React, { Component, } from 'react'
import { View, TouchableHighlight,Text,TouchableOpacity,Image,StatusBar,Animated,
  ActivityIndicator, StyleSheet,PixelRatio} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import ImagePicker from 'react-native-image-picker'
import btnStyles from './../../../assets/styles/btnStyles'
import containerStyles from './../../../assets/styles/containerStyles'
import {RemoteService} from './../../../base/utils/data_service'
import CommonTools from './../../../base/utils/commonTools'
import BasePage from './../../../base/components/BasePage'
var elements = []
var width = window.width
var height = window.height
// var PixelRatio = window.pixel
class UploadImageButton extends BasePage {

  static propTypes = {

  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      imageSource:"" || this.props.imageSource,
      imageScale: new Animated.Value(0.1),
      actionViewBottom: new Animated.Value(-50)
    }
  }

  componentDidMount() {
    this.props.imageSource && this.getImage(this.props.imageSource) //如果该按钮有图片，则加载
  }
  getImage = (params) => {
    var method =  this.props.getImageMethod || "photoget.jsp"
    var params = {'params':params}
    this.setState({
      imageSource:require('./../../../assets/images/upLoadImage/white.png'),
      isUploading:true
    })
    RemoteService.run(method,params,this,
      (data)=>{//回调成功
        var imageSource = data.body.photo
        this.setState({
          imageSource:CommonTools.base64TurnImage(imageSource),
          isUploading:false
        })
      },(data)=>{//回调失败
        this.setState({
          imageSource:"",
          isUploading:false
        })
        var msg = RemoteService.getMessage(data)
        CommonTools.shortAlert(msg)
      }, (error)=>{
        this.setState({
          imageSource:{uri:"loading"},
          isUploading:false
        })
        var msg = RemoteService.getMessage(error)
        CommonTools.shortAlert(msg)
      },true)
  }
  onPress = () => {
    if(this.state.imageSource == ""){
      this.selectPhotoTapped()
    }else{
      this.showPhoto()
    }
  }
  deleteFile = () => {
    //删除图片交易
    //关闭全屏显示图片
    this.hidePhoto()
    //设置imageSource为空
    this.setState({
      imageSource:""
    })
  }
  uploadFile = (response) => {
    this.setState({
      imageSource:require('./../../../assets/images/upLoadImage/white.png'),
      isUploading:true
    })
    var method = this.props.method || "photosave.jsp"
    var params = {
      photo:response.data
    }
    if(this.props.params){
      for(var key in this.props.params){
        params[key] = this.props.params[key]
      }
    }
    RemoteService.run(method,params,this,
      (data)=>{
        this.setState({
          imageSource:{uri:response.uri},
          isUploading:false
        })
      },(data)=>{
        var msg = RemoteService.getMessage(data)
        CommonTools.shortAlert(msg)
        this.setState({
          isUploading:false,
          imageSource:"",
        })
      }, (error)=>{
        CommonTools.shortAlert(error)
        this.setState({
          isUploading:false,
          imageSource:"",
        })
      },true)
  }
  selectPhotoTapped = () => {
    const options = {
      title:'',
      takePhotoButtonTitle: '调用相机',
      chooseFromLibraryButtonTitle:'从相册中查看',
      cancelButtonTitle:'取消',
      quality: 1.0,
      maxWidth: parseInt(width),
      maxHeight: parseInt(height),
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {console.log('User cancelled photo picker');}
      else if (response.error) {console.log('ImagePicker Error: ', response.error);}
      else if (response.customButton) {console.log('User tapped custom button: ', response.customButton);}
      else {
        console.log("response",response)
        var source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.uploadFile(response);
        if(this.props.callback) this.props.callback(response)
      }
    });
  }
  //长按显示按钮选项
  onLongPressAction = () => {
    console.log("长按显示按钮选项")
    Animated.timing(
      this.state.actionViewBottom,
      {
        toValue: 0,
        duration: 100
      }
    ).start();
    this.addSibling2()
  }
  //关闭全屏图片
  hidePhoto = () => {
    this.removeAllSibiling()
  }
  //全屏显示图片
  showPhoto = () => {
    console.log('全屏显示图片');
    Animated.timing(
      this.state.imageScale,
      {
        toValue: 1,
        duration: 250
      }
    ).start();
    this.addSibling()
  }
  //全屏显示图片
  addSibling = () => {
    //隐藏状态栏
    StatusBar.setHidden(true);
    let sibling = new RootSiblings(<View style={[styles.root]}>
      <TouchableHighlight style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"black"}}
                          onPress= {() => this.hidePhoto()}
                          onLongPress = {() => this.onLongPressAction()}>
        <Animated.Image resizeMode="contain" style={{width:window.width,height:window.height,transform: [{scale: this.state.imageScale}]}}
                        source = {this.state.imageSource}/>
      </TouchableHighlight>
    </View>);
    elements.push(sibling);
  }
  //关闭全屏显示图片
  removeAllSibiling = () => {
    StatusBar.setHidden(false)
    while(elements.length > 0){
      let lastSibling = elements.pop();
      lastSibling && lastSibling.destroy();
      this.state.imageScale.setValue(0.1);
    }
  }
  //关闭按钮选项
  removeActionSibiling = () => {
    let lastSibling = elements.pop();
    lastSibling && lastSibling.destroy();
  }
  //长按显示按钮选项
  addSibling2 = () => {
    let sibling = new RootSiblings(<TouchableHighlight style={[styles.root]} onPress={()=>this.removeActionSibiling()}>
      <Animated.View style={{position: 'absolute',bottom: this.state.actionViewBottom,left: 0,right: 0}}>
        <TouchableHighlight style={styles.tipContentView} underlayColor='#f0f0f0' onPress={() => this.hidePhoto()}>
          <Text style={styles.tipText} >保存</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.tipContentView} underlayColor='#f0f0f0' onPress={() => this.deleteFile()}>
          <Text style={styles.tipText} >删除</Text>
        </TouchableHighlight>
        <View style={styles.gap}/>
        <TouchableHighlight style={styles.button} underlayColor='#f0f0f0' onPress={() => this.hidePhoto()}>
          <Text style={styles.buttonText}>取消</Text>
        </TouchableHighlight>
      </Animated.View>
    </TouchableHighlight>);
    elements.push(sibling);
  };
  render() {
    console.log("this.state.imageSource",this.state.imageSource=='' ? "加号" : "imageSource")
    return (
      <TouchableOpacity style={[btnStyles.uploadImageBtn,{backgroundColor:"white"}]}
                        activeOpacity={0.8} onPress={()=>this.onPress()} >
        <Image style={[btnStyles.uploadImageBtn,containerStyles.x_mediate,containerStyles.y_mediate]}
               source = {this.state.imageSource=='' ? require('./../../../assets/images/upLoadImage/add_image.png')
                 : this.state.imageSource}>
          {this.state.isUploading ? <ActivityIndicator color={'#808080'}/> : null}
        </Image>
      </TouchableOpacity>
    )
  }
}

export default UploadImageButton

var styles = StyleSheet.create({
  imageContain: {
    flex:1,
    backgroundColor:"white",
    borderStyle:"dashed",
    borderWidth:1/PixelRatio.get(),
    borderColor:"#a3a3a3",
    margin:1,
    borderRadius:8
  },
  image: {
    width:98*width/750,
    height:98*width/750
  },
  text: {
    textAlign:"center",
    textAlignVertical:"center",
    marginTop:13*width/750,
    marginBottom:28*width/750,
    fontSize:24*width/750,
    color: '#a3a3a3'
  },
  root: {
    position:"absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:"transparent"
  },
  gesture: {
    flex:1
  },
  tipContentView: {
    //width:300,
    borderTopWidth:0.5,
    borderColor:"#f0f0f0",
    backgroundColor: '#fff',
    height:45,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  tipText:{
    color:"gray",
    fontSize:17,
    alignItems:'center',
    justifyContent:'center',
  },
  button: {
    height: 45,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize:17,
    color:"#282828",
    textAlign:"center",
  },
  gap:{
    height:5,
    backgroundColor:'lightgray',
    opacity:0.8,
  },
});