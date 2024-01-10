export const abbreviatedBalance = (balance: any) => {
    const THOUSAND = 1000;
    if (Math.abs(balance) >= THOUSAND) {
        const suffixes = ["", "k", "M", "B", "T"];
        const order = Math.floor(Math.log10(Math.abs(balance)) / 3);
        const shortValue = parseFloat((balance / Math.pow(THOUSAND, order)).toFixed(2));
        return shortValue + suffixes[order];
    }
    return balance.toString();
};