//
//  maxappUITests.swift
//  maxappUITests
//
//  Created by Иван Соколовский on 01/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import XCTest

class maxappUITests: XCTestCase {
  
    override func setUp() {
      let app = XCUIApplication()
      setupSnapshot(app)
      app.launch()
    }

    func testScreenShots() {
      let app = XCUIApplication()

      app.toolbars["Toolbar"].buttons["Toolbar Done Button"].tap()
      snapshot("01AgreementLoginScreen")

      app.otherElements["btnAgrToPhone"].tap()
      app.toolbars["Toolbar"].buttons["Toolbar Done Button"].tap()
      snapshot("02PhoneLoginScreen")
    }
}
