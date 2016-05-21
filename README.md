# Control 'Things' from the Internet
This is a Proof of Concept application, with a simple architecture for IoT use cases.

[![Video overview](https://img.youtube.com/vi/F-WoFkbe0uc/0.jpg)](https://youtu.be/F-WoFkbe0uc "Video overview")


## The Circuit (Things)
I used a really basic setup of 'things' that I want to control over the Internet.

The breadboard brings together the following ...

 1. An Arduino Uno 
 2. A Servo
 3. An LM35 temperature sensor
 4. An LED
 5. A Photoresistor
 
![Things circuit diagram](https://raw.githubusercontent.com/tyrell/control-things-from-the-internet/master/circuit/control-things-from-the-internet.png?token=AAvfoaqXHQMVUwF-9Udk3l76xka8WGh7ks5XQXsywA%3D%3D "Things circuit diagram")
 

## The Internet
A web UI controls the Servo and the on/off frequency of the LED. The UI also displays readings from the LM35 temperture sensor continuously. The progress bar displays readings from the photoresistor. Higher percentage indicates more light, vise versa.

![Demo Photo](https://raw.githubusercontent.com/tyrell/control-things-from-the-internet/master/circuit/demo-picture.png?token=AAvfoVpTcZUJIrivKJXv5XW9WqM2mEiJks5XQXtEwA%3D%3D "Demo Photo")


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
1. Install Docker on your raspberry pi (I have documented my work flow at https://gist.github.com/tyrell/2963c6b121f79096ee0008f5a47cf347)
2. docker run -dti --privileged tyrell/control-things-from-the-internet:rpi-latest

TIP: Head over to https://hub.docker.com/r/tyrell/control-things-from-the-internet to find the Docker repository for my images.

### Setup a cron job to restart the container after a reboot
1. sudo crontab -e
2. Add the following line to the file and save

`@reboot /bin/bash /<where-you-cloned-the-git-repo>/control-things-from-the-internet.sh 2> /<where-you-cloned-the-git-repo>/cron_errors.log`

## How to run as a Node-RED flow
1. Install Node-RED on your Raspberry Pi.
2. Setup the circuit and attach your Arduino to the Pi.
3. Go to http://<your-pi-ip-address>:1880 in a browser to view the Node-RED flow designer.
4. Copy and paste the flow definition from node-red/flows_raspberrypi.json file and deploy to Node-RED

I have a Node-RED docker image, with Johnny Five and Pubnub packaged in at https://hub.docker.com/r/tyrell/node-red-docker/ 

## References
1. http://www.instructables.com/id/Javascript-robotics-and-browser-based-Arduino-cont/ - This tutorial was the starting point for my experiment. I replaced the dependency on Socket.io with Pubnub. Instead of having to run a node server to host HTML, I hosted the UI in Firebase. This decouples my UI from the device drivers.
2. Pubnub - https://www.pubnub.com
3. Firebase - https://www.firebase.com
4. Resin.io - https://resin.io/ They have operationalised deployments in a way I find really interesting.


## License
Copyright (c) 2016 Tyrell Perera <tyrell.perera@gmail.com>
Licensed under the MIT license.
