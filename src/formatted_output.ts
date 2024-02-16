
var outputTarget: HTMLDivElement;

export function setTarget(target: HTMLDivElement) {
    outputTarget = target;
}

export function clearTarget(target: HTMLDivElement) {
    target.innerHTML = '';
}

export function put(str?: string) {
    str ? outputTarget.innerHTML += str : outputTarget.innerHTML += " ";
}

export function println(str?: string) {
    str ? outputTarget.innerHTML += `<p>${str}</p>` : outputTarget.innerHTML += "<p></p>";
}

export function red(std: string) {
    outputTarget.innerHTML += "<span style='color:red'>" + std + "</span>";
}

export function green(std: string) {
    outputTarget.innerHTML += "<span style='color:green'>" + std + "</span>";
}

