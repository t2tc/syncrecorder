
import { ref } from "vue";
const statusBarContent = ref("Ready.")

export function useStatusBar(): [() => string, (content: string) => void] {
    const get = () => statusBarContent.value;
    const set = (content: string) => statusBarContent.value = content;
    return [get, set];
}
