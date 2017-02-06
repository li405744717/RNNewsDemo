//
//  RCTDeviceInfoManager.m
//  RNDemo
//
//  Created by DP-K on 2017/1/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTNativeManager.h"
#import "RCTEventDispatcher.h"
#import "RCTEventEmitter.h"
static NSMutableDictionary * _noti ;
static NSString * _deviceToken = @"";
@implementation RCTNativeManager
RCT_EXPORT_MODULE(NativeManager);
//获取版本号
static NSString * version(){
//  NSLog(@"version()");
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
//  NSLog(@"%@",infoDictionary);
  return [infoDictionary objectForKey:@"CFBundleShortVersionString"];
}
RCT_EXPORT_METHOD(getVersion:(RCTResponseSenderBlock)callback){
  callback(@[[NSNull null],version()]);
}
RCT_EXPORT_METHOD(getNoti:(RCTResponseSenderBlock)callback){
  callback(@[[NSNull null],_noti]);
}
RCT_EXPORT_METHOD(getDeviceToken:(RCTResponseSenderBlock)callback){
  callback(@[[NSNull null],_deviceToken]);
}
+(void)setLaunchUserInfoFromAppDelegate:(NSMutableDictionary*)userInfo{
  _noti = userInfo;
//  NSLog(@"%@",_noti);
}
+(void)setDeviceToken:(NSString*)deviceToken{
  _deviceToken = deviceToken;
  //获取DeviceToken
//  NSLog(@"字符串token: %@",_deviceToken);// 获取device token
}
@synthesize bridge = _bridge;

-(instancetype)init{
  NSString * UIEvent = @"UIEvent";
  self = [super init];
  if(self){
    //添加监听--触摸屏幕
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onTouch) name:UIEvent object:nil];
  }
  return self;
}
-(void)dealloc{
  [[NSNotificationCenter defaultCenter]removeObserver:self];
}
static NSDictionary *_getNoti(){
  NSLog(@"原生getNoti()");
  return _noti;
}
//响应触摸屏幕
-(void)onTouch{
  //向js发送事件
  [_bridge.eventDispatcher sendDeviceEventWithName:@"UIEvent" body:@"_"];
}
//响应点击推送
-(void)onClickNotification:(NSNotification*)noti{
  NSLog(@"@@@@onClickNotification@@@@@");
  NSLog(@"onClick,noti=%@",noti);
  NSLog(@"onClick,userinfo=%@",noti.object);
  [_bridge.eventDispatcher sendDeviceEventWithName:@"onClickNotification" body:noti.object];
}
-(NSDictionary *)constantsToExport{
  return @{@"EVENT_NOTIFICATION":@"onClickNotification"};
}
@end
