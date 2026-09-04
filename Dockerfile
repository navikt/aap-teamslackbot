FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:f0d620e8a9ba49c5693d3f31871f652dbcf19d8ac08de6c38737983722338f81

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/index.js"]
