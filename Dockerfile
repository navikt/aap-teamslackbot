FROM gcr.io/distroless/nodejs22-debian12:latest@sha256:b0df7917d86c254e76d0855775679d9ee4ec7c307503259d92f431b618393a4d

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/index.js"]
