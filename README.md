# Control 'Things' from the Internet
This is a Proof of Concept application, with a simple architecture for IoT use cases.

## The Circuit (Things)
I have used a basic setup of things that I want to control over the Internet is as below.

![Things circuit diagram](https://raw.githubusercontent.com/tyrell/control-things-from-the-internet/master/circuit/control-things-from-the-internet.png?token=AAvfodMHkvOna2BvsPavXx-LtCsFld16ks5XJCa1wA%3D%3D "Things circuit diagram")
 
The breadboard brings together the following ...
 1. An Arduino Uno 
 2. A Servo
 3. An LM35 temperature sensor
 4. An LED
 5. A Photoresistor
 
## The Internet
A web UI controls the Servo and the on/off frequency of the LED. The UI also displays readings from the LM35 temperture sensor continuously.

## How to run
1. Complete breadboard connections as illustrated.
2. Plug Arduino to the host computer via USB.
3. Install the Arduino IDE and load Standard Firmata.
4. Install Node.js along with Johnny-five and Pubnub npm modules. 
5. Run the driver (node things-driver.js).
6. Load index.html either directly in the web browser to test that everything communicates with each other. Once verified, host it on the Internet.

## References
1. http://www.instructables.com/id/Javascript-robotics-and-browser-based-Arduino-cont/ - This tutorial was the starting point for my experiment. I removed the dependency on socket.io with Pubnub, and having to run a node server, with Firebase.
2. Pubnub - https://www.pubnub.com
3. Firebase - https://www.firebase.com

## License
Copyright (c) 2016 Tyrell Perera <tyrell.perera@gmail.com>
Licensed under the MIT license.
