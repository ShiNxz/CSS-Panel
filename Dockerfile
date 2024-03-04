# Use an official Node runtime as the base image
FROM node:20 AS base

# Set the working directory in the container to /app
WORKDIR /app

# Install curl, bash, git
RUN apt-get update && apt-get install -y curl bash git

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if available) to the working directory
COPY package.json pnpm-lock.yaml* ./

# Install project dependencies
RUN pnpm install --frozen-lockfile

# Copy the current directory contents into the container at /app
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Create a group and user
RUN groupadd -r nodejs && useradd -r -g nodejs nextjs

# Change to non-root privilege
USER nextjs

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["node", "server.js"]