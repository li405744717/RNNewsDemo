//
//  RCTMyView.h
//  RNDemo
//
//  Created by DP-K on 2017/1/11.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTViewManager.h"
#import "RCTBridgeModule.h"
#import "RNDemo-swift.h"
@interface RCTMyViewManager : RCTViewManager<RCTBridgeModule>
@property (nonatomic, retain)  My_View *my_View;
@end
