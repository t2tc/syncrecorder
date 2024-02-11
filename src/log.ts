
export enum LogLevel {
  VERBOSE = 1,
  INFO,
  WARN,
  ERROR,
}

let GLOBAL_LOG_LEVEL = LogLevel.VERBOSE;

export function log(content: string, level: LogLevel) {
    if (level >= GLOBAL_LOG_LEVEL) {
        console.log(content);
    }
}