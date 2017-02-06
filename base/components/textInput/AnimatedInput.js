/**
 * Created by Lemon on 2016/12/29.
 */
import React, { PropTypes,Component } from 'react';
import {
    Animated,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import cellStyles from '../../../assets/styles/cellStyles'

class AnimatedInput extends Component {

    static propTypes = {
        title:React.PropTypes.string.isRequired
    }

    static defaultProps = {}

    constructor(props) {
        super(props)
        this.state = {
            focusedAnim: new Animated.Value(0),
            inputValue:'',
            placeholderColor:false,
            isediting:false

        }
    }

    _toggle(isActive) {
        console.log('_toggle')
        Animated.timing(
            this.state.focusedAnim, {
                toValue: isActive ? 1 : 0,
                duration: 400,
                easing: this.props.easing,
            },
        ).start();
    }

    _onBlur=()=>{
        console.log('_onBlur')
        this.setState({
            isediting: false
        });
        if (!this.state.inputValue) {
            this._toggle(false);
        }
        this.props.onBlur()
    }

    _onFocus=()=> {
        console.log('_onFocus')
        this.setState({
            isediting: true
        });
        this._toggle(true);
        this.props.onFocus()
    }

    _onDelTextHandle=()=>{
        console.log('_onDelTextHandle')
        this.setState({
            inputValue:''
        })
    }

    render() {
        const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);
        var titleView = (
            <TouchableWithoutFeedback>
                <Animated.View style={{
                    position: 'absolute',
                    bottom: this.state.focusedAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 40],
                    }),
                }}>

                    <Animated.Text style={[cellStyles.AnimatedInputLabel, {
                      fontSize: this.state.focusedAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [18, 12],
                      }),
                    }]}>
                      {this.props.title}
                    </Animated.Text>


                </Animated.View>
            </TouchableWithoutFeedback>
        )
        var middleView = (Platform.OS === 'ios' ?
                <TextInput ref="input"
                           style={[cellStyles.AnimatedInputTextInput,{width:window.width,height:40}]}
                           value={this.state.inputvalue}
                           placeholder = {this.props.placeholder}
                           placeholderTextColor = {this.props.placeholderTextColor? this.props.placeholderTextColor:'#a3a3a3'}
                           keyboardType = {this.props.keyboardType}
                           maxLength = {this.props.maxLength}
                           selectionColor = {this.props.selectionColor}
                           onBlur={()=>this._onBlur()}
                           onChangeText = {(inputvalue) => this.setState({inputvalue:inputvalue})}
                           onFocus={()=>this._onFocus()}
                           secureTextEntry = {this.props.secureTextEntry == '' ? {false} : this.props.secureTextEntry}
                           underlineColorAndroid={'transparent'}>
                </TextInput>:
                <View style={{flex:8}}>
                    <TextInput
                        ref="input"
                        style={[cellStyles.AnimatedInputTextInput,{width:window.width,height:40}]}
                        underlineColorAndroid = "transparent"
                        onChangeText = {(inputvalue) => this.setState({inputValue:inputvalue})}
                        value = {this.state.inputValue}
                        placeholder = {this.props.placeholder}
                        placeholderTextColor = {this.props.placeholderTextColor? this.props.placeholderTextColor:'#a3a3a3'}
                        keyboardType = {this.props.keyboardType}
                        maxLength = {this.props.maxLength}
                        selectionColor = {this.props.selectionColor}
                        secureTextEntry = {this.props.secureTextEntry == '' ? {false} : this.props.secureTextEntry}
                        onFocus={()=>this._onFocus()}
                        onBlur={()=>this._onBlur()}
                    />
                    {this.state.isediting ?
                        <TouchableOpacity style={this.state.inputValue ? cellStyles.AnimatedInputDel : ''} onPress={() => this._onDelTextHandle()}>
                            <Image style={this.state.inputValue ? cellStyles.inputDelImg : cellStyles.inputDelImgNone} resizeMode={'stretch'} source={require('./../../../assets/images/icon_delete.png')} />
                        </TouchableOpacity> :
                        <View></View>
                    }
                </View>
        )

        var IconView = (
            <AnimatedIcon
                name='pencil'
                color='#ff2121'
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: this.state.focusedAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, window.width],
                    }),
                    transform: [{
                        rotate: this.state.focusedAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '-90deg'],
                        }),
                    }],
                    fontSize: 20,
                    backgroundColor: 'transparent',
                }}
            />
        )

        var borderView = (
            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: 2,
                    width: this.state.focusedAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, window.width-20],
                    }),
                    backgroundColor: '#ff2121',
                }}
            />
        )
        console.log("this.state.inputvalue",this.state.inputvalue,(this.state.inputvalue == "" || this.state.inputvalue == undefined) ? "true" : "false")
        return (
                <View style={{backgroundColor: 'white'}}>
                    <View style={cellStyles.AnimatedInputContainer}>
                        {this.state.inputvalue == "" || this.state.inputvalue == undefined || this.state.isediting ? titleView : null}
                        {middleView}
                        {IconView}
                        {borderView}
                    </View>
                </View>
        )
    }
}

export default AnimatedInput