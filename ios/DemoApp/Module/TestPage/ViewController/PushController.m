//
//  PushController.m
//  DemoApp
//
//  Created by sola on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "PushController.h"
#import "AppDelegate.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>

@interface PushController ()

@end

@implementation PushController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.view.backgroundColor = [UIColor whiteColor];
  
  self.navigationItem.title = @"ReactNative页面";
  
  NSURL *jsCodeLocation;
  
  // 另外一种可以获得RN的类方法
  //  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:[NSString stringWithFormat:@"./App/Page/ThreePage/Three"] fallbackResource:nil];
  NSString * strUrl = @"http://localhost:8081/index.bundle?platform=ios&dev=true";
  jsCodeLocation = [NSURL URLWithString:strUrl];
  
//
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                      moduleName:@"DemoApp"
//                                               initialProperties:nil
//                                                   launchOptions:launchOptions];
//  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"DemoApp"
                                               initialProperties:@{
                                                                   
                                                                   @"launchOptions":@{
                                                                       @"componentName":@"RNPage"
                                                                       }
                                                                   }
                                                   launchOptions:nil];
  self.view = rootView;
  
}

- (void)viewWillAppear:(BOOL)animated{
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  //[app.nav setNavigationBarHidden:NO animated:animated];
  [super viewWillAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated{
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  //[app.nav setNavigationBarHidden:YES animated:animated];
  [super viewWillDisappear:animated];
}

@end
