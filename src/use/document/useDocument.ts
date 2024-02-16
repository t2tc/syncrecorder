/// This is the document model of SyncRecorder projects.

import { useStorage } from "@vueuse/core";
import { reactive, ref } from "vue";

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
    color: string,
    muted: boolean,
    solo: boolean,
    soloIsolate: boolean,
    record: boolean,
    volume: number,
    pan: number,
}

export type TrackContent = {
    name: string,
    settings: TrackSettings,
    clips: Clip[]
};

const mockTracks: Array<TrackContent> = reactive([
    {
        name: "Track 1",
        settings: { color: "red", muted: false, solo: false, record: false, volume: 0, pan: 3, soloIsolate: false },
        clips: []
    },{
        name: "Track 2",
        settings: { color: "green", muted: false, solo: false, record: false, volume: 0, pan: 0, soloIsolate: false },
        clips: []
    },{
        name: "Track 3",
        settings: { color: "blue", muted: false, solo: false, record: false, volume: 0, pan: -3, soloIsolate: false },
        clips: []
    },{
        name: "Track 4",
        settings: { color: "yellow", muted: false, solo: false, record: false, volume: 0, pan: 0, soloIsolate: false },
        clips: []
    }]
);

const mockMetaData: MetaData = {
    title: "Untitled",
    version: "1.0.0",
    author: "Anonymous",
    totalLength: 0,
    lastModified: Date.now(),
    created: Date.now(),
    size: 0,
    trackCount: 0,
    sliceCount: 0,
}

export function useDocument() {
    const tracks = useStorage("tracks", mockTracks);
    const metadata = useStorage("metadata", mockMetaData);

    return { tracks, metadata };
}

function updateMetaData() {
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



