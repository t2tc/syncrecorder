let __audioContext: AudioContext;

function createAudioContext() {
    __audioContext = new AudioContext({ latencyHint: 'interactive' });
}

function getAudioContext() {
    if (typeof __audioContext == 'undefined') createAudioContext();
    return __audioContext;
}

async function getMicrophones() {
    await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    return (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind == "audioinput");
}

async function createMicrophoneMediaStream(deviceId: string) {
    return await navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            deviceId: { exact: deviceId }
        },
        video: false
    })
}

function Play() {
    let playerNode = getAudioContext().createBufferSource();
    playerNode.connect(getAudioContext().destination);
}

function Render() {
    let offlineContext = new OfflineAudioContext({ numberOfChannels: 16, length: 120000, sampleRate: 48000 });
    offlineContext.oncomplete = (event) => {
        let buffer = event.renderedBuffer;
        let source = getAudioContext().createBufferSource();
        source.buffer = buffer;
        source.connect(getAudioContext().destination);
        source.start(0);
    }
}

function Pause() {

}

function createClip() {

}

class WebMEncoder {
    constructor() {

    }
    
}
