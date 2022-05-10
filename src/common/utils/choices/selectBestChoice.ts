const selectBestChoice = <T extends { probability: number }[]>(
  choices: T
): typeof choices[number] | null => {
  const realChoices = choices.filter((choice) => choice.probability > 0);
  if (realChoices.length === 0) return null;
  return choices.reduce((prev, next) =>
    prev.probability > next.probability ? next : prev
  );
};

export { selectBestChoice };
