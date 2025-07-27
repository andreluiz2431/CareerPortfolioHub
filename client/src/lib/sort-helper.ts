export const sortByPeriod = (a: { period?: string }, b: { period?: string }) => {
  const getDate = (period: string) => {
    if (period.toLowerCase() === 'present') {
      return new Date();
    }
    const year = parseInt(period.split('/')[1], 10);
    const month = parseInt(period.split('/')[0], 10) - 1;
    return new Date(year, month);
  };

  const dateA = a.period ? getDate(a.period) : new Date(0);
  const dateB = b.period ? getDate(b.period) : new Date(0);

  return dateB.getTime() - dateA.getTime();
};