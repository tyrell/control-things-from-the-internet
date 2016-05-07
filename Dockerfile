FROM resin/rpi-raspbian:jessie

MAINTAINER tyrell

RUN echo "deb http://apt.adafruit.com/raspbian/ wheezy main" >> /etc/apt/sources.list && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --force-yes node && \
    apt-get clean
 
RUN npm install forever
RUN npm install johnny-five
RUN npm install pubnub

WORKDIR /driver

ENTRYPOINT ["node", "/driver/things-driver.js"]

COPY driver/things-driver.js /driver/
