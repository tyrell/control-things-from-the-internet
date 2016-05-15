# Control 'Things' from the Internet
This is a Proof of Concept application, with a simple architecture for IoT use cases.

[![Video overview](https://img.youtube.com/vi/F-WoFkbe0uc/0.jpg)](https://youtu.be/F-WoFkbe0uc "Video overview")


## The Circuit (Things)
I used a basic setup of 'things' that I want to control over the Internet.

The breadboard brings together the following ...

 1. An Arduino Uno 
 2. A Servo
 3. An LM35 temperature sensor
 4. An LED
 5. A Photoresistor
 
![Things circuit diagram](https://raw.githubusercontent.com/tyrell/control-things-from-the-internet/master/circuit/control-things-from-the-internet.png?token=AAvfoXWbH1XVzK6YvDV0Z3DYLoNjNpc9ks5XOAvzwA%3D%3D "Things circuit diagram")
 

## The Internet
A web UI controls the Servo and the on/off frequency of the LED. The UI also displays readings from the LM35 temperture sensor continuously. The progress bar displays readings from the photoresistor. Higher percentage indicates more light, vise versa.

![Demo Photo](https://raw.githubusercontent.com/tyrell/control-things-from-the-internet/master/circuit/demo-picture.png?token=AAvfoRKTzsJ-6WAqpflyjB_hRAdjU-g0ks5XOAucwA%3D%3D "Demo Photo")


## How to run
1. Complete breadboard connections as illustrated.
2. Plug Arduino to the host computer via USB.
3. Install the Arduino IDE and load Standard Firmata.
4. Install Node.js  
5. clone git repository to your local machine.
6. npm install
7. npm start
6. Load index.html either directly in the web browser to test that everything communicates with each other. Once verified, host it on the Internet.

## How to run as a Docker container
1. Install Docker on your raspberry pi
2. docker run -ti --privileged tyrell/control-things-from-the-internet:rpi-latest

## Setup a cron job to restart the application after reboot
1. sudo crontab -e
2. Add the following line to the file and save

`@reboot /bin/bash /<where-you-cloned-the-git-repo>/control-things-from-the-internet.sh 2> /<where-you-cloned-the-git-repo>/cron_errors.log`

## References
1. http://www.instructables.com/id/Javascript-robotics-and-browser-based-Arduino-cont/ - This tutorial was the starting point for my experiment. I replaced the dependency on Socket.io with Pubnub. Instead of having to run a node server to host HTML, I hosted the UI in Firebase. This decouples my UI from the device drivers.
2. Pubnub - https://www.pubnub.com
3. Firebase - https://www.firebase.com


## License
Copyright (c) 2016 Tyrell Perera <tyrell.perera@gmail.com>
Licensed under the MIT license.
