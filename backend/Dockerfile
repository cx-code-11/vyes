# Use Node.js LTS version as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Create the uploads directory
RUN mkdir -p uploads

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
