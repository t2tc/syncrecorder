/// SyncRecorder uses a responsive layout system based on window size and pixel density. this file shall be the 
/// single source of truth for all layout-related constants, and shall sync with TailwindCSS config. Since multiple
/// canvas elements are used, we need to make sure that the layout is consistent across all them while also the div
/// parts.

const baseSize = 4; // px

const titleBarHeight = 80;
const toolBarHeight = 80;
const trackHeaderDefaultHeight = 80;
const trackHeaderDraggerHeight = 24;

const statusBarHeight = 24;
