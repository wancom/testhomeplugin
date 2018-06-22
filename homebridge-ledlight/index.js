var service, chara
var spawn = require('child_process').spawn;

module.exports = function (homebridge) {
  service = homebridge.hap.Service
  chara = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-ledlight','ledlight',LEDAcc)
}

function LEDAcc (log,config){
  this.log = log
  this.ledcmd = config['ledcmd']
  this.pwrstatus = 0
  this.brightness = 0
  this.hue = 0
  this.saturation = 0

  this.ledservice = new service.Lightbulb(this.name)
}

LEDAcc.prototype = {
  identify: function (callback){
    this.log('This is LED Light!')
    callback()
  },

  setPower: function (value, callback) {
    if (this.pwrstatus == value) callback(null)
    this.pwrstatus = value
    if (value == 1) {
      this.p = spawn(this.ledcmd,[],{stdio:['pipe','inherit','inherit']})
      this.p.stdin.write(String(this.hue) + ' ' + String(this.saturation) + ' ' + String(this.brightness) + '\n')
    } else {
      this.p.stdin.write('-1 -1 -1\n')
    }
    callback(null)
  },
  getPower: function (callback) {
    callback(null,this.pwrstatus)
  },

  setBrightness: function (value, callback) {
    this.brightness = value
    this.p.stdin.write(String(this.hue) + ' ' + String(this.saturation) + ' ' + String(this.brightness) + '\n')
    callback(null)
  },
  getBrightness: function (callback) {
    callback(null,this.brightness)
  },

  setHue: function (value, callback) {
    this.hue = value
    this.p.stdin.write(String(this.hue) + ' ' + String(this.saturation) + ' ' + String(this.brightness) + '\n')
    callback(null)
  },
  getHue: function (callback) {
    callback(null,this.hue)
  },

  setSaturation: function (value, callback) {
    this.saturation = value
    this.p.stdin.write(String(this.hue) + ' ' + String(this.saturation) + ' ' + String(this.brightness) + '\n')
    callback(null)
  },
  getSaturation: function (callback) {
    callback(null,this.saturation)
  },

  getServices: function(){
    this.log('setService')

    var infosv = new service.AccessoryInformation()
    infosv.setCharacteristic(chara.Manufacturer,'My Manufacture')
          .setCharacteristic(chara.Model,'My Led Light Model')
          .setCharacteristic(chara.SerialNumber,'MYLEDLIGHT')

    this.ledservice.getCharacteristic(chara.On)
          .on('set',this.setPower.bind(this))
          .on('get',this.getPower.bind(this))
    this.ledservice.getCharacteristic(chara.Brightness)
          .on('set',this.setBrightness.bind(this))
          .on('get',this.getBrightness.bind(this))
    this.ledservice.getCharacteristic(chara.Hue)
          .on('set',this.setHue.bind(this))
          .on('get',this.getHue.bind(this))
    this.ledservice.getCharacteristic(chara.Saturation)
          .on('set',this.setSaturation.bind(this))
          .on('get',this.getSaturation.bind(this))


    return [infosv,this.ledservice]
  }
}
