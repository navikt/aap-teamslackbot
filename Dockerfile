FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:efe5ba4cb72abd4cdacf0d8c0997a3f56a003be40ada8a865afe75bbbdaee1e6

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/index.js"]
