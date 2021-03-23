function round2(num: number): number {
  return Math.round(num * 100) / 100;
}

export function formatTime(time: number): string {
  let sec = round2(time % 60)
    .toString()
    .padStart(2, '0');
  let min = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');

  return `${min}:${sec}`;
}
