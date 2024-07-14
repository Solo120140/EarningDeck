# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set environment variables to avoid any issues with debconf
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages
RUN apt-get update
RUN apt-get install -y wget unzip curl gnupg --no-install-recommends
RUN apt-get clean
#RUN rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN  apt-get update
RUN apt-get install -y google-chrome-stable --no-install-recommendd
RUN apt-get clean
#rm -rf /var/lib/apt/lists/*

# Install ChromeDriver
RUN CHROMEDRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE)
RUN wget -N https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip -P /tmp
RUN unzip /tmp/chromedriver_linux64.zip -d /usr/local/bin/
RUN rm /tmp/chromedriver_linux64.zip

# Copy the script into the container
COPY automate_task.py /app/automate_task.py

# Install Python dependencies
RUN pip install selenium webdriver-manager

# Set the working directory
WORKDIR /app

# Run the script
CMD ["python3", "main.py"]
