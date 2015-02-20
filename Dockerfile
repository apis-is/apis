FROM node:latest
ADD . /app
WORKDIR /app
CMD [ "npm", "start" ]
EXPOSE 3000
