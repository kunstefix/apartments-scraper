# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install TypeScript and ts-node globally
RUN npm i -g typescript ts-node

# Install dependencies
RUN npm i

# Copy the rest of the Express API server code to the container
COPY . .

# Expose the port that your Express API server will listen on
EXPOSE 3000

# Define the command to run your Express API server
CMD ["npm", "run", "start"]