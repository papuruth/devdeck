import { canvasPreview } from "./canvasPreview";

let previewUrl = "";

interface Crop {
    x: number;
    y: number;
    width: number;
    height: number;
}

function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
    return new Promise((resolve) => {
        canvas.toBlob(resolve);
    });
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(image: HTMLImageElement, crop: Crop, scale: number = 1, rotate: number = 0): Promise<string> {
    const canvas = document.createElement("canvas");
    canvasPreview(image, canvas, crop, scale, rotate);

    const blob = await toBlob(canvas);

    if (!blob) {
        console.error("Failed to create blob");
        return "";
    }

    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }

    previewUrl = URL.createObjectURL(blob);
    return previewUrl;
}
