import * as htmlToImage from 'html-to-image';
import toast from 'react-hot-toast';

export default function downloadImage() {
    const shotElement = document.querySelector('#shot');
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    if (!shotElement) return
    const toastId = toast.loading("Downloading...")
    htmlToImage.toPng(shotElement as HTMLElement)
        .then(function (dataUrl) {
            // const proxiedUrl = proxyUrl + dataUrl;
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = "new-shot-" + Date.now() + '.png';
            link.click();
            toast.success('Downloaded successfully');
            toast.dismiss(toastId)
        }).catch(function (error) {
            toast.error('Failed to convert HTML to image');
            toast.dismiss(toastId)
            console.error('Failed to convert HTML to image:', error);
        });;
}
// export default function downloadImage() {
//     const shotElement = document.querySelector('#shot');
//     if (!shotElement) return;

//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');

//     const image = new Image();
//     image.crossOrigin = 'anonymous';

//     image.onload = function () {
//         canvas.width = image.width;
//         canvas.height = image.height;
//         context?.drawImage(image, 0, 0);

//         const dataUrl = canvas.toDataURL('image/png');

//         const link = document.createElement('a');
//         link.download = 'new-shot-' + Date.now() + '.png';
//         link.href = dataUrl;
//         link.click();

//         toast.success('Downloaded successfully');
//         toast.dismiss(toastId);
//     };

//     image.onerror = function () {
//         toast.error('Failed to download image');
//         toast.dismiss(toastId);
//     };

//     image.src = 'https://example.com/path/to/image.png';
// }


// export async function toCanvas<T extends HTMLElement>(
//     node: T,
//     options: Options = {},
// ): Promise<HTMLCanvasElement> {
//     const { width, height } = getImageSize(node, options)
//     const svg = await toSvg(node, options)
//     const img = await createImage(svg)

//     const canvas = document.createElement('canvas')
//     const context = canvas.getContext('2d')!
//     const ratio = options.pixelRatio || getPixelRatio()
//     const canvasWidth = options.canvasWidth || width
//     const canvasHeight = options.canvasHeight || height

//     canvas.width = canvasWidth * ratio
//     canvas.height = canvasHeight * ratio

//     if (!options.skipAutoScale) {
//         checkCanvasDimensions(canvas)
//     }
//     canvas.style.width = `${canvasWidth}`
//     canvas.style.height = `${canvasHeight}`

//     if (options.backgroundColor) {
//         context.fillStyle = options.backgroundColor
//         context.fillRect(0, 0, canvas.width, canvas.height)
//     }

//     context.drawImage(img, 0, 0, canvas.width, canvas.height)

//     return canvas
// }