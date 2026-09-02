FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:a66e5c877724ed04fe62a11152aab13627cbc69ad63c197a7ea44b47ec266924

ENV NODE_ENV production

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json .

CMD ["dist/index.js"]
