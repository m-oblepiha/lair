const selectBestChoice = <T extends { probability: number }[]>(
  choices: T
): typeof choices[number] | null => {
  const realChoices = choices.filter((choice) => choice.probability > 0);
  if (realChoices.length === 0) return null;
  return choices.reduce((prev, next) => {
    if (prev.probability > next.probability) return prev;
    else if (next.probability > prev.probability) return next;
    else return Math.random() > 0.5 ? prev : next;
  });
};

export { selectBestChoice };
