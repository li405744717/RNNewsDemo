//
//  RCTDeviceInfoManager.h
//  RNDemo
//
//  Created by DP-K on 2017/1/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
@interface RCTNativeManager : NSObject<RCTBridgeModule>
+(void)setLaunchUserInfoFromAppDelegate:(NSMutableDictionary*)userInfo;
+(void)setDeviceToken:(NSString*)deviceToken;
@end
