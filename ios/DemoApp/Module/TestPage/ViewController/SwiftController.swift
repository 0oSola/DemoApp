//
//  SwiftPage.swift
//  DemoApp
//
//  Created by sola on 2017/10/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

import Foundation
import UIKit

class SwiftController: UIViewController {
  
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    let item=UIBarButtonItem(title: "添加", style: UIBarButtonItemStyle.plain, target: self, action: nil)
    self.navigationItem.rightBarButtonItem=item
    
    self.navigationItem.title = "Swift界面";
    
    self.view.backgroundColor = UIColor(red: 255, green: 255, blue: 255, alpha: 0.5)
    self.myButton()
    // Do any additional setup after loading the view.
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  func myButton() {
    // 1.创建UIButton, 并且设置为Custom样式
    //var button: UIButton = UIButton(type: UIButtonType.Custom)
    //var button: UIButton = UIButton.buttonWithType(UIButtonType.Custom) as UIButton
    let button:UIButton = UIButton(type:.custom)
    
    // 2.设置UIButton的坐标轴
    //button.frame = CGRectMake(100, 200, 100, 40)
    button.frame = CGRect(origin: CGPoint(x: 0,y :80), size: CGSize(width: 100, height: 30))
    // 3.设置UIButton的背景色
    button.backgroundColor = UIColor(red: 255, green: 0, blue: 0, alpha: 0.5)
    
    // 4.设置UIButton的Normal状态下的title
    button.setTitle("我是按钮", for:[])
    
    // 5.设置UIButton的Normal状态下的title颜色
    button.setTitleColor(UIColor(red: 0, green: 0, blue: 0, alpha: 1), for:[])
    
    // 6.设置UIButton的Highlighted状态下的title
    //button.setTitle("", forState: UIControlState.Highlighted)
    
    // 7.设置UIButton的Highlighted状态下的title颜色
    //button.setTitleColor(UIColor.greenColor(), forState: UIControlState.Highlighted)
    
    // 8.设置UIBUtton的Noraml状态下的title阴影颜色
    //button.setTitleShadowColor(UIColor.whiteColor(), forState: UIControlState.Normal)
    
    // 9.设置UIButton的Highlighted状态下的title阴影颜色
    //button.setTitleShadowColor(UIColor.darkGrayColor(), forState: UIControlState.Highlighted)
    
    // 10.添加UIBUtton在touchUpInside点击下的监听方法
    button.addTarget(self, action: #selector(buttonTarget(button:)), for: UIControlEvents.touchUpInside)
    // 其他属性
    // 11.设置Button的内容位置
    //button.contentEdgeInsets = UIEdgeInsetsMake(0, 0, 0, 0)
    
    // 12.添加到self.view上
    self.view.addSubview(button)
  }
  
  
  // 13.UIButton的被监听方法
  func buttonTarget(button:UIButton) {
    print("MDZZ?")
//    let idVC = self.navigationController?.viewControllers[2] as! IdentityViewController
//    _ = self.navigationController?.popToViewController(idVC, animated: true)
    // 15.删除监听方法
    //sender.removeTarget(self, action: "buttonTarget:", for: UIControlEvents.touchUpInside)
  }
  
}
