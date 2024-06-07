export const CalculateFileSize = (fSize: number) => {
    const fileSizes = ['byte', 'KB', 'MB', 'GB']

    if (fSize === null || fSize === undefined) {
        return null;
    }
    let tmp = fSize;
    let size = 0;

    while (tmp >= 1024) {
        tmp /= 1024;
        size++;
    }

    return `${tmp.toFixed(1)} ${fileSizes[size]}`
}