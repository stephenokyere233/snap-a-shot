import * as htmlToImage from 'html-to-image';
import toast from 'react-hot-toast';

export default function copyImage() {
    const shotElement = document.querySelector('#shot') as HTMLElement | null;
    if (!shotElement) return;

    const canvasElement = document.createElement('canvas');
    const context = canvasElement.getContext('2d');

    if (!context) {
        console.error('Unable to create canvas context');
        return;
    }

    const toastId = toast.loading("Copying...");

    htmlToImage.toPng(shotElement)
        .then(function (dataUrl: string) {
            const imageElement = new Image();
            imageElement.onload = function () {
                canvasElement.width = imageElement.width;
                canvasElement.height = imageElement.height;
                context.drawImage(imageElement, 0, 0);
                canvasElement.toBlob(function (blob) {
                    if (!blob) {
                        console.error('Unable to create blob');
                        return;
                    }
                    const item = new ClipboardItem({ "image/png": blob });
                    navigator.clipboard.write([item]).then(function () {
                        toast.success('Saved to clipboard');
                        toast.dismiss(toastId);
                    }, function (err) {
                        toast.error('Error saving to clipboard: ', err);
                        toast.dismiss(toastId);
                    });
                });
            };
            imageElement.src = dataUrl;
        })
        .catch(function (error) {
            console.error('Error copying image:', error);
            toast.error('Error copying image:', error);
            toast.dismiss(toastId);
        });
};