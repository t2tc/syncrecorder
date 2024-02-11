/// This is the document model of SyncRecorder projects.

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

export type MetaData = {
    title: string,
    version: string,
    author: string,
    totalLength: number,
    lastModified: number,
    created: number,
    size: number,
    trackCount: number,
    sliceCount: number, 
}

export type TrackSettings = {
    pan: number,
    volume: number,
    muted: boolean,
    solo: boolean,
    soloIsolate: boolean,
    record: boolean
};

export type TrackContent = {
    name: string,
    color: string,
    settings: TrackSettings,
    clips: Clip[]
};

function setMetaData(meta: MetaData) {
    const { title, version, author, totalLength, lastModified, created, size, trackCount, sliceCount } = meta;
    const metaString = JSON.stringify({ title, version, author, totalLength, lastModified, created, size, trackCount, sliceCount });
    localStorage.setItem("meta", metaString);
}

function getMetaData(): MetaData {
    const metaString = localStorage.getItem("meta");
    if (metaString) {
        return JSON.parse(metaString);
    } else {
        return {
            title: "Untitled",
            version: "1.0.0",
            author: "Anonymous",
            totalLength: 0,
            lastModified: Date.now(),
            created: Date.now(),
            size: 0,
            trackCount: 0,
            sliceCount: 0,
        };
    }
}

function getTrackCount(): number {
    return getMetaData().trackCount;
}



