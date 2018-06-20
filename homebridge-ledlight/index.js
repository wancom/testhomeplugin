var service, chara

module.exports = function (homebridge) {
  service = homebridge.hap.Service
  chara = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-ledlight','ledlight',LEDAcc)
}

function LEDAcc (log,config){
  this.log = log


  this.ledservice = new service.Lightbulb(this.name)
}

LEDAcc.prototype = {
  identify: function (callback){
    this.log('This is LED Light!')
    callback()
  },

  setState: function (value, callback) {
    this.log('setState')
    this.log('value:' + value)
    this.swstatus = value
    callback(null)
  },

  getState: function (callback) {
    this.log('getState')
    callback(null,this.swstatus)
  },

  getServices: function(){
    this.log('setService')

    var infosv = new service.AccessoryInformation()
    infosv.setCharacteristic(chara.Manufacturer,'Test Manufacture')
          .setCharacteristic(chara.Model,'Test Model')
          .setCharacteristic(chara.SerialNumber,'TEST1234')

    this.testservice.getCharacteristic(chara.On)
          .on('set',this.setState.bind(this))
          .on('get',this.getState.bind(this))

    return [infosv,this.testservice]
  }
}
