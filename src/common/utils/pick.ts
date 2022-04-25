const pick = <T, U extends keyof T>(obj: T, keys: U[]): Pick<T, U> => {
  const result = Object.create(null);
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
};

export { pick };
