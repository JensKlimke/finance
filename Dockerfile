FROM node:17.3.0-alpine

# install packages
RUN npm install -g serve nodemon

# change workdir
WORKDIR /app

ARG API_URL
ARG COMMIT_ID
ARG HEAD_REF
ARG SESSION_STORAGE_KEY

ENV REACT_APP_API_URL=$API_URL
ENV REACT_APP_COMMIT_ID=$COMMIT_ID
ENV REACT_APP_HEAD_REF=$HEAD_REF
ENV REACT_APP_SESSION_STORAGE_KEY=$SESSION_STORAGE_KEY

# copy files
COPY . .

# install and build
RUN npm i
RUN npm run build
