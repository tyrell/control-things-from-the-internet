# Uncomment below for local testing
FROM node:argon

# Uncomment below and remove above for Raspberry Pi
# FROM resin/raspberrypi-node

MAINTAINER tyrell
 
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY driver/things-driver.js /usr/src/app

# Run the app
RUN npm start
