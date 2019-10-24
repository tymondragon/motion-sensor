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
        setProximity(msk)

        msk.on('proximity', (p) => {
          if (p > 0) {
            console.log('Proximity value:', p)
          }
          if (p > 250) {
            setGesture(msk)
          }
        });

        msk.on('gesture', (g) => {
          let randomDirection = direction[`${Math.floor(Math.random() * 3)}`]
          if (g === randomDirection) {
            console.log(`
            Nice! you selected, ${randomDirection} correctly! The game will restart in 3 seconds`)
            setTimeout(() => setProximity(msk), 3000)
            count = 0;
          } else {
            count++
            console.log(`Nuts!!! ${randomDirection} was the correct direction, you chose ${g}. Keep trying!`)
          }
          if (count === 3) {
            console.log(`Oooh, too bad that was your last guess!!! You chose ${g} but ${randomDirection} was the correct one. The game will start again in 3 seconds`)
            setTimeout(() => setProximity(msk), 3000)
            count = 0;
          }
        });
      }
    })
}

function setProximity(msk) {
  msk.setMode('proximity')
    .then(() => {
      console.log('Get 3 chances to guess the direction: Up, Down, Left, Right. To start the game lower your hand until the promity value is > than 250')
    });
}

function setGesture(msk) {
  msk.setMode('gesture')
    .then(() => {
      console.log('Let the games begin!!!')
    });
}