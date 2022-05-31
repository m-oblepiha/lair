const clipToLimit = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const clipRelation = (value: number) => clipToLimit(value, -10, 10);

export { clipRelation, clipToLimit };
