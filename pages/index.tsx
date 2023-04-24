import { BiMoon, BiCamera, BiCopy } from "react-icons/bi"
import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaDownload, FaSearch } from "react-icons/fa"
import domtoimage from 'dom-to-image';
import Resizer from "@/components/Resizer";
import ThreadTemplate from "@/components/templates/ThreadTemplate";
import DummyTemplate from "@/components/templates/DummyTemplate";
import { AppContext } from "@/context";
import { IAppContext } from "@/interfaces";
import { FiDownload, FiSun } from "react-icons/fi";
import { IoCopy, IoEyedropSharp } from "react-icons/io5";
import Post from "@/components/Post";

export default function Home() {
  // const [link, setLink] = useState<string>("")
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

  // const fetchTwitterPost = async (twitterPostID: string) => {
  //   setLoading(true)
  //   try {
  //     const response = await axios.get(`/api/fetchTweet?twitterPostID=${twitterPostID}`);
  //     console.log(response.data);
  //     setIsTwitterDataFetched(true)
  //     console.log(response.data)
  //     setTweetInfo(response.data)
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     console.error(error);
  //     setLoading(false)
  //   }
  // }

  // const fetchThreadOwner = (username: string) => {
  //   setLoading(true)
  //   const options = {
  //     method: 'GET',
  //     url: 'https://cache.showwcase.com/user/' + username,
  //   };

  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //     setUser(response.data)
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }

  // const fetchThread = (threadID: string) => {
  //   setLoading(true)
  //   const options = {
  //     method: 'GET',
  //     url: 'https://cache.showwcase.com/threads/' + threadID,
  //   };

  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //     fetchThreadOwner(response.data.user.username)
  //     setThread(response.data)
  //     setLoading(false)
  //     setIsShowwcaseDataFetched(true)
  //   }).catch(function (error) {
  //     console.error(error);
  //     setLoading(false)
  //   })
  // }


  // const checkValidity = async (link: string | null) => {
  //   if (!link) return
  //   if (link.includes(LinksToCheck[0])) {
  //     const showwcaseLinkArray = link.split(LinksToCheck[0])
  //     setIsValidShowwcaseLink(true)
  //     const showwcaseThreadID = showwcaseLinkArray[1]
  //     setThreadID(showwcaseThreadID)
  //     console.log("valid showwcase link")
  //   }
  //   else if (link.includes(LinksToCheck[1]) && link.includes("/status/")) {
  //     const linkArray = link.split("/status/")
  //     setIsValidTwitterLink(true)
  //     const newTwitterPostID = linkArray[1]
  //     setThreadID(newTwitterPostID)
  //     console.log("valid twitter link")
  //   }
  //   else {
  //     if (selectedPlatform === availablePlatForms[0]) {
  //       setIsValidShowwcaseLink(false)
  //       console.log("invalid showwcase link")
  //     }
  //     else {
  //       setIsValidTwitterLink(false)
  //       console.log("invalid twitter link")
  //     }
  //   }
  // }

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

  const TABS = [
    'Twitter',
    'Showwcase'
  ]

  const COLORS = [
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

  const GRADIENTS = [
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
  ]

  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false)
  const [background, setBackground] = useState(GRADIENTS[7])
  const [platform, setPlatform] = useState(TABS[0])
  const [link, setLink] = useState('')

  useEffect(() => {
    console.log(platform)
    console.log(link)
  }, [platform, link])

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
    })
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

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div>
        <header className="flex items-center justify-between">
          <b>Logo</b>
          <ul className="bg-white w-max flex items-center border border-r-0">
            {TABS.map((item, index: number) => <li onClick={() => setPlatform(item)} className={`border border-l-0 border-b-0 border-t-0 p-2 font-medium px-5 cursor-pointer transition-all ${platform === item ? 'bg-blue-400 text-white border-l-0' : 'text-blue-400'}`} key={index}>{item}</li>)}
          </ul>
          <FiSun />
        </header>
        <div className="my-5 flex items-center justify-center">
          <input value={link} onChange={event => setLink(event.target.value)} placeholder="Paste link here..." className="text-gray-500 w-full p-2 px-3 border rounded-xl outline-blue-300 shadow-md max-w-xl" />
        </div>
      </div>

      <div className="flex items-center justify-center pb-44">
        <Resizer>
          <section style={{ background: background }} id="shot" className="transition-all w-full h-full p-20 flex justify-center items-center bg-cover object-cover bg-no-repeat">

            {/* {platform === availablePlatForms[0] ?
                (!isShowwcaseDataFetched ? <DummyTemplate platformLogo={`${platform}.svg`} platform={platform} isLoading={loading} /> : <ThreadTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={user?.profilePictureUrl} displayName={user?.displayName} username={user?.username} postText={thread?.message} likeCount={thread?.totalUpvotes} replyCount={thread?.totalReplies} platform={availablePlatForms[1]} />) : (!isTwitterDataFetched ?
                  <DummyTemplate platformLogo={`${platform}.svg`} platform={platform} isLoading={loading} /> : <ThreadTemplate platformLogo="twitter.svg" platform={availablePlatForms[1]} isLoading={loading} profileUrl={tweetInfo.includes.users[0].profile_image_url} displayName={tweetInfo.includes.users[0].name}
                    username={tweetInfo.includes.users[0].username} postText={tweetInfo.data.text} likeCount={tweetInfo.data.public_metrics.like_count} replyCount={tweetInfo.data.public_metrics?.reply_count}
                  />)} */}

            <Post platformLogo={""} platform={""} name={""} username={""} content={""} />
          </section>
        </Resizer>
      </div>

      <div className="flex justify-center fixed bottom-0 w-screen py-5">
        <div className="relative shadow-xl w-max rounded-xl">
          {showBackgroundPicker && <div className="absolute flex gap-5 shadow-md p-5 rounded-md w-max bottom-[7rem] z-10 bg-white left-0">
            <div>
              <b className='mb-3 block'>Background color</b>
              <ul className="grid grid-cols-4 gap-2">
                {COLORS.map((item, index: number) => <li key={index} onClick={() => setBackground(item)} className="cursor-pointer hover:opacity-50 transition-all h-6 w-8 rounded-sm" style={{ background: item }}></li>)}
              </ul>
            </div>
            <div>
              <b className='mb-3 block'>Gradients</b>
              <ul className="grid grid-cols-4 gap-2">
                {GRADIENTS.map((item, index: number) => <li key={index} onClick={() => setBackground(item)} className="cursor-pointer hover:opacity-50 transition-all h-6 w-8 rounded-sm" style={{ background: item }}></li>)}
              </ul>
            </div>
          </div>}
          <ul className="p-3 flex items-center gap-2 bg-white rounded-xl">
            <li className="select-none relative flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-all py-3 gap-1 px-5 rounded-md hover:text-blue-400 text-gray-500" onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}>
              <IoEyedropSharp />
              <p>Background</p>
            </li>
            <li className="select-none relative flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-all py-3 gap-1 px-5 rounded-md hover:text-blue-400 text-gray-500" onClick={downloadImage}>
              <FiDownload size={20} />
              <p>Download</p>
            </li>
            <li className="select-none relative flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-all py-3 gap-1 px-5 rounded-md hover:text-blue-400 text-gray-500">
              <IoCopy />
              <p>Copy</p>
            </li>
          </ul>
        </div>
      </div>
    </main>

    // <div className="min-h-screen w-full bg-[#2221] text-[#222] flex flex-col">
    //   <header className="flex flex-col lg:flex-row items-center justify-between p-4 px-10">

    //     <h1 className="font-bold text-xl flex items-center gap-2">
    //       <BiCamera size={32} color="blue" />
    //       SNAP-A-SHOT</h1>
    //     <div className="block absolute right-4 lg:hidden"><BiMoon size={28} /></div>
    //     <form onSubmit={handleSubmit}>
    //       <input className="w-[400px] indent-4 p-3 outline-none border-2 rounded-lg bg-transparent" type="text" placeholder="Paste Showwcase thread link here" value={link} onChange={handleChange} />
    //       {
    //         error &&
    //         <p className="text-red-500 text-center capitalize">{errorMessage}</p>
    //       }
    //     </form>
    //     <div className="hidden lg:block"><BiMoon size={28} /></div>
    //   </header>
    //   <div className="flex gap-4 justify-center items-center">
    //     <button onClick={() => setSelectedPlatform(availablePlatForms[0])} className={`rounded-md p-2 border ${selectedPlatform === availablePlatForms[0] && "border-blue-700"}`}>Showwcase</button>
    //     <button onClick={() => setSelectedPlatform(availablePlatForms[1])} className={`rounded-md p-2 border ${selectedPlatform === availablePlatForms[1] && "border-blue-700"}`}>Twitter</button>

    //   </div>
    //   <main className="flex-1 flex flex-col justify-center items-center overflow-y-scroll relative">

    // <Resizer>
    //   <section style={{ background: selectedBGColor }} id="shot" className=" w-full h-full p-20 flex justify-center items-center bg-cover object-cover bg-no-repeat">
    //     <div className={`border w-[400px] min-w-[320px] max-w-[650px] p-6  bg-white rounded-md relative ${loading ? "flex items-center justify-center" : ""}`}>
    //       {
    //         selectedPlatform === availablePlatForms[0] ?
    //           (!isShowwcaseDataFetched ? <DummyTemplate platformLogo={`${selectedPlatform}.svg`} selectedPlatform={selectedPlatform} isLoading={loading} /> : <ThreadTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={user?.profilePictureUrl} displayName={user?.displayName} username={user?.username} postText={thread?.message} likeCount={thread?.totalUpvotes} replyCount={thread?.totalReplies} selectedPlatform={availablePlatForms[1]} />) : (!isTwitterDataFetched ?
    //             <DummyTemplate platformLogo={`${selectedPlatform}.svg`} selectedPlatform={selectedPlatform} isLoading={loading} /> : <ThreadTemplate platformLogo="twitter.svg" selectedPlatform={availablePlatForms[1]} isLoading={loading} profileUrl={tweetInfo.includes.users[0].profile_image_url} displayName={tweetInfo.includes.users[0].name}
    //               username={tweetInfo.includes.users[0].username} postText={tweetInfo.data.text} likeCount={tweetInfo.data.public_metrics.like_count} replyCount={tweetInfo.data.public_metrics?.reply_count}
    //             />)
    //       }
    //     </div>
    //   </section>
    // </Resizer>
    //     <ControlBox />
    //   </main>
    //   <footer className="h-16 flex items-center justify-center">
    //     <p>
    //       &copy;Copyright 2023 @dev__steve
    //     </p>
    //   </footer>
    // </div>
  )
}
