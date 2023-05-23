
import { MutableRefObject, useEffect, useRef, useState, ReactNode, FC } from "react";

type resizerProps = {
    children: ReactNode

}

const Resizer: FC<resizerProps> = ({ children }) => {
    const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const refLeft: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const refRight: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const refBottom: MutableRefObject<HTMLDivElement | null> = useRef(null);
    useEffect(() => {
        const resizeableElement = ref.current;
        if (!resizeableElement) return
        const styles = window.getComputedStyle(resizeableElement);
        let width = parseInt(styles.width, 10);
        let height = parseInt(styles.height, 10);
        let x = 0;
        let y = 0;

        // Right resize
        const onMouseMoveRightResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            x = event.clientX;
            width = width + dx;
            if (width >= 425) {
                resizeableElement.style.width = `${width}px`;
            }
        };

        const onMouseUpRightResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveRightResize);
        };

        const onMouseDownRightResize = (event: MouseEvent) => {
            x = event.clientX;
            document.addEventListener("mousemove", onMouseMoveRightResize);
            document.addEventListener("mouseup", onMouseUpRightResize);
        };


        // Bottom resize
        const onMouseMoveBottomResize = (event: MouseEvent) => {

            const dy = event.clientY - y;
            console.log(dy, "dy")
            height = height + dy;
            y = event.clientY;
            console.log(y,"clienty")
            const element = document.querySelector("#resizer")
            const shotElement = document.querySelector("#shot")
            console.log(shotElement?.clientHeight,"height shot")
            const width = element?.clientWidth
            console.log(width)
            // if(width<425){
            //     const newH=shotElement?.clientHeight+100

            //     resizeableElement.style.height =`${newH}px`
            //     return
            // }
            // else{
                resizeableElement.style.height = `${height}px`;

            // }

            // const dx = event.clientX - x;
            // x = event.clientX;
            // width = width - dx;

        };

        const onMouseUpBottomResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveBottomResize);
        };

        const onMouseDownBottomResize = (event: MouseEvent) => {
            y = event.clientY;
            document.addEventListener("mousemove", onMouseMoveBottomResize);
            document.addEventListener("mouseup", onMouseUpBottomResize);
        };

        // Left resize
        const onMouseMoveLeftResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            x = event.clientX;
            width = width - dx;
            if (width >= 425) {
                resizeableElement.style.width = `${width}px`;
            }
        };

        const onMouseUpLeftResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveLeftResize);
        };

        const onMouseDownLeftResize = (event: MouseEvent) => {
            x = event.clientX;
            document.addEventListener("mousemove", onMouseMoveLeftResize);
            document.addEventListener("mouseup", onMouseUpLeftResize);
        };

        // Add mouse down event listener
        const resizerRight = refRight.current;
        resizerRight?.addEventListener("mousedown", onMouseDownRightResize);
        const resizerBottom = refBottom.current;
        resizerBottom?.addEventListener("mousedown", onMouseDownBottomResize);
        const resizerLeft = refLeft.current;
        resizerLeft?.addEventListener("mousedown", onMouseDownLeftResize);

        return () => {
            resizerRight?.removeEventListener("mousedown", onMouseDownRightResize);
            resizerBottom?.removeEventListener("mousedown", onMouseDownBottomResize);
            resizerLeft?.removeEventListener("mousedown", onMouseDownLeftResize);
        };
    }, []);


    return (
        <section id="resizer" className="relative bg-transparent rounded-md overflow-hidden   box-shadow select-none " ref={ref}>
            <div className="top-1/2 right-0 -translate-y-1/2 translate-x-1/2 cursor-ew-resize absolute flex items-center justify-center w-8 h-8 group pointer-events-auto" ref={refRight} >
                <div className="w-5 h-8 lg:w-2.5 lg:h-5 rounded bg-white group-hover:scale-150 transition-transform shadow-md">
                </div>
            </div>
            <div className="top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 cursor-ew-resize absolute flex items-center justify-center w-8 h-8 group pointer-events-auto" ref={refLeft}>
                <div className="w-5 h-8 lg:w-2.5 lg:h-5 rounded bg-white group-hover:scale-150 transition-transform shadow-md">
                </div>
            </div>
            <div className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize absolute flex items-center justify-center w-8 h-8 group pointer-events-auto" ref={refBottom}>
                <div className="w-8 h-5 lg:w-5 lg:h-2.5 rounded bg-white group-hover:scale-150 transition-transform shadow-md">
                </div>
            </div>
            {children}

        </section>


    );
}

export default Resizer