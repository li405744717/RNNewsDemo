/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
#import "IQKeyboardManager/IQKeyboardManager.h"
#import "AppDelegate.h"
#import "RCTNativeManager.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "RCTHotUpdate.h"
#import "RNDemo-swift.h"
@implementation AppDelegate
-(void)sendEvent:(UIEvent *)event{
  [super sendEvent:event];
  NSString * UIEvent = @"UIEvent";
  NSSet *allTouches = [event allTouches];
  if ([allTouches count] > 0)
  {
    UITouchPhase phase = ((UITouch *)[allTouches anyObject]).phase;
    if (phase == UITouchPhaseBegan){
      NSLog(@"send event");
      [[NSNotificationCenter defaultCenter] postNotificationName:UIEvent object:@"__"];
    }
    
  }
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  //自动设置输入框高度
  [[IQKeyboardManager sharedManager] setEnable:true];
  //app未打开，接收到推送
  NSMutableDictionary * dic = [[NSMutableDictionary alloc]initWithDictionary:launchOptions];
  [RCTNativeManager setLaunchUserInfoFromAppDelegate:dic];
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
#if DEBUG
  // 原来的jsCodeLocation
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.13.96:8081/index.ios.bundle?platform=ios&dev=true"];
#else
  jsCodeLocation=[RCTHotUpdate bundleURL];
#endif
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNDemo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0 )
  {
    //IOS8
    //创建UIUserNotificationSettings，并设置消息的显示类类型
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIRemoteNotificationTypeBadge|UIRemoteNotificationTypeSound|UIRemoteNotificationTypeAlert) categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    
  } else{ // ios7
    UIRemoteNotificationType myTypes = UIRemoteNotificationTypeBadge|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeSound;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myTypes];
  }
  return YES;
}
-(void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings{
  NSLog(@"didRegisterUserNotificationSettings 注册通知成功:%@",notificationSettings);
  [application registerForRemoteNotifications];
}
-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  //获取DeviceToken
  NSString* newToken = [[[NSString stringWithFormat:@"%@",deviceToken]
                         stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]] stringByReplacingOccurrencesOfString:@" " withString:@""];
  [RCTNativeManager setDeviceToken:newToken];
  NSLog(@"nsdata:%@\n 字符串token: %@",deviceToken, newToken);// 获取device token
}
-(void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
  NSLog(@"%@",error);
}
@end
