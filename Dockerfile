FROM resin/raspberrypi-node

MAINTAINER Tyrell Perera
 
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY driver/things-driver.js /usr/src/app

# Add our crontab file
COPY driver/things-driver-cron.conf /root/crons.conf

# Use the crontab file
RUN crontab /root/things-driver-cron.conf

# Start cron
RUN cron
