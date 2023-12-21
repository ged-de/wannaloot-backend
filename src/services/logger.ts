import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: "./logs/error.log", level: "error" }),
    new transports.File({ filename: "./logs/combined.log" })
  ]
});

// In development, also log to the console
if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}