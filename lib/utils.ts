export function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function dollarsToCents(value: number) {
  return Math.round(value * 100);
}

export function centsToDollars(cents: number) {
  return (cents / 100).toFixed(2);
}
