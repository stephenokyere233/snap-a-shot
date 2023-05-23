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