FROM node:latest
ADD . /app
WORKDIR /app
RUN ["npm", "install"]
CMD ["npm", "start"]
EXPOSE 3000
