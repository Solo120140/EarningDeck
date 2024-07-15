# Use Alpine as the base image
FROM alpine:latest

# Install necessary packages
RUN apk update && apk add --no-cache \
    tor \
    python3 \
    py3-pip

# Install Python dependencies
RUN pip3 install requests stem

# Copy the torrc configuration file
COPY torrc /etc/tor/torrc

# Copy the Python script
COPY visit_link.py /visit_link.py

# Expose the Tor control port and Socks port
EXPOSE 9050 9051

# Start Tor and run the Python script
CMD tor & python3 /visit_link.py
