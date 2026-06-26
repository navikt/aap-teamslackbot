FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:d32cd68e55eec26364b46179a74321d92871aeb223fbc46e2c8a854f709db11f

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/index.js"]
