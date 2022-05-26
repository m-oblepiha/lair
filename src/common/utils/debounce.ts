const debounce = <T extends (...args: any[]) => any>(
  func: T,
  timeout: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
};

export { debounce };
