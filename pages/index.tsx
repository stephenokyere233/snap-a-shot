import Image from "next/image";
import { BiMoon, BiCamera } from "react-icons/bi"
import { ChangeEvent, FormEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import { FiHeart } from "react-icons/fi"
import { FaCommentDots } from "react-icons/fa"
import domtoimage from 'dom-to-image';
import Balancer from 'react-wrap-balancer'

export default function Home() {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const refLeft: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const refRight: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const refBottom: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [link, setLink] = useState<string>("")
  const [user, setUser] = useState<any>(null)
  const [thread, setThread] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [threadID, setThreadID] = useState<string | null>(null)
  const [isValidLink, setIsValidLink] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>("")

  const fetchThreadOwner = (username: string) => {
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://beta-cache.showwcase.com/user/' + username,
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setUser(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const fetchThread = (threadID: string) => {
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://beta-cache.showwcase.com/threads/' + threadID,
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      fetchThreadOwner(response.data.user.username)
      setThread(response.data)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
      setLoading(false)
    });

  }


  const checkValidity = async (link: string | null) => {
    if (!link) return
    console.log(link)
    if (link.includes("https://beta.showwcase.com/thread/")) {
      const linkArray = link.split("https://beta.showwcase.com/thread/")
      setIsValidLink(true)
      const newThreadID = linkArray[1]
      setThreadID(newThreadID)
      console.log("valid link")

    }
    else {
      setIsValidLink(false)
      console.log(false)
    }
  }


  const handleChange = (event: any) => {
    checkValidity(event.target.value)
    setLink(event.target.value)

  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!link) {
      setError(true)
      console.log(threadID)
      setErrorMessage("fill the form")
      return
    }

    if (!isValidLink) {
      setError(true)
      setErrorMessage("invalid showwcase link")
    }
    else {
      fetchThread(threadID as string)
      setError(false)
      setErrorMessage(null)
    }

  }

  const save = () => {
    const qrCodeElement = document.querySelector('#qr');
    if (!qrCodeElement) return
    domtoimage.toJpeg(qrCodeElement, { quality: 1.0 })
      .then(function (dataUrl: any) {
        var link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      });
  }


  const ControlBox = () => {
    return (
      <div className="absolute bottom-10 rounded-md w-[400px] h-20 border">


      </div>
    )

  }
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
      resizeableElement.style.left = styles.left;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };


    // Bottom resize
    const onMouseMoveBottomResize = (event: MouseEvent) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event: MouseEvent) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.top = styles.top;
      // resizeableElement.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event: MouseEvent) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event: MouseEvent) => {
      x = event.clientX;
      resizeableElement.style.right = styles.right;
      // resizeableElement.style.left = null;
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
    <div className="min-h-screen w-full bg-[#2221] text-[#222] flex flex-col">
      <header className="flex items-center justify-between p-4 px-10">
        <h1 className="font-bold text-xl flex items-center gap-2">
          <BiCamera size={32} color="blue" />
          SNAP-A-SHOT</h1>
        <form onSubmit={handleSubmit}>
          <input className="w-[400px] indent-4 p-3 outline-none border-2 rounded-lg bg-transparent" type="text" placeholder="Paste Showwcase thread link here" value={link} onChange={handleChange} />
          {
            error &&
            <p className="text-red-500 text-center capitalize">{errorMessage}</p>
          }
        </form>
        <div><BiMoon size={28} /></div>
      </header>
      <main className="flex-1 border flex flex-col justify-center items-center overflow-y-scroll">
        <section id="qr" className="border relative p-20 bg-blue-400 rounded-md overflow-hidden flex justify-center items-center  box-shadow select-none " ref={ref}>
          <div className="top-1/2 right-0 -translate-y-1/2 translate-x-1/2 cursor-ew-resize absolute flex items-center justify-center w-8 h-8 group pointer-events-auto" ref={refRight} >
            <div className="w-5 h-8 lg:w-2.5 lg:h-5 rounded bg-red-400 group-hover:scale-150 transition-transform shadow-md">
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
          <div className={`border w-[400px] min-w-[320px] max-w-[650px] p-6  bg-white rounded-md relative ${loading ? "flex items-center justify-center" : ""}`}>
            <Image src="/showwcase.svg" alt="showwcase" width={200} height={200} className="w-12 rounded-full h-12 object-cover top-0 m-2 absolute right-0" />
            {
              loading ? <Loader /> : (<>
                <div className="flex items-center gap-2 pb-2">
                  <Image src={user ? user.profilePictureUrl : "/showwcase.svg"} className="w-16 rounded-full h-16 object-cover" alt="user_profile" width={200} height={200} />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold">{user ? (<>
                      {user.displayName}<span>{user.activity.emoji}</span></>) : "Username"}
                    </h2>{
                      user &&
                      <span className="opacity-70">
                        @{user.username}
                      </span>
                    }
                  </div>
                </div>
                <p className="">
                  {
                    thread ? thread.message : "A social platform for remote workers: With the increase in remote work, there is a need for social platforms that cater to remote workers. A platform that allows remote workers to connect, share experiences, and even organize remote work events could be a great project."
                  }
                </p>
                {
                  thread &&
                  (<div className="flex justify-end pt-2 text-lg items-center gap-2">
                    <div className="flex items-center gap-2"><FiHeart color="red" />{thread.totalUpvotes}</div>
                    <div className="flex items-center gap-2"><FaCommentDots />{thread.totalReplies}</div>
                  </div>)
                }

              </>

              )
            }
          </div>
        </section>
        <button onClick={save}>domtoimage</button>
      </main>
      <footer className="h-16 flex items-center justify-center">
        <p>
          &copy;Copyright 2023 @dev__steve
        </p>
      </footer>
    </div>
  );
}
