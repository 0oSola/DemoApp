//
//  TestController.m
//  DemoApp
//
//  Created by sola on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//


#import "TestController.h"
#import "PushController.h"

#import "AppDelegate.h"

#define SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
#define SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height


@interface TestController ()

@end

@implementation TestController

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

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.navigationItem.title = @"原生页面";
  
  self.view.backgroundColor = [UIColor whiteColor];
  
  
  UIButton *button = [UIButton buttonWithType:(UIButtonTypeCustom)];
  button.frame = CGRectMake(SCREEN_WIDTH / 2 - 150, 80, 300, 80);
  button.backgroundColor = [UIColor redColor];
  [button setTitle:@"点击我，跳转到React-Native页面" forState:(UIControlStateNormal)];
  [button addTarget:self action:@selector(click) forControlEvents:(UIControlEventTouchUpInside)];
  [self.view addSubview:button];
  
}

- (void)click{
  
  PushController *push = [[PushController alloc]init];
  [self.navigationController pushViewController:push animated:YES];
}


@end
