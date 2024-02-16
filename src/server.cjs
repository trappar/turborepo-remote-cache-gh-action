const { createApp } = require('turborepo-remote-cache');

console.log('Creating Turbo Cache Server...');
const app = createApp({trustProxy: true});

console.log(`Attempting to start listening for requests on ${process.env.HOST}:${process.env.PORT}...`);
app.listen({ host: process.env.HOST, port: process.env.PORT }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
