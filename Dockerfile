FROM node:17.3.0-alpine

# install packages
RUN npm install -g serve nodemon

# change workdir
WORKDIR /app

ARG API_URL
ENV REACT_APP_API_URL=$API_URL

# copy files
COPY . .

# install and build
RUN npm i
RUN npm run build
