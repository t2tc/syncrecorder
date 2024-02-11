/// <reference types="vite/client" />

/// use `import vertShader form './vertShader.vert.glsl?raw' to import shader in vite.
declare module "*.glsl" {
    const value: string;
    export = value;
}
