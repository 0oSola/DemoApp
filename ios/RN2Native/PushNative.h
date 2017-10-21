//
//  PushNative.h
//  DemoApp
//
//  Created by sola on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
// 导入RCTBridgeModule类，这个是react-native提供
#import <React/RCTBridgeModule.h>
// 遵守RCTBridgeModul协议
@interface PushNative : NSObject<RCTBridgeModule>
@end

