# Stage 1: Build
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the codebase into the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app
FROM nginx:alpine

# Copy built files from the previous stage to the NGINX HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow traffic to reach NGINX
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
