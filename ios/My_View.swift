//
//  MyView.swift
//  RNDemo
//
//  Created by DP-K on 2017/1/11.
//  Copyright © 2017年 Facebook. All rights reserved.
//

import UIKit

class My_View: UIView,UITextFieldDelegate {
    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */
  var textValue:String?
  var defaultValue:String?
  var onChange:RCTBubblingEventBlock?
  var callback:()->(Void) = {
    
  }
  
  required init(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)!
//    print("My_View,ini2t")
  }
  @IBOutlet weak var myText: UITextField!
  func setDefaultValue(value:String){
    print("setDefaultValue2:"+value)
    self.myText.text = value
  }
  func setTextValue(value:String){
    print("setTextValue2:"+value)
    self.myText.text = value
  }
  func getTextValue() -> String{
    return self.textValue!
  }
  @IBAction func editing(_ sender: UITextField) {
    self.textValue = sender.text!
    //print("MyView---textField.text:"+sender.text!)
    self.callback()
  }
  @IBAction func didEndEdit(_ sender: UITextField) {
    self.textValue = sender.text!
    //print("MyView---textField.text"+sender.text!)
    //self.callback()
  }
    
  
}
