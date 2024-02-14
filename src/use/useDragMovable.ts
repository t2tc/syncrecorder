export function useDragMovable(handler: HTMLElement, body: HTMLElement): () => void {
    let isDown = false;
    let startX: number;
    let startY: number;
    let startLeft: number;
    let startTop: number;
    
    handler.addEventListener('pointerdown', (e) => {
        isDown = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = body.offsetLeft;
        startTop = body.offsetTop;
    });
    
    document.addEventListener('pointerup', (e) => {
        handler.releasePointerCapture(e.pointerId);
        isDown = false;
    });
    
    document.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        handler.setPointerCapture(e.pointerId);
        const moveX = e.clientX - startX;
        const moveY = e.clientY - startY;
        body.style.left = `${startLeft + moveX}px`;
        body.style.top = `${startTop + moveY}px`;
    });

    return () => {
        handler.removeEventListener('pointerdown', () => {});
        document.removeEventListener('pointerup', () => {});
        document.removeEventListener('pointermove', () => {});
    }
}