import Image from "next/image";
import { BiMoon, BiCamera } from "react-icons/bi"
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import { FiHeart } from "react-icons/fi"
import { FaCommentDots, FaDownload } from "react-icons/fa"
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
  const [isValidLink, setIsValidLink] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>("")
  const [selectedPlatform, setSelectedPlatform] = useState<string>("showwcase")

  const { isShowwcaseDataFetched, setIsShowwcaseDataFetched, isTwitterDataFetched, setIsTwitterDataFetched
  } = useContext<IAppContext | null>(AppContext) as IAppContext
  const availablePlatForms = [
    "showwcase", "twitter"
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
      setIsShowwcaseDataFetched(true)
    }).catch(function (error) {
      console.error(error);
      setLoading(false)
    });

  }


  const checkValidity = async (link: string | null) => {
    if (!link) return
    console.log(link)
    if (selectedPlatform === availablePlatForms[0]) {
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
    else if (selectedPlatform === availablePlatForms[1]) {
      if (link.includes("https://twitter.com/") && link.includes("/status/")) {
        const linkArray = link.split("/status/")
        setIsValidLink(true)
        const newTwitterPostLink = linkArray[1]
        setThreadID(newTwitterPostLink)
        console.log("valid link")

      }
      else {
        setIsValidLink(false)
        console.log(false)
      }

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

    if (selectedPlatform === availablePlatForms[0]) {
      if (!isValidLink) {
        setError(true)
        setErrorMessage(`invalid ${selectedPlatform} link`)
      }
      else {
        fetchThread(threadID as string)
        setError(false)
        setErrorMessage(null)
      }
    }
    else if (selectedPlatform === availablePlatForms[1]) {
      fetchTwitterPost(threadID as string)

    }

  }

  const save = () => {
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


  const ControlBox = () => {
    return (
      <div className="absolute bottom-2 bg-[#2221] rounded-md w-[400px]  p-2 py-4 flex items-center justify-evenly">
        <button className=" w-20 flex flex-col items-center justify-center rounded-md bg-white h-full p-2" onClick={save}><FaDownload size={24} />
          <p className="text-sm">Download</p></button>
        <button className=" w-20 flex flex-col items-center justify-center rounded-md  bg-white  h-full p-2" onClick={save}><FaDownload size={24} />
          <p className="text-sm">Download</p></button>
        <button className=" w-20 flex flex-col items-center justify-center rounded-md  bg-white  h-full p-2" onClick={save}><FaDownload size={24} />
          <p className="text-sm">Download</p></button>
        <button className=" w-20 flex flex-col items-center justify-center rounded-md  bg-white  h-full p-2" onClick={save}><FaDownload size={24} />
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
          <section id="shot" className=" bg-blue-400 w-full h-full p-20 flex justify-center items-center">
            <div className={`border w-[400px] min-w-[320px] max-w-[650px] p-6  bg-white rounded-md relative ${loading ? "flex items-center justify-center" : ""}`}>
              {
                selectedPlatform === availablePlatForms[0] ?
                  (!isShowwcaseDataFetched ? <DummyTemplate platformLogo={`${selectedPlatform}.svg`} selectedPlatform={selectedPlatform} isLoading={loading} /> : <ThreadTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={user?.profilePictureUrl} displayName={user?.displayName} username={user?.username} postText={thread?.message} likeCount={thread?.totalUpvotes} replyCount={thread?.totalReplies} selectedPlatform={availablePlatForms[1]} />) : (!isTwitterDataFetched ?
                    <DummyTemplate platformLogo={`${selectedPlatform}.svg`} selectedPlatform={selectedPlatform} isLoading={loading} /> : <ThreadTemplate platformLogo="twitter.svg" selectedPlatform={availablePlatForms[1]} isLoading={loading} profileUrl={tweetInfo.includes.users[0].profile_image_url} displayName={tweetInfo.includes.users[0].name}
                      username={tweetInfo.includes.users[0].username} postText={tweetInfo.data.text} likeCount={tweetInfo.public_metrics?.like_count} replyCount={tweetInfo.public_metrics?.reply_count}
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
