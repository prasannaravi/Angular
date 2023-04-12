FROM node:latest
WORKDIR C:\Users\Prasa\.jenkins\workspace\sample
COPY nodeapp/* /
RUN npm install
EXPOSE 3000
CMD [ "npm","start" ]
