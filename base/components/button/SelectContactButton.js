import React, { Component, } from 'react'
import { View,TouchableOpacity, Image } from 'react-native'
import btnStyles from './../../../assets/styles/btnStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import ContactsWrapper from 'react-native-contacts-wrapper'
class SelectContactButton extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      name:"",
      phone:"",
      email:""
    }
  }
  selectContact = (callback) => {
    ContactsWrapper.getContact()
      .then((contact) => {
        // Replace this code
        console.log(contact)
        var contactPhone = contact.phone.replace(/[-\s]/g,'')
        var temp
        if(contactPhone.length<11){
          temp = contactPhone.length
        }else {
          temp = 11
        }
        console.log('手机号长度',contactPhone.length)
        this.setState({
          name:contact.name,
          phone:contactPhone.substr(contactPhone.length-temp)
        })
        var _contact = {
          name:contact.name,
          phone:contactPhone.substr(contactPhone.length-temp)
        }
        callback(_contact)
      })
      .catch((error) => {
        console.log("ERROR CODE: ", error.code);
        console.log("ERROR MESSAGE: ", error.message);
      });
  }
  _onPress= () => {
    this.selectContact((contact)=>{
      if(this.props.onPress) this.props.onPress(contact)
    })

  }
  render() {
    return (
      <TouchableOpacity style={[btnStyles.selectContactBtn]} onPress={()=>this._onPress()} activeOpacity={0.5}>
        <Icon name={"address-book"} size={30} color={"#ff2121"}></Icon>
      </TouchableOpacity>
    )
  }
}

export default SelectContactButton