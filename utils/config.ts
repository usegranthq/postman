const config = {
  get: (key: string): string => {
    return process.env[key] ?? '';
  },
  getInt: (key: string): number => {
    return parseInt(process.env[key] ?? '0');
  },
};

export default config;
