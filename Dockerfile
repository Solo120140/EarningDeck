FROM node:18-alpine

ENV DEBIAN_FRONTEND=noninteractive

RUN apk update
RUN apk add nss chromium bash cups-libs dbus expat fontconfig gcc gdk-pixbuf glib gtk+3.0 nspr pango libstdc++ libx11 libxcb libxcomposite libxcursor libxdamage libxext libxfixes libxi libxrandr libxrender libxtst ca-certificates ttf-freefont chromium libx11-dev xdg-utils wget mesa-dev
WORKDIR /root
RUN npm install playwright
RUN npx playwright install chromium

COPY main.js /root/main.js

WORKDIR /root

CMD ["node", "main.js"]
