FROM --platform=linux/arm64 node:22-alpine@sha256:42c19d60d8df0a9eaff90a0598bb575bd1dc9511b55c1d77930e4684b0774a16 AS builder

WORKDIR /app

RUN corepack enable

COPY .yarn ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY /src ./src

RUN yarn install
RUN yarn build

# 'yarn install --production' does not prune test packages which are necessary
# to build the app. So delete nod_modules and reinstall only production packages.
RUN [ "rm", "-rf", "node_modules" ]
RUN yarn install --production --frozen-lockfile

FROM --platform=linux/arm64 node:22-alpine@sha256:42c19d60d8df0a9eaff90a0598bb575bd1dc9511b55c1d77930e4684b0774a16 AS final

RUN corepack enable
RUN apk add --no-cache curl tini

WORKDIR /app

# Copy in compile assets and deps from build container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/src ./src

# Add in dynatrace layer
# COPY --from=khw46367.live.dynatrace.com/linux/oneagent-codemodules-musl:nodejs / /
# ENV LD_PRELOAD=/opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so

ENV PORT=8080
EXPOSE $PORT

ENTRYPOINT ["tini", "--"]

CMD ["yarn", "start"]
