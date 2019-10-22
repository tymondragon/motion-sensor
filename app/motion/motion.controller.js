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
    let count = 5;
      let msk = devices.find((device) => {
        return device instanceof MotionSensorKit;
      });
      if (!msk) {
        console.log('No Motion Sensor Kit was found :(');
      } else {
        console.log('Motion Sensor Kit found!');
        msk.setMode('gesture')
        .then(() => {
            console.log('Set to `gesture` mode. Try to see if you can guess which direction is correct. Move your hand up, down, left, or right.')
        });
        // Prints proximity data
        msk.on('proximity', (p) => {
          // Avoid printing `0` all the time
          if (p > 0) {
            console.log('Proximity value:', p)
          }
          if (p > 250) {
            count--
            console.log(`You got too close! You have ${count} more times before I switch on you`)
            if (count === 0) {
              console.log('Setting mode to `gesture`.')
              msk.setMode('gesture')
                .then(() => {
                  console.log('Set to `gesture` mode. Try to see if you can guess which direction is correct. Move your hand up, down, left, or right.')
                });
            }
          }
        });
        // Prints gesture data
        msk.on('gesture', (g) => {
          let directionOne = direction[`${Math.floor(Math.random() * 3)}`]
          let directionTwo = direction[`${Math.floor(Math.random() * 3)}`]
          if (directionOne === directionTwo) {
              msk.setMode('proximity')
                .then(() => {
                  count = 5;
                  console.log(`Winner Winner Chicken Dinner! ${directionOne} and ${directionTwo} matches!!!
                  Try to get as close as you can without getting too close. You have 5 tries.`)
                });
            
          } else {
            console.log(`No match on ${directionOne} and ${directionTwo}. Try Again!`)
          }
        });
      }
    })
}