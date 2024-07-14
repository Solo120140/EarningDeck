# Use the official lightweight Python image based on Alpine Linux
FROM python:3.9-alpine

# Set environment variables to avoid any issues with debconf
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages
RUN apk update && \
    apk add --no-cache \
    bash \
    wget \
    unzip \
    curl \
    chromium \
    chromium-chromedriver

# Install Python dependencies
RUN pip3 install selenium webdriver-manager

# Copy the script into the container
COPY main.py /app/main.py

# Set the working directory
WORKDIR /app

# Run the script
CMD ["python3", "main.py"]
