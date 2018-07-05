var service, chara
var exec = require('child_process').exec;

module.exports = function (homebridge) {
  service = homebridge.hap.Service
  chara = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-raspipower','raspipower',RPAcc)
}

function RPAcc (log,config){
  this.log = log
  this.swstatus = 1
  this.poweron = config['oncmd']
  this.poweroff = config['offcmd']

  this.rpservice = new service.Switch(this.name)
}

RPAcc.prototype = {
  identify: function (callback){
    this.log('This is a raspberrypi power control plugin!')
    callback()
  },

  setState: function (value, callback) {
    this.log('value:' + value)
    this.swstatus = value
    exec(value ? this.poweron : this.poweroff,function(err,stdout,stderr){
      if (err !== null) {
        return
      }
      
    })
      callback(null)
  },

  getState: function (callback) {
    callback(null,this.swstatus)
  },

  getServices: function(){
    this.log('setService')

    var infosv = new service.AccessoryInformation()
    infosv.setCharacteristic(chara.Manufacturer,'My Manufacture')
          .setCharacteristic(chara.Model,'My Model')
          .setCharacteristic(chara.SerialNumber,'RPIPOWER')

    this.rpservice.getCharacteristic(chara.On)
          .on('set',this.setState.bind(this))
          .on('get',this.getState.bind(this))

    return [infosv,this.rpservice]
  }
}
