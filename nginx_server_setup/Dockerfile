FROM node:alpine
WORKDIR /usr/src/app
ADD ../package*.json .
RUN npm install
ADD . .
RUN npm install pm2 -g
EXPOSE 8080
ENTRYPOINT pm2 start && tail -f /dev/null