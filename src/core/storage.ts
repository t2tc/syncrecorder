
/** Dump all OPFS data to a zip. */
async function dump() {
    const root = await navigator.storage.getDirectory();
    const stream = new CompressionStream("gzip");
    const writer = stream.writable.getWriter();
    
    for await (const file of root.entries()) {
        const reader = file.createReader();
        for await (const entry of reader.readEntries()) {
            const data = await entry.getFile();
            const blob = await data.slice();
            await writer.write(blob);
        }
    }

    await writer.close();
    return stream.readable;
}