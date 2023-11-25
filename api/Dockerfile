# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the Express API server code to the container
COPY . .

# Expose the port that your Express API server will listen on
EXPOSE 3000

# Define the command to run your Express API server
CMD ["node", "server.js"] 