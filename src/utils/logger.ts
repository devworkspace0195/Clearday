const IS_DEV = __DEV__;

const logger = {
  log: (message: string, ...args: unknown[]): void => {
    if (IS_DEV) {
      console.log(`[Clearday] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]): void => {
    if (IS_DEV) {
      console.warn(`[Clearday] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]): void => {
    if (IS_DEV) {
      console.error(`[Clearday] ${message}`, ...args);
    }
  },
};

export default logger;
