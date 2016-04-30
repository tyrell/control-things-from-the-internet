/**
 * A Node.js application that acts as a driver for devices attached to the
 * application.Southbound control is through Johnny-Five, a really good
 * interfacing framework for Arduino. Northbound control is through Pubnub, a
 * light weight Internet hosted pub-sub messaging platform.
 * 
 * The Arduino board need to be directly attached to the host running this
 * application. The host can be a laptop or a Raspberry Pi.The host must be
 * connected to the Internet.
 * 
 * @author Tyrell Perera (tyrell.perera@gmail.com)
 * 
 */
var five = require("johnny-five");
var board = new five.Board();
var pubnub = require("pubnub")({
	ssl : true,
	publish_key : "pub-c-63712152-b811-477f-befb-b835715bbeca",
	subscribe_key : "sub-c-2e5abf04-0869-11e6-a6c8-0619f8945a4f"
});

/**
 * Don't die on uncaught exceptions. Such as the Arduino getting unplugged.
 */
process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});

/**
 * This event is triggered by johnny-five when the Arduino board is ready for
 * communication with the host.
 * 
 */
board.on("ready", function() {

	console.log("Starting up ... ");

	/*
	 * Initialise Servo and listen to messages from the servo_channel.
	 * 
	 * The agreed message format within the channel is { "action": "turn",
	 * "angle": 180 }
	 */
	var servo = new five.Servo({
		id : "MyServo",
		pin : 6,
		type : "standard",
		range : [ 0, 180 ],
		fps : 100,
		invert : false,
		startAt : 0,
		center : true,
		specs : {
			speed : five.Servo.Continuous.speeds["@5.0V"]
		}
	});

	console.log("Subscribing to servo_channel");
	pubnub.subscribe({
		channel : "servo_channel",
		callback : function(message) {
			console.log("Message >>", message);
			try {

				// Stop whatever the servo is doing at the moment.
				servo.stop();

				if (message.action == 'turn') {
					servo.to(message.angle);
				}

				if (message.action == 'sweep') {
					servo.sweep();
				}

			} catch (e) {
				console.log("Error: ", e);
			}

		}
	});

	/*
	 * Initialise Thermometer.
	 * 
	 * When the sensor emits data, publish to the sensor message channel.
	 * 
	 * The agreed message format is { "data" : " XX°C, YYY°F" }
	 */
	var thermometer = new five.Thermometer({
		pin : "A0",
		controler : "LM35",
		freq : 2000
	});

	thermometer.on("data", function() {
		console.log("Thermometer : " + this.celsius + "°C", this.fahrenheit
				+ "°F");

		var message = {
			"data" : this.celsius + "°C, " + this.fahrenheit + "°F"
		};
		pubnub.publish({
			channel : 'thermometer_channel',
			message : message,
			error : function(e) {
				console.log("Failed to publish sensor data.", e);
			}
		});
	});

	/*
	 * Initialise Photoresistor.
	 * 
	 * When the sensor emits data, publish to the sensor message channel.
	 * 
	 * The agreed message format is { "data" : 0000 }
	 */
	var photoresistor = new five.Sensor({
		pin : "A2",
		freq : 2000
	});

	photoresistor.on("data", function() {
		console.log("Photoresistor : " + this.value);

		var message = {
			"data" : this.value
		};
		pubnub.publish({
			channel : 'photoresistor_channel',
			message : message,
			error : function(e) {
				console.log("Failed to publish sensor data.", e);
			}
		});
	});

	/*
	 * Initialise the LED on pin 13, default strobe every 1000ms.
	 * 
	 * Listen to the messages from the led_channel. The agreed message format
	 * within the channel is { "action": "led","delay": 1000 }
	 */
	var led = new five.Led(13).strobe(1000);

	console.log("Subscribing to led_channel");
	pubnub.subscribe({
		channel : "led_channel",
		callback : function(message) {
			console.log("Message >>", message);
			try {

				if (board.isReady) {
					led.strobe(message.delay);
				}

			} catch (e) {
				console.log("Error: ", e);
			}

		}
	});
});