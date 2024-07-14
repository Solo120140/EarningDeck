FROM node:18-alpine

ENV DEBIAN_FRONTEND=noninteractive

RUN apk update
RUN apk add nss cups-libs dbus expat fontconfig gcc gdk-pixbuf glib gtk+3.0 nspr pango libstdc++ libx11 libxcb libxcomposite libxcursor libxdamage libxext libxfixes libxi libxrandr libxrender libxtst ca-certificates ttf-freefont chromium libx11-dev xdg-utils wget mesa-dev
RUN npm install playwright && \
   npx playwright install chrome

COPY main.js /app/main.js

WORKDIR /app

CMD ["node", "main.js"]
