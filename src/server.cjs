const fs = require('node:fs');
const { logFile } = require('./logs.js');

const handleError = (err) => {
  fs.writeFileSync(logFile('err'), err.message);
  process.exit(1);
};

try {  
  const { createApp } = require('turborepo-remote-cache');

  const app = createApp({
    trustProxy: true,
    logger: {
      level: 'debug',
      stream: fs.createWriteStream(logFile('out')),
    },
  });

  app.listen({ host: process.env.HOST, port: process.env.PORT }, (err) => {
    if (err) {
      handleError(err);
    }
  });
} catch (err) {
  handleError(err);
}
