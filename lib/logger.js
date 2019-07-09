const { createLogger, format, transports } = require("winston");
const { combine, errors, timestamp, splat, json } = format;

const logger = createLogger({
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json()
  ),
  transports: [
    new transports.Console({ level: "info" })
  ],
  exitOnError: false
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

module.exports = logger;