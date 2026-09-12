export type Currency = 'XAF' | 'USD' | 'EUR';

export const formatCurrency = (amountXAF: number, currency: Currency = 'XAF'): string => {
  if (currency === 'USD') {
    const usd = amountXAF / 600;
    return `$${usd.toFixed(2)}`;
  }
  if (currency === 'EUR') {
    const eur = amountXAF / 655.957;
    return `€${eur.toFixed(2)}`;
  }
  return `${amountXAF.toLocaleString('fr-FR')} FCFA`;
};
