export default function getStatistics(array) {
    let n = 0;
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] < 0) {
            array[i] = 0;
        }
        else {
            total += array[i];
            n++;
        }
    }

    const mean = total / n
    const std = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    return { mean, std };
}