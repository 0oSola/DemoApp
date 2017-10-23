//
//  PushNative.m
//  DemoApp
//
//  Created by sola on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "PushNative.h"
#import <React/RCTBridge.h>

// 导入跳转的页面
#import "TestController.h"
#import "DemoApp-Swift.h"
#import "TableViewController.h"


// 导入AppDelegate，获取UINavigationController
#import "AppDelegate.h"

@implementation PushNative

RCT_EXPORT_MODULE(PushNative)
// RN跳转原生界面
// RNOpenOneVC指的就是跳转的方法，下面会用到
RCT_EXPORT_METHOD(RNOpenOneVC:(NSString *)msg){
  
  NSLog(@"RN传入原生界面的数据为:%@",msg);
  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    //OC界面
    //TestController *one = [[TestController alloc]init];
    
    //swift界面
    //SwiftController *one = [[SwiftController alloc]init];
    
    TableViewController *one = [[TableViewController alloc]init];
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [app.nav pushViewController:one animated:YES];

  });
}


@end
