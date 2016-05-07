FROM resin/rpi-raspbian:jessie

MAINTAINER tyrell

# Install Node.js
RUN echo "deb http://apt.adafruit.com/raspbian/ wheezy main" >> /etc/apt/sources.list && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --force-yes node && \
    apt-get clean
 
# Install our app dependencies
RUN npm install forever
RUN npm install johnny-five
RUN npm install pubnub

WORKDIR /driver

ENTRYPOINT ["node", "/driver/things-driver.js"]

COPY things-driver.js /driver/

# Add our crontab file
ADD things-driver-cron.conf /root/crons.conf

# Use the crontab file
RUN crontab /root/things-driver-cron.conf

# Start cron
RUN cron
