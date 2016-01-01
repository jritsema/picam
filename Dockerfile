FROM jritsema/rpi-node-piuserland:4.2.4
EXPOSE 9000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN mkdir -p /usr/src/app/photos

CMD [ "npm", "start" ]
