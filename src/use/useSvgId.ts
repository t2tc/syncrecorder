
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getId() {
  return Array.from({ length: 8 })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join('');
}

export function useSvgId(arg: string = "") {
    return `${arg}-${getId()}`;
}
