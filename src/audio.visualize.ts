
async function getSampledData(buffer: AudioBuffer, step: number) {
    const data = buffer.getChannelData(0);
    const len = data.length;
    const result = [];
    for (let i = 0; i < len; i += step) {
        result.push(data[i]);
    }
    return result;
}

export { getSampledData };