export type Line = { amount: number };

function minorUnitDigits(currency: string): number {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
    .maximumFractionDigits as number;
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = minorUnitDigits(currency);
  const scale = 10 ** digits;
  const minor = lines.reduce((total, line) => total + Math.round(line.amount * scale), 0);
  const abs = Math.abs(minor);
  const whole = Math.floor(abs / scale);
  const fraction = String(abs % scale).padStart(digits, '0');
  const sign = minor < 0 ? '-' : '';
  return digits === 0 ? `${sign}${whole}` : `${sign}${whole}.${fraction}`;
}
