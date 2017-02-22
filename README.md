# homebridge-mvc

[![NPM version][npm-image]][npm-url]
[npm-image]: http://img.shields.io/npm/v/homebridge-mvc.svg
[npm-url]: https://npmjs.org/package/homebridge-mvc

Homebridge-mvc is a Plugin for Homebridge. This Example-plugin is based on the MVC (Model-View-Controller) pattern.

Have a look at [homebridge-mqtt](https://github.com/cflurin/homebridge-mqtt) for a practical implementation.

### Installation

If you are new to Homebridge, please first read the Homebridge [documentation](https://www.npmjs.com/package/homebridge).
If you are running on a Raspberry, you will find a tutorial in the [homebridge-punt Wiki](https://github.com/cflurin/homebridge-punt/wiki/Running-Homebridge-on-a-Raspberry-Pi).

Install homebridge:
```sh
sudo npm install -g homebridge
```
Install homebridge-mqtt:
```sh
sudo npm install -g homebridge-mvc
```

### Configuration
Add the mqtt-platform in config.json in your home directory inside `.homebridge`.

```sh
{
  "platform": "mvc",
  "name": "mvc"
}

```

#
# API

* addAccessory()
* addService()
* removeAccessory()
* removeService()
* setValue()
* getAccessories()
* updateReachability()
* setAccessoryInformation()
* get()
* set()
* identify()


## Howto examples

1) Define your homriedge Plattform in index.js:

```js
var platform_name = "myPlatform";
```

**Note:** remeber to change `config.json` for your platform.

2) Modify the functions for your plugin in model.js

### add accessory

```sh
accessory = {"name": "flex_lamp", "service_name": "light", "service": "Switch"};
result = addAccessory(accessory);
```
### add a service

```sh
accessory = {"name": "multi_sensor", "service_name": "Humidity", "service": "HumiditySensor"};
result = addService(accessory);
```

### remove accessory

```sh
accessory = {"name": "flex_lamp"};
result = removeAccessory(accessory);
```

### remove service

```sh
accessory = {"name": "multi_sensor", "service_name": "Humidity"};
result = removeService(accessory);
```

### get accessoy/accessories

The purpose of this function is to retrieve accessory Definitions.
Use `setValue` to control your devices.

```sh
accessory = {"name": "outdoor_temp"};
result = getAccessories(accessory);
```

```sh
accessory = {"name": "*"};
result = getAccessories(accessory);
```

### set value

```sh
accessory = {"name": "flex_lamp", "service_name": "light", "characteristic": "On", "value": true};
result = setValue(accessory);
```

### update reachability

```sh

accessory = {"name": "flex_lamp", "reachable": true};
or
accessory = {"name": "flex_lamp", "reachable": false};
result = updateReachability(accessory);

```

### set accessory information

```sh
accessory = {"name": "flex_lamp", "manufacturer": "espressif", "model": "esp8266-12", "serialnumber": "4711"};
result = setAccessoryInformation(accessory);
```

### get (from homebridge)

```sh
Model.prototype.get = function(name, service_name, c) {...}
```

### set (from homebridge)

```sh
Model.prototype.set = function(name, service_name, c, value, callback) {...}
```

### identify (from homebridge)

```sh
Model.prototype.identify = function (name, manufacturer, model, serialnumber) {...}
```

### define characterstic

The required characteristics are added with the default properties. If you need to change the default, define the characteristic-name with the properties. e.g.:

```sh
accessory = 
  {
    "name": "living_temp",
    "service": "TemperatureSensor",
    "CurrentTemperature": {"minValue": -20, "maxValue": 60, "minStep": 1}
  };
result = addAccessory(accessory);
```

To add an optional charachteristic define the characteristic-name with "default" or with the properties. e.g.:

```sh
accessory = 
  {
    "name": "living_lamp",
    "service": "Lightbulb",
    "Brightness": "default"
  };
result = addAccessory(accessory);
```

```sh
accessory =
  {
    "name": "bathroom_blind",
    "service": "WindowCovering",
    "CurrentPosition": {"minStep": 5},
    "TargetPosition": {"minStep": 5},
    "CurrentHorizontalTiltAngle": {"minValue": 0, "minStep": 5},
    "TargetHorizontalTiltAngle": {"minValue": 0, "minStep": 5}
  };
result = addAccessory(accessory);
```

[HomeKitTypes.js](https://github.com/KhaosT/HAP-NodeJS/blob/master/lib/gen/HomeKitTypes.js) describes all the predifined Services, Characteristcs, format and properties for the `value` e.g.:

```
/**
 * Service "Contact Sensor"
 */

Service.ContactSensor = function(displayName, subtype) {
  Service.call(this, displayName, '00000080-0000-1000-8000-0026BB765291', subtype);

  // Required Characteristics
  this.addCharacteristic(Characteristic.ContactSensorState);

  // Optional Characteristics
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.Name);
};

/**
 * Characteristic "Contact Sensor State"
 */

Characteristic.ContactSensorState = function() {
  Characteristic.call(this, 'Contact Sensor State', '0000006A-0000-1000-8000-0026BB765291');
  this.setProps({
    format: Characteristic.Formats.UINT8,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};

inherits(Characteristic.ContactSensorState, Characteristic);

Characteristic.ContactSensorState.UUID = '0000006A-0000-1000-8000-0026BB765291';

// The value property of ContactSensorState must be one of the following:
Characteristic.ContactSensorState.CONTACT_DETECTED = 0;
Characteristic.ContactSensorState.CONTACT_NOT_DETECTED = 1;
```

Derived from this:

```
service = ContactSensor
characteristic = ContactSensorState
format = UINT8
property = 0 or 1
```
