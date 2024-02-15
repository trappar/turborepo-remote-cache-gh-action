const { createApp } = require('turborepo-remote-cache');

const app = createApp({trustProxy: true});

app.listen({ host: process.env.HOST, port: process.env.PORT }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
