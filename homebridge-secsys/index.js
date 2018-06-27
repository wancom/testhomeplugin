var service, chara
const STAYARM  = 0
const AWAYARM  = 1
const NIGHTARM = 2
const DISARMED = 3
const ALARMTRG = 4

module.exports = function (homebridge) {
  service = homebridge.hap.Service
  chara = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-secsys','secsys',SecSysAcc)
}

function SecSysAcc (log,config){
  this.log = log
  this.targetstate = 0
  this.currentstate = 0

  this.secsysservice = new service.SecuritySystem(this.name)
}

SecSysAcc.prototype = {
  identify: function (callback){
    this.log('This is secsys plugin!')
    callback()
  },

  setTargetState: function (value, callback) {
    this.targetstate = value
    callback(null)
  },
  getTargetState: function (callback) {
    callback(null,this.targetstate)
  },

  setCurrentState: function (value, callback) {
    this.currentstate = value
    callback(null)
  },
  getCurrentState: function (callback) {
    callback(null,this.currentstate)
  },

  getServices: function(){
    this.log('setService')

    var infosv = new service.AccessoryInformation()
    infosv.setCharacteristic(chara.Manufacturer,'My Manufacture')
          .setCharacteristic(chara.Model,'My Model')
          .setCharacteristic(chara.SerialNumber,'MYSECSYS')

    this.secsysservice.getCharacteristic(chara.SecuritySystemTargetState)
          .on('set',this.setTargetState.bind(this))
          .on('get',this.getTargetState.bind(this))
    this.secsysservice.getCharacteristic(chara.SecuritySystemCurrentState)
          .on('set',this.setCurrentState.bind(this))
          .on('get',this.getCurrentState.bind(this))
    

    return [infosv,this.testservice]
  }
}
