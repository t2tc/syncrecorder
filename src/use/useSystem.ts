
export function useSystem(): 'windows' | 'darwin' | 'unknown' {
    if(navigator.userAgent.includes('Win')) return 'windows';
    if(navigator.userAgent.includes('Mac')) return 'darwin';
    return 'unknown';
}