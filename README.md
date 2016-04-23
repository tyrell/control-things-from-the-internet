# Control things from the Internet
This is a Proof of Concept application, with a simple architecture for IoT use cases.

## The Circuit (Things)
I have used a basic setup of things that I want to control over the Internet is as below.

![Things circuit diagram](https://raw.githubusercontent.com/tyrell/control-things-from-the-internet/master/circuit/control-things-from-the-internet.png "Things circuit diagram")
 
The breadboard brings together the following ...
 1. An Arduino Uno 
 2. A Servo
 3. An LM35 temperature sensor
 4. An LED
 
## The Internet
A web UI controls the Servo and the on/off frequency of the LED. The UI also displays readings from the LM35 temperture sensor continuously.