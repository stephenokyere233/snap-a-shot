import * as htmlToImage from 'html-to-image';
import toast from 'react-hot-toast';

export default function downloadImage() {
    const shotElement = document.querySelector('#shot');
    if (!shotElement) return
    const toastId = toast.loading("Downloading...")
    htmlToImage.toPng(shotElement as HTMLElement)
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = "new-shot-" + Date.now() + '.png';
            link.href = dataUrl;
            link.click();
            toast.success('Downloaded successfully');
            toast.dismiss(toastId)
        });
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
