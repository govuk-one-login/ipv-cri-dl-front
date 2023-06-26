#################
## WIP - to support pipeline tests
#################
FROM node:16.14.2-alpine3.15@sha256:38bc06c682ae1f89f4c06a5f40f7a07ae438ca437a2a04cf773e66960b2d75bc

RUN apk add openjdk11
RUN apk add curl
RUN apk add bash
RUN apk add mesa-gles
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && ./aws/install
RUN apk add chromium
RUN apk add chromium-angle
RUN apk add dbus-x11
RUN mkdir -p /var/run/dbus && dbus-daemon --config-file=/usr/share/dbus-1/system.conf --print-address

RUN mkdir -p /usr/src/app \
    && adduser -D chrome \
    && chown -R chrome:chrome /usr/src/app
# Run Chrome as non-privileged

COPY ../. /usr/src/app
RUN mv /usr/src/app/test/run-tests.sh /run-tests.sh

RUN rm -rf /usr/src/app/node_modules
RUN chown -R chrome:chrome /usr/src/app
USER chrome

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin/
RUN cd /usr/src/app && yarn install
RUN cd /usr/src/app && yarn build

ENTRYPOINT ["/run-tests.sh"]
