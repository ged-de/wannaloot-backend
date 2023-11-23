import { createLogger, format, transports } from "winston";

export const guruLogger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/guru_fetching.log" }),
  ],
});
