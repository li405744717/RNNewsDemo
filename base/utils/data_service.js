/**
 * Created by dp-k on 2016/12/15.
 */
import React, { Component } from 'react';
import {AsyncStorage,Platform} from 'react-native'
import AppConfig from './../config'
getValueWithKey = (key,successCallBack,failCallBack) => {
  AsyncStorage.getItem(key)
    .then((value)=>{
      if (value !== null) {
        if(successCallBack) successCallBack(value)
      }else{
        console.log("GET "+key+" FAIL",value)
        if(failCallBack) failCallBack()
        else console.log("没有failCallBack")
      }
    })
    .catch((error)=>{
      console.log("GET "+key+" ERROR",error)
      if(failCallBack) failCallBack()
      else console.log("没有failCallBack")
    })
    .done()
}

setValueWithKey = (key,value,callBack) => {
  AsyncStorage.setItem(key, value)
    .then(() => {
      if (callBack) callBack()
    })
    .catch((error) => {
      console.log("SET "+value+" WITH"+key+"ERROR",error)
    })
    .done()
}

removeValueWithKey = (key,callback) => {
  AsyncStorage.removeItem(key)
    .then(()=>{
      if (callBack) callback()
    })
    .catch((error) => {
      console.log("REMOVE VALUE WITH"+key+"ERROR",error)
    })
    .done()
}
getVersion = (successCallback,failCallBack) => {
  getValueWithKey("version",successCallback,failCallBack)
}
setVersion = (version,callback) => {
  setValueWithKey("version",version,callback)
}
isOk = (data) => {
  if(data && data.head && data.head.code == 0){
    return true
  }else{
    return false
  }
}
getCode = (data) => {
  if(data && data.head && data.head.code){
    return data.head.code
  }else if(data && data.head){
    return "code 不存在"
  }else if(data){
    return "head 不存在"
  }else{
    return "data 不存在"
  }
}
getMessage = (data) => {
  if(data && data.head && data.head.message){
    return data.head.message
  }else if(data && data.head){
    return "message 不存在"
  }else if(data){
    return data.toString()
  }else{
    return "未知错误"
  }
}
run = (method, param,component, callback, failback,catchback,noNeedLoading) => {
  var url = AppConfig.SERVICE_URL
  url = url+method
  //参数
  var requestBody = {
    head : {
      device:"device",
      version:"version"
    },
    body :param
  }
  //请求报文
  var fetchOptions = {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json; encoding=utf-8'
    },
    body: JSON.stringify(requestBody)
  }
  console.log('请求地址:',url,'请求报文',fetchOptions)
  if(!noNeedLoading)  component.showLoadingView()
  fetch(url, fetchOptions).then((response) => response.text())
    .then((data) => {
      component.hideLoadingView()
      if(isOk(JSON.parse(data))){
        console.log("method",method,'返回报文:',JSON.parse(data))
        if(callback){//返回成功
          callback(JSON.parse(data))
        }else{
          console.log("没有定义callback")
        }
      }else{
        if(failback){//返回失败
          failback(JSON.parse(data))
        }else{
          console.log("没有定义failback")
        }
      }
    })
    .catch((error) => {
      component.hideLoadingView()
      console.warn("method",method,"request error",error)
      if(catchback){//抛出异常
        catchback(error)
      }else{
        console.log("没有定义catchback")
      }
    })
    .done();
}
runHtml = (method, param,component, callback,failback, catchback) => {
  var url = AppConfig.SERVICE_URL
  url = url+method
  //参数
  var requestBody = {
    head : {
      device:"device",
      version:"version"
    },
    body :param
  }
  //请求报文
  var fetchOptions = {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json; encoding=utf-8'
    },
    //JSON.stringify(requestBody)
    body: JSON.stringify(requestBody)
  }
  console.log('请求地址:',url,'请求报文',fetchOptions)
  component.showLoadingView()
  fetch(url, fetchOptions).then((response) => response.text())
    .then((data) => {
      component.hideLoadingView()
      //JSON.parse(data)
      console.log("method",method,'返回报文(HTML):',data)
        if(callback){
          callback(data)
        }
        else{
          console.log("没有定义callback")
        }
    })
    .catch((error) => {
      component.hideLoadingView()
      console.warn("method",method,"request error",error)
      if(catchback){
        catchback(error)
      }else{
        console.log("没有定义catchback")
      }
    })
    .done();
}
export const RemoteService = {
  'run':run,
  'runHtml':runHtml,
  'getCode':getCode,
  'getMessage':getMessage
}
export const LocalService = {
  'getValueWithKey':getValueWithKey,
  'setValueWithKey':setValueWithKey,
  'removeValueWithKey':removeValueWithKey,
  'getVersion':getVersion,
  'setVersion':setVersion
}

