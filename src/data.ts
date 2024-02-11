
class Resource {
    guid: string
    type: 'metadata' | 'audio-clip' | 'unknown'
    loaded: boolean
    reference: WeakRef<any> | null

    constructor() {
        this.guid = crypto.randomUUID();
        this.type = 'unknown';
        this.loaded = false;
        this.reference = null
    }
}

type Automation = {
    time: number,
    value: number
}[]

type Clip = {
    source: Resource,
    level: number,
    start: number,
    end: number,
    fadeIn: number,
    fadeOut: number,
}

function CutClip(clip: Clip, at: number): [Clip, Clip] {
    return [
        {
            level: clip.level,
            source: clip.source,
            start: clip.start,
            end: at,
            fadeIn: clip.fadeIn,
            fadeOut: 0,
        }, {
            level: clip.level,
            source: clip.source,
            start: at,
            end: clip.end,
            fadeIn: 0,
            fadeOut: clip.fadeOut,
        }
    ]
}