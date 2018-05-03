const isBefore = (list, candidate, comparison) => {
  const candidateIndex = list.indexOf(candidate);
  const comparisonIndex = list.indexOf(comparison);

  if (comparisonIndex < 0 || candidateIndex < 0) {
    return undefined;
  }

  return candidateIndex < comparisonIndex;
};

export default isBefore;
