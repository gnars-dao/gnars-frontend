export const abbreviatedBalance = (balance: any) => {
    if (Math.abs(balance) >= 1000) {
        const suffixes = ["", "k", "M", "B", "T"];
        const order = Math.floor(Math.log10(Math.abs(balance)) / 3);
        const shortValue = parseFloat((balance / Math.pow(1000, order)).toFixed(2));
        return shortValue + suffixes[order];
    }
    return balance.toString();
};
