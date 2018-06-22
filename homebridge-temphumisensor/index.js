var service, chara
var exec = require('child_process').exec;


module.exports = function (homebridge) {
  service = homebridge.hap.Service
  chara = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-temphumisensor','thsensor',THAcc)
}

function THAcc (log,config){
  this.log = log
  this.tempcmd = config['tempcmd']
  this.humicmd = config['humicmd']

  this.tempservice = new service.TemperatureSensor(this.name)
  this.humiservice = new service.HumiditySensor(this.name)
}

THAcc.prototype = {
  identify: function (callback){
    this.log('This is THSensor!')
    callback()
  },

  getTemp: function (callback) {
    exec(this.tempcmd,function(err,stdout,stderr){
      if (err !== null) {
        callback(err)
        return
      }
      callback(null,parseInt(stdout, 10))
    })
  },

  getHumi: function (callback) {
    exec(this.humicmd,function(err,stdout,stderr){
      if (err !== null) {
        callback(err)
        return
      }
      callback(null,parseInt(stdout, 10))
    })
  },

  getServices: function(){

    var infosv = new service.AccessoryInformation()
    infosv.setCharacteristic(chara.Manufacturer,'My Manufacturer')
          .setCharacteristic(chara.Model,'My Model')
          .setCharacteristic(chara.SerialNumber,'MYTHSENSOR')

    this.tempservice.getCharacteristic(chara.CurrentTemperature)
          .on('get',this.getTemp.bind(this))

    this.humiservice.getCharacteristic(chara.CurrentRelativeHumidity)
          .on('get',this.getHumi.bind(this))

    return [infosv,this.tempservice,this.humiservice]
  }
}
