var service, chara
var spawn = require('child_process').spawn;

module.exports = function (homebridge) {
  service = homebridge.hap.Service
  chara = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-pirsensor','pirsensor',PIRAcc)
}

function PIRAcc (log,config){
  this.log = log
  this.sensorcmd = config['sensorcmd']
  this.p = spawn(this.sensorcmd,[])

  this.pirservice = new service.MotionSensor(this.name)

  this.p.stdout.on('data', (data) => {
    this.status = parseInt(data.toString(),10)
    this.log('Status changed:' + String(this.status))
    this.pirservice.getCharacteristic(chara.MotionDetected).setValue(this.status)
  })
}

PIRAcc.prototype = {
  identify: function (callback){
    this.log('Identify!')
    callback()
  },

  getState: function (callback) {

    callback(null,this.swstatus)
  },

  getServices: function(){
    this.log('setService')

    var infosv = new service.AccessoryInformation()
    infosv.setCharacteristic(chara.Manufacturer,'My Manufacture')
          .setCharacteristic(chara.Model,'My PIR Model')
          .setCharacteristic(chara.SerialNumber,'MYPIR1234')

    this.pirservice.getCharacteristic(chara.MotionDetected)
          // .on('set',this.setState.bind(this))
          .on('get',this.getState.bind(this))

    return [infosv,this.pirservice]
  }
}
