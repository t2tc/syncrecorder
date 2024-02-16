
var _currentDirectory: FileSystemDirectoryHandle | null = null;

async function mkdir(name: string) {
    return await _currentDirectory!.getDirectoryHandle(name, { create: true });
}

async function cd(name: string) {
    _currentDirectory = await _currentDirectory!.getDirectoryHandle(name);
}


async function createJSON(name: string) {
    const root = await navigator.storage.getDirectory();
    const file = await root.getFileHandle(`${name}.json`, { create: true });
    return file;
}

async function readJSON<T>(file: FileSystemFileHandle) {
    const contents = await file.getFile();
    const text = await contents.text();
    return JSON.parse(text) as T;
}

async function writeJSON(file: FileSystemFileHandle, data: any) {
    const writable = await file.createWritable({ keepExistingData: false });
    await writable.write(JSON.stringify(data));
    await writable.close();
}

export { createJSON, readJSON, writeJSON }
