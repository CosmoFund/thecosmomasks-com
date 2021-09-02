export default function getPowerBonus(last?: number | string): number {
  let PowerBonus = 1830;
  let lastClaim = 1615734000;
  if (last) {
    if (typeof last === 'string') {
      last = Math.floor(parseInt(last));
    } else {
      last = Math.floor(last);
    }

    if (last > 0) {
      lastClaim = last;
      PowerBonus = 0;
    }
  }

  PowerBonus = PowerBonus + ((Math.floor(Date.now() / 1000) - lastClaim) / 86400) * 10;
  return PowerBonus;
}
