# Base image
FROM node:17.3.0-alpine AS builder

# Set working directory
WORKDIR /build

# Copy source files
COPY . .

# install and prepare lerna
RUN npm install
RUN npx lerna bootstrap

# build
RUN npm run build


# Base image for the production environment
FROM node:17.3.0-alpine

# Install global scripts
RUN npm install -g serve

# Set working directory
WORKDIR /deploy

# Copy the built files
COPY --from=builder /build/package*.json /deploy/
COPY --from=builder /build/lerna.json /deploy/
COPY --from=builder /build/packages/api/dist /deploy/packages/api/dist
COPY --from=builder /build/packages/api/package.json /deploy/packages/api/
COPY --from=builder /build/packages/finapp/build /deploy/packages/finapp/build
COPY --from=builder /build/packages/finapp/package.json /deploy/packages/finapp/

RUN npm ci --only=production
RUN npm install -g nodemon

CMD ["npm", "run", "start"]
