export default function percentile(/** @type {ArrayLike} */ sorted, /** @type {number} */ q) {
    const k = (sorted.length - 1) * q;
    const f = Math.floor(k);
    const c = Math.ceil(k);
    if (f === c) {
        return sorted[k];
    }
    const d0 = sorted[f] * (c - k);
    const d1 = sorted[c] * (k - f);
    return d0 + d1;
};