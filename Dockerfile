# Stage 1: Build the React application
FROM node:18-alpine AS build-stage

WORKDIR /app

# Set environment variables for the build process
ENV NODE_ENV=production
ENV REACT_APP_HOST=""
ENV REACT_APP_GUEST_LOGIN=kartikey@example.com
ENV REACT_APP_GUEST_PASSWORD=learnreact
# Add any other REACT_APP_ variables needed during build here

# Copy package files
# Make sure package-lock.json exists and is committed to your repo!
COPY package.json package-lock.json* ./

# Install dependencies using npm install (used instead of ci due to prior issues)
# This is where react-scripts should get installed into node_modules/.bin
RUN npm install 

# Copy the rest of the application source code AFTER installing dependencies
COPY . .

# Build the React app - react-scripts should now be found
RUN npm run build 

# Stage 2: Setup the production environment
FROM node:18-alpine AS production-stage

WORKDIR /app

# Set environment variables for runtime (PORT will be injected by Render)
ENV NODE_ENV=production
# ENV PORT=10000 # Render injects this

# Copy package files
COPY package.json package-lock.json* ./

# Install *only* production dependencies
# Note: json-server and json-server-auth MUST be in "dependencies" in package.json
RUN npm install --only=production 

# Copy the built React app from the build stage
COPY --from=build-stage /app/build ./build 

# Copy the data files needed by json-server
COPY --from=build-stage /app/data ./data 

# Expose the port the json-server will run on (Render uses this)
EXPOSE ${PORT:-10000} 

# The command to run json-server serving static files (using the updated npm start script)
CMD ["npm", "start"] 