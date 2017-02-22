'use strict';

var Utils = require('./utils.js').Utils;

var plugin_name, Characteristic;
var addAccessory, addService, removeAccessory, removeService, setValue, getAccessories, updateReachability, setAccessoryInformation;

module.exports = {
  Model: Model
}

function Model(params) {

  this.config = params.config;
  this.log = params.log;
  plugin_name = params.plugin_name;
  Characteristic = params.Characteristic;
  
  addAccessory = params.addAccessory;
  addService = params.addService;
  removeAccessory = params.removeAccessory;
  removeService = params.removeService;
  setValue = params.setValue;
  getAccessories = params.getAccessories;
  updateReachability = params.updateReachability;
  setAccessoryInformation = params.setAccessoryInformation;
}

Model.prototype.start = function() {

  var result;
  var accessory = {};
  
  // addAccessory
  accessory = {"name":"mvc_lamp","service_name":"light","service":"Switch"};
  
  result = addAccessory(accessory);
  this.log("result: %s", JSON.stringify(result));

  
  // addAccessory
  accessory = {"name":"mvc_sensor","service_name":"temperature","service":"TemperatureSensor"};
  
  result = addAccessory(accessory);
  this.log("result: %s", JSON.stringify(result));

  
  // setValue
  accessory = {"name":"mvc_sensor","service_name":"temperature","characteristic":"CurrentTemperature","value": 20.5};
  
  result = setValue(accessory);
  this.log("result: %s", JSON.stringify(result));

  
  // updateReachability
  accessory = {"name":"mvc_lamp","reachable": true};
  
  result = updateReachability(accessory);
  this.log("result: %s", JSON.stringify(result));


   // setAccessoryInformation
  accessory = {"name": "mvc_lamp", "manufacturer": "espressif", "model": "esp8266-12", "serialnumber": "4711"}
  
  result = setAccessoryInformation(accessory);
  this.log("result: %s", JSON.stringify(result));

    
  // getAccessories
  accessory = {"name":"*"};  // or accessory = {"name":"mvc_sensor"};
  
  result = getAccessories(accessory);
  this.log("result: %s", JSON.stringify(result, null, 2));
  

  /* uncomment if needed
  // removeAccessory
  accessory = {"name":"mvc_sensor"};
  
  result = removeAccessory(accessory);
  this.log("result: %s", JSON.stringify(result));

  
  // addService
  accessory = {"name":"mvc_sensor","service_name":"humidity","service":"HumiditySensor"};
  
  result = addService(accessory);
  this.log("result: %s", JSON.stringify(result));


  // removeService
  accessory = {"name":"mvc_sensor","service_name": "humidity"};
  
  result = removeService(accessory);
  this.log("result: %s", JSON.stringify(result));
  */
}


Model.prototype.get = function(name, service_name, c) {

  this.log("get '%s' '%s' '%s'", name, service_name, c);
}

Model.prototype.set = function(name, service_name, c, value, callback) {
     
  this.log("set '%s' '%s' '%s' %s", name, service_name, c, value);

  callback();
}

Model.prototype.identify = function (name, manufacturer, model, serialnumber) {

  this.log("identify, turn on/off a lamp or just log this message");
}
