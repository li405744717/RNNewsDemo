//
//  RCTMyView.m
//  RNDemo
//
//  Created by DP-K on 2017/1/11.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTMyViewManager.h"
#import "RNDemo-swift.h"

@implementation RCTMyViewManager
RCT_EXPORT_MODULE()
RCT_CUSTOM_VIEW_PROPERTY(defaultValue, NSString,My_View){
  NSLog(@"defaultValue:%@",json);
  [view setTextValueWithValue:json];
  
}
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
- (UIView *)view
{
//  NSLog(@"initView--manager");
  self.my_View = [[[NSBundle mainBundle]loadNibNamed:@"MyView" owner:nil options:nil] firstObject];
  self.my_View.frame = CGRectMake(0, 0, 375, 200);
  void (^callback)() = ^void (void) {
    self.my_View.onChange(@{@"textValue": self.my_View.textValue});
  };
  self.my_View.callback = callback;
  return self.my_View;
}
RCT_EXPORT_METHOD(getValue:(RCTResponseSenderBlock)callback){
  callback(@[[NSNull null],self.my_View.textValue]);
}
@end
