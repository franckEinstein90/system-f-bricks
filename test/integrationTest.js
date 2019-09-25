/***********************************
 *
 *
 *
 **********************************/
"use strict";



const webDriver = require('selenium-webdriver');

const browser = new webDriver.Builder()
    .forBrowser('chrome')
    .build() 

let openBrowser = async function(){
    await browser.get('http://localhost:8080');
    await browser.manage().window().maximize();
    
}

try {

    openBrowser()

} catch(err){
    console.log(err)
}

