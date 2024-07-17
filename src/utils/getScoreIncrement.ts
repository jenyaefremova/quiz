export const getScoreIncrement = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 3;
    case 'hard':
      return 5;
    default:
      return 0;
  }
};