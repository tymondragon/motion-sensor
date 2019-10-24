const deviceManager = require('community-sdk').DeviceManager;
const MotionSensorKit = require('community-sdk').MotionSensorKit;
const direction = {
  0: 'up',
  1: 'down',
  2: 'left',
  3: 'right'
}

exports.useMotion = async (req, res, next) => {
  deviceManager.listConnectedDevices()
  .then((devices) => {
    let count = 0;
      let msk = devices.find((device) => {
        return device instanceof MotionSensorKit;
      });
      if (!msk) {
        console.log('No Motion Sensor Kit was found :(');
      } else {
        console.log('Motion Sensor Kit found!');
        msk.setMode('gesture')
        .then(() => {
            console.log('Set to `gesture` mode. Try to see if you can guess which direction is correct 5 times as fast as you can. Move your hand up, down, left, or right.')
        });
        // Prints gesture data
        msk.on('gesture', (g) => {
          let randomDirection = direction[`${Math.floor(Math.random() * 3)}`]
          if (g === randomDirection){
            count++
            console.log(`
            Nice! you selected, ${randomDirection} correctly!
            ${5 - count} to go
            `)
          } else {
            console.log(`Sorry, ${randomDirection} was the correct direction. Keep trying!`)
          }
        });
      }
    })
}