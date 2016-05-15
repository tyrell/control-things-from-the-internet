#!/bin/bash

# This is a script to start our docker after a reboot.

# Make sure the docker daemon has started
sudo /usr/sbin/service docker start

# start the container
sudo /usr/bin/docker run -dti --privileged tyrell/control-things-from-the-internet:rpi-latest
