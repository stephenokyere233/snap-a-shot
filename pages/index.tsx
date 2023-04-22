import Image from "next/image";
import { BiMoon, BiCamera } from "react-icons/bi"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import { FiHeart } from "react-icons/fi"
import { FaCommentDots, FaDownload, FaSearch } from "react-icons/fa"
import domtoimage from 'dom-to-image';
import Resizer from "@/components/Resizer";
import ThreadTemplate from "@/components/templates/ThreadTemplate";
import DummyTemplate from "@/components/templates/DummyTemplate";
import { AppContext } from "@/context";
import { IAppContext } from "@/interfaces";

export default function Home() {
  const [link, setLink] = useState<string>("")
  const [user, setUser] = useState<any>(null)
  const [thread, setThread] = useState<any>(null)
  const [tweetInfo, setTweetInfo] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [threadID, setThreadID] = useState<string | null>(null)
  const [isValidShowwcaseLink, setIsValidShowwcaseLink] = useState<boolean>(false)
  const [isValidTwitterLink, setIsValidTwitterLink] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>("")
  const [selectedPlatform, setSelectedPlatform] = useState<string>("showwcase")
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const { isShowwcaseDataFetched, setIsShowwcaseDataFetched, isTwitterDataFetched, setIsTwitterDataFetched, selectedBGColor, setSelectedBGColor
  } = useContext<IAppContext | null>(AppContext) as IAppContext
  const availablePlatForms = [
    "showwcase", "twitter"
  ]

  const LinksToCheck = [
    "https://www.showwcase.com/thread/", "https://twitter.com/"
  ]

  const fetchTwitterPost = async (twitterPostID: string) => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/fetchTweet?twitterPostID=${twitterPostID}`);
      console.log(response.data);
      setIsTwitterDataFetched(true)
      console.log(response.data)
      setTweetInfo(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error);
      setLoading(false)
    }
  }

  const fetchThreadOwner = (username: string) => {
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://cache.showwcase.com/user/' + username,
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
      url: 'https://cache.showwcase.com/threads/' + threadID,
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      fetchThreadOwner(response.data.user.username)
      setThread(response.data)
      setLoading(false)
      setIsShowwcaseDataFetched(true)
    }).catch(function (error) {
      console.error(error);
      setLoading(false)
    });

  }


  const checkValidity = async (link: string | null) => {
    if (!link) return
    if (link.includes(LinksToCheck[0])) {
      const showwcaseLinkArray = link.split(LinksToCheck[0])
      setIsValidShowwcaseLink(true)
      const showwcaseThreadID = showwcaseLinkArray[1]
      setThreadID(showwcaseThreadID)
      console.log("valid showwcase link")
    }
    else if (link.includes(LinksToCheck[1]) && link.includes("/status/")) {
      const linkArray = link.split("/status/")
      setIsValidTwitterLink(true)
      const newTwitterPostID = linkArray[1]
      setThreadID(newTwitterPostID)
      console.log("valid twitter link")
    }
    else {
      if (selectedPlatform === availablePlatForms[0]) {
        setIsValidShowwcaseLink(false)
        console.log("invalid showwcase link")
      }
      else {
        setIsValidTwitterLink(false)
        console.log("invalid twitter link")
      }
    }

  }
  useEffect(() => {
    setError(false)
    setErrorMessage(null)
    if (link) {
      checkValidity(link)
      console.log("valid here", link)
    }
  }, [selectedPlatform])


  const handleChange = (event: any) => {
    checkValidity(event.target.value)
    setLink(event.target.value)

  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!link) {
      setError(true)
      setErrorMessage("Please paste in a link")
      return
    }

    if (isValidShowwcaseLink && !isValidTwitterLink) {
      if (selectedPlatform === availablePlatForms[1]) {
        setSelectedPlatform(availablePlatForms[0])
        fetchThread(threadID as string)
        setError(false)
        setErrorMessage(null)
      }
      else if (selectedPlatform === availablePlatForms[0]) {
        fetchThread(threadID as string)
        setError(false)
        setErrorMessage(null)
      }

    }

    else if (!isValidShowwcaseLink && isValidTwitterLink) {
      if (selectedPlatform === availablePlatForms[0]) {
        setSelectedPlatform(availablePlatForms[1])
        fetchTwitterPost(threadID as string)
        setError(false)
        setErrorMessage(null)
      }
      else if (selectedPlatform === availablePlatForms[1]) {
        fetchTwitterPost(threadID as string)
        setError(false)
        setErrorMessage(null)
      }

    }

    else if (!isValidShowwcaseLink && !isValidTwitterLink) {
      setError(true)
      setErrorMessage(`invalid ${selectedPlatform} link`)
    }


  }

  const downloadImage = () => {
    const shotElement = document.querySelector('#shot');
    if (!shotElement) return
    domtoimage.toPng(shotElement, { quality: 1.0 })
      .then(function (dataUrl: any) {
        var link = document.createElement('a');
        link.download = "new-shot-" + Date.now() + '.png';
        link.href = dataUrl;
        link.click();
      });
  }
  const colors = [
    "blue",
    "yellow",
    "black",
    "#FF69B4",
    "#FFA07A",
    "#FF6347",
    "#FF7F50",
    "#FFD700",
    "#FF8C00",
    "#FFA500",
    "#00FF7F",
    "#00FA9A",
    "#00FF00",
    "#7CFC00",
    "#40E0D0",
    "#8F00FF",
  ]

  const gradients = [
    "linear-gradient(to right, #ff512f, #dd2476)",
    "linear-gradient(to right, #c33764, #1d2671)",
    "linear-gradient(to right, #f83600, #f9d423)",
    "linear-gradient(to right, #614385, #516395)",
    "linear-gradient(to right, #16a085, #f4d03f)",
    "linear-gradient(to right, #4b6cb7, #182848)",
    "linear-gradient(to right, #fc4a1a, #f7b733)",
    "linear-gradient(to right, #1e90ff, #40e0d0)",
    "linear-gradient(to right, #0abfbc, #fc354c)",
    "linear-gradient(to right, #3d7eaa, #ffe47a)",
    "linear-gradient(to right, #ff7e5f, #feb47b)",
    "linear-gradient(to right, #00c6ff, #0072ff)",
    "linear-gradient(to right, #da22ff, #9733ee)",
    "linear-gradient(to right, #4776e6, #8e54e9)",
    "linear-gradient(to right, #f12711, #f5af19)"
  ];

  const images = [
    "https://img.freepik.com/free-vector/emoticons-with-empty-space-background_79603-1023.jpg"

  ]

  const ColorPicker = () => {
    return (
      <div onMouseLeave={() => setShowPicker(false)} className="bg-white flex flex-col justify-center items-center p-4 absolute bottom-20 ">
        <h1 className="font-bold ">Select Background</h1>
        <section className="">
          <h2>Solid</h2>
          <div className=" gap-2 grid-cols-6 grid">
            {
              colors.map(color => (
                <div key={color} onClick={() => setSelectedBGColor(color)} className="h-6 w-8 rounded-sm" style={{ background: color }} />
              ))
            }
            <input type="color" className="w-8" onChange={(e) => setSelectedBGColor(e.target.value)} />
          </div>
        </section>
        <section className="">
          <h2>Gradient</h2>
          <div className=" gap-2 grid-cols-6 grid">
            {
              gradients.map(color => (
                <div key={color} onClick={() => setSelectedBGColor(color)} className="h-6 w-8 rounded-sm" style={{ background: color }} />
              ))
            }
          </div>
        </section>
        {/* <section className="">
          <h2>Images</h2>
          <div className=" gap-2 grid-cols-6 grid">
            {
              images.map(color => (
                <div key={color} onClick={() => setSelectedBGColor(`url(${color})`)} className="h-6 w-8 rounded-sm object-contain bg-contain" style={{ backgroundImage: `url(${color})` }} />
              ))
            }
          </div>
        </section> */}
      </div>
    )
  }

  const ControlBox = () => {
    return (

      <div className="absolute bottom-2 rounded-md w-[400px]  p-2 py-4 flex items-center justify-evenly">
        {showPicker && <ColorPicker />}
        <button className=" w-20 flex flex-col items-center justify-center rounded-md bg-white h-full p-2" onClick={() => setShowPicker(true)}><FaSearch size={24} />
          <p className="text-sm">Switch BG</p></button>
        <button className=" w-20 flex flex-col items-center justify-center rounded-md  bg-white  h-full p-2" onClick={downloadImage}><FaDownload size={24} />
          <p className="text-sm">Download</p></button>
        <button className=" w-20 flex flex-col items-center justify-center rounded-md  bg-white  h-full p-2" onClick={downloadImage}><FaDownload size={24} />
          <p className="text-sm">Download</p></button>
        <button className=" w-20 flex flex-col items-center justify-center rounded-md  bg-white  h-full p-2" onClick={downloadImage}><FaDownload size={24} />
          <p className="text-sm">Download</p></button>
      </div>
    )

  }


  return (
    <div className="min-h-screen w-full bg-[#2221] text-[#222] flex flex-col">
      <header className="flex flex-col lg:flex-row items-center justify-between p-4 px-10">

        <h1 className="font-bold text-xl flex items-center gap-2">
          <BiCamera size={32} color="blue" />
          SNAP-A-SHOT</h1>
        <div className="block absolute right-4 lg:hidden"><BiMoon size={28} /></div>
        <form onSubmit={handleSubmit}>
          <input className="w-[400px] indent-4 p-3 outline-none border-2 rounded-lg bg-transparent" type="text" placeholder="Paste Showwcase thread link here" value={link} onChange={handleChange} />
          {
            error &&
            <p className="text-red-500 text-center capitalize">{errorMessage}</p>
          }
        </form>
        <div className="hidden lg:block"><BiMoon size={28} /></div>
      </header>
      <div className="flex gap-4 justify-center items-center">
        <button onClick={() => setSelectedPlatform(availablePlatForms[0])} className={`rounded-md p-2 border ${selectedPlatform === availablePlatForms[0] && "border-blue-700"}`}>Showwcase</button>
        <button onClick={() => setSelectedPlatform(availablePlatForms[1])} className={`rounded-md p-2 border ${selectedPlatform === availablePlatForms[1] && "border-blue-700"}`}>Twitter</button>

      </div>
      <main className="flex-1 flex flex-col justify-center items-center overflow-y-scroll relative">

        <Resizer>
          <section style={{ background: selectedBGColor }} id="shot" className=" w-full h-full p-20 flex justify-center items-center bg-cover object-cover bg-no-repeat">
            <div className={`border w-[400px] min-w-[320px] max-w-[650px] p-6  bg-white rounded-md relative ${loading ? "flex items-center justify-center" : ""}`}>
              {
                selectedPlatform === availablePlatForms[0] ?
                  (!isShowwcaseDataFetched ? <DummyTemplate platformLogo={`${selectedPlatform}.svg`} selectedPlatform={selectedPlatform} isLoading={loading} /> : <ThreadTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={user?.profilePictureUrl} displayName={user?.displayName} username={user?.username} postText={thread?.message} likeCount={thread?.totalUpvotes} replyCount={thread?.totalReplies} selectedPlatform={availablePlatForms[1]} />) : (!isTwitterDataFetched ?
                    <DummyTemplate platformLogo={`${selectedPlatform}.svg`} selectedPlatform={selectedPlatform} isLoading={loading} /> : <ThreadTemplate platformLogo="twitter.svg" selectedPlatform={availablePlatForms[1]} isLoading={loading} profileUrl={tweetInfo.includes.users[0].profile_image_url} displayName={tweetInfo.includes.users[0].name}
                      username={tweetInfo.includes.users[0].username} postText={tweetInfo.data.text} likeCount={tweetInfo.data.public_metrics.like_count} replyCount={tweetInfo.data.public_metrics?.reply_count}
                    />)
              }
            </div>
          </section>
        </Resizer>
        <ControlBox />
      </main>
      <footer className="h-16 flex items-center justify-center">
        <p>
          &copy;Copyright 2023 @dev__steve
        </p>
      </footer>
    </div>
  );
}
