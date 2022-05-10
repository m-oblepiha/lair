const readonlyArrayIncludes = <U extends T, T>(
  array: ReadonlyArray<U>,
  item: T
): item is U => array.includes(item as U);

export { readonlyArrayIncludes };
