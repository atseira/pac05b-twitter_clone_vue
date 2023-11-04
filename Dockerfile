# Dockerfile-frontend

# Use the official Node.js image from the DockerHub
FROM node:14 as build-stage

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json. This is done separately to leverage Docker cache
COPY package*.json ./

# Install all the dependencies
RUN npm install

# Copy the project files to our Docker image
COPY . .

# Build the application
RUN npm run build

# Serve the app using a minimal nginx image
FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
