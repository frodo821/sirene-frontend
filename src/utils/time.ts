function round2(num: number): number {
  return Math.round(num * 100) / 100;
}

export function formatTime(time: number): string {
  const [secN, secF] = round2(time % 60)
    .toString()
    .split('.');
  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');

  const sec = `${secN.padStart(2, '0')}.${secF.padEnd(2, '0')}`;

  return `${min}:${sec}`;
}
