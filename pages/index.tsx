/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Resizer from "@/components/Resizer";
import ThreadTemplate from "@/components/templates/ThreadTemplate";
import { AppContext } from "@/context";
import { IAppContext } from "@/interfaces";
import { FiDownload, FiSun } from "react-icons/fi";
import { IoCopy, IoEyedropSharp } from "react-icons/io5";
import { IoIosQuote, IoMdStats } from "react-icons/io"
import { VscExtensions } from "react-icons/vsc"
import { TABS } from "@/constants/tabs"
import { COLORS } from "@/constants/colors"
import { GRADIENTS } from "@/constants/gradients"
import { DUMMY_TEMP } from "@/constants/dummy_template"
import QuoteTemplate from "@/components/templates/QuoteTemplate";
import removeLastURL from "@/utils/removeLastURL.util";
import useDebounce from "@/hooks/useDebounce";
import removeQuery from "@/utils/removeQuery.util";
import Header from "@/components/Header";
import {STYLES} from "@/constants/styles"
import copyImage from "@/utils/copyImage.util";
import downloadImage from "@/utils/downloadImage.util";



export default function Home() {
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("thread")
  const [background, setBackground] = useState(GRADIENTS[7])
  const [link, setLink] = useState('')
  const [user, setUser] = useState<any>(null)
  const [tweetInfo, setTweetInfo] = useState<any>(null)
  const [threadInfo, setThreadInfo] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [threadID, setThreadID] = useState<string | null>(null)
  const [isValidShowwcaseLink, setIsValidShowwcaseLink] = useState<boolean>(false)
  const [isValidTwitterLink, setIsValidTwitterLink] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>("")
  const { isShowwcaseDataFetched, setIsShowwcaseDataFetched, isTwitterDataFetched, setIsTwitterDataFetched, setShowStats,setPlatform,platform } = useContext<IAppContext | null>(AppContext) as IAppContext
  const [showwcaseFetchFailed, setShowwcaseFetchFailed] = useState<boolean>(false)
  const [twitterFetchFailed, setTwitterFetchFailed] = useState<boolean>(false)

  const debouncedLink = useDebounce(link, 500)


  const LinksToCheck = [
    "https://www.showwcase.com/thread/", "https://twitter.com/"
  ]

  const availableTemplates = [
    "thread",
    "quote"
  ]

  useEffect(
    () => {
      if (debouncedLink) {
        handleSubmit()
      }
    },
    [debouncedLink] // Only call effect if debounced search term changes
  );

  const checkValidity = async (link: string | null) => {
    if (!link) return
    const newLink = removeQuery(link);
    if (newLink.includes(LinksToCheck[0])) {
      const showwcaseLinkArray = newLink.split(LinksToCheck[0])
      setIsValidShowwcaseLink(true)
      setIsValidTwitterLink(false)
      const showwcaseThreadID = showwcaseLinkArray[1]
      setThreadID(showwcaseThreadID)
      // console.log("valid showwcase link")
    } else if (newLink.includes(LinksToCheck[1]) && newLink.includes("/status/")) {
      const linkArray = newLink.split("/status/")
      console.log(newLink)
      setIsValidTwitterLink(true)
      setIsValidShowwcaseLink(false)
      const newTwitterPostID = linkArray[1]
      setThreadID(newTwitterPostID)
      // console.log("valid twitter link")
    }
    else {
      if (platform === TABS[0]) {
        setIsValidShowwcaseLink(false)
        console.log("invalid showwcase link")
      } else {
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
  }, [platform])


  const handleChange = (event: any) => {
    checkValidity(event.target.value)
    setLink(removeQuery(event.target.value))
    setError(false)
    setErrorMessage(null)

  }
  const handleSubmit = () => {
    console.log(platform)
    if (!link) {
      setError(true)
      setErrorMessage("Please paste in a link")
      return
    }

    if (isValidShowwcaseLink && !isValidTwitterLink) {
      if (platform === TABS[1]) {
        setPlatform(TABS[0])
        fetchThread(threadID as string)
        setError(false)
        setErrorMessage(null)
      }
      else if (platform === TABS[0]) {
        fetchThread(threadID as string)
        setError(false)
        setErrorMessage(null)
      }

    }

    else if (!isValidShowwcaseLink && isValidTwitterLink) {
      if (platform === TABS[0]) {
        setPlatform(TABS[1])
        fetchTwitterPost(threadID as string)
        setError(false)
        setErrorMessage(null)
      }
      else if (platform === TABS[1]) {
        fetchTwitterPost(threadID as string)
        setError(false)
        setErrorMessage(null)
      }

    }

    else if (!isValidShowwcaseLink && !isValidTwitterLink) {
      setError(true)
      setErrorMessage(`invalid ${platform} link`)
    }


  }


  const fetchTwitterPost = async (twitterPostID: string) => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/fetchTweet?twitterPostID=${twitterPostID}`);
      console.log(response.data);
      if (response.data.errors) {
        console.log("failed to fetch tweet")
        setTwitterFetchFailed(true)
        setIsTwitterDataFetched(false)
        setLoading(false)
        return
      }
      if (response.data.data || response.data.includes) {
        setIsTwitterDataFetched(true)
        console.log(response.data)
        setTweetInfo(response.data)
        setTwitterFetchFailed(false)
        setLoading(false)

      }
    } catch (error) {
      setLoading(false)
      console.error(error);
      console.log("failed to fetch tweet")
      setTwitterFetchFailed(true)
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
      setThreadInfo(response.data)
      setLoading(false)
      setIsShowwcaseDataFetched(true)
    }).catch(function (error) {
      console.error(error);
      setLoading(false)
      setShowwcaseFetchFailed(true)
    })
  }

  return (
    <main className="min-h-screen w-full p-3 relative md:p-10 mx-auto">
      <div>
        <Header />
        <div className="my-5 flex flex-col gap-3 items-center justify-center" >
          <input value={link} onChange={handleChange} placeholder={`Paste ${platform} link here...`} className="text-gray-500 w-full p-2 px-3 border dark:border-dimmer rounded-xl outline-blue-300 dark:text-white dark:outline-dim shadow-md max-w-xl dark:bg-dim" />
          {
            error &&
            <p className="text-red-500 text-center capitalize">{errorMessage}</p>
          }
        </div>
      </div>

      <div className="flex items-center justify-center pb-44 ">
        <Resizer>
          <section style={{ background: background }} id="shot" className="transition-all w-full h-full p-20 flex justify-center items-center bg-cover object-cover bg-no-repeat">
            {
              // IF SELECTED TAB IS SHOWCASE
              platform === TABS[0] ?
                (selectedTemplate === availableTemplates[0] ?
                  (showwcaseFetchFailed ? <ThreadTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={DUMMY_TEMP.profileUrl} displayName={DUMMY_TEMP.displayName} username={DUMMY_TEMP.username} postContent={`Failed to fetch ${platform}`} likeCount={DUMMY_TEMP.likeCount} replyCount={DUMMY_TEMP.replyCount} platform={TABS[0]} datePosted={new Date().toString()} /> :
                    (isShowwcaseDataFetched ?
                      <ThreadTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={user?.profilePictureUrl
                      } displayName={threadInfo.user.displayName} username={threadInfo.user.username} postContent={threadInfo.message} likeCount={threadInfo.totalUpvotes} replyCount={threadInfo.totalReplies} platform={TABS[0]} showwcasePostImages={threadInfo.images} showwcaseUserEmoji={threadInfo.user.activity.emoji} datePosted={threadInfo.createdAt} showwcaseLink={threadInfo.linkPreviewMeta} showwcasePoll={threadInfo.poll} /> :
                      <ThreadTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={DUMMY_TEMP.profileUrl} displayName={DUMMY_TEMP.displayName} username={DUMMY_TEMP.username} postContent={DUMMY_TEMP.postContent} likeCount={DUMMY_TEMP.likeCount} replyCount={DUMMY_TEMP.replyCount} platform={TABS[0]} datePosted={new Date().toString()} />
                    )) :
                  (showwcaseFetchFailed ? <QuoteTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={DUMMY_TEMP.profileUrl} displayName={DUMMY_TEMP.displayName} username={DUMMY_TEMP.username} postContent={`Failed to fetch ${platform}`} likeCount={DUMMY_TEMP.likeCount} replyCount={DUMMY_TEMP.replyCount} platform={TABS[0]} datePosted={new Date().toString()} /> :
                    (isShowwcaseDataFetched ? <QuoteTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={user?.profilePictureUrl
                    } displayName={threadInfo.user.displayName} username={threadInfo.user.username} postContent={threadInfo.message} likeCount={threadInfo.totalUpvotes} replyCount={threadInfo.totalReplies} platform={TABS[0]} showwcasePostImages={threadInfo.images} showwcaseUserEmoji={threadInfo.user.activity.emoji} datePosted={threadInfo.createdAt
                    } showwcaseLink={threadInfo.linkPreviewMeta} /> :
                      <QuoteTemplate platformLogo="showwcase.svg" isLoading={loading} profileUrl={DUMMY_TEMP.profileUrl} displayName={DUMMY_TEMP.displayName} username={DUMMY_TEMP.username} postContent={DUMMY_TEMP.postContent} likeCount={DUMMY_TEMP.likeCount} replyCount={DUMMY_TEMP.replyCount} platform={TABS[0]} datePosted={new Date().toString()} />
                    ))) :
                (selectedTemplate === availableTemplates[0] ?
                  (twitterFetchFailed ? <ThreadTemplate platformLogo="twitter.svg" isLoading={loading} profileUrl={DUMMY_TEMP.profileUrl} displayName={DUMMY_TEMP.displayName} username={DUMMY_TEMP.username} postContent={`Failed to fetch ${platform}`} likeCount={DUMMY_TEMP.likeCount} replyCount={DUMMY_TEMP.replyCount} platform={TABS[0]} datePosted={new Date().toString()} /> :
                    (isTwitterDataFetched ?
                      <ThreadTemplate platformLogo="twitter.svg" platform={TABS[1]} isLoading={loading} profileUrl={tweetInfo.includes.users[0].profile_image_url} displayName={tweetInfo.includes.users[0].name}
                        username={tweetInfo.includes.users[0].username} postContent={removeLastURL(tweetInfo.data.text)} likeCount={tweetInfo.data.public_metrics.like_count} replyCount={tweetInfo.data.public_metrics.reply_count} twitterPostImages={tweetInfo.includes.media} verifiedTwitter={tweetInfo.includes.users[0].verified} datePosted={tweetInfo.data.created_at} twitterLink={tweetInfo.data.entities ? tweetInfo.data.entities.urls[0] : ""} /> :
                      <ThreadTemplate platformLogo="twitter.svg" isLoading={loading} profileUrl={DUMMY_TEMP.profileUrl} displayName={DUMMY_TEMP.displayName} username={DUMMY_TEMP.username} postContent={DUMMY_TEMP.postContent} likeCount={DUMMY_TEMP.likeCount} replyCount={DUMMY_TEMP.replyCount} platform={TABS[0]} datePosted={new Date().toString()} />
                    )) :
                  (twitterFetchFailed ? <QuoteTemplate platformLogo="twitter.svg" isLoading={loading} profileUrl={DUMMY_TEMP.profileUrl} displayName={DUMMY_TEMP.displayName} username={DUMMY_TEMP.username} postContent={`Failed to fetch ${platform}`} likeCount={DUMMY_TEMP.likeCount} replyCount={DUMMY_TEMP.replyCount} platform={TABS[0]} datePosted={new Date().toString()} /> :
                    (isTwitterDataFetched ? <QuoteTemplate platformLogo="twitter.svg" platform={TABS[1]} isLoading={loading} profileUrl={tweetInfo.includes.users[0].profile_image_url} displayName={tweetInfo.includes.users[0].name}
                      username={tweetInfo.includes.users[0].username} postContent={removeLastURL(tweetInfo.data.text)} likeCount={tweetInfo.data.public_metrics.like_count} replyCount={tweetInfo.data.public_metrics.reply_count} twitterPostImages={tweetInfo.includes.media} verifiedTwitter={tweetInfo.includes.users[0].verified} datePosted={tweetInfo.data.created_at} twitterLink={tweetInfo.data.entities ? tweetInfo.data.entities.urls[0] : ""} /> :
                      <QuoteTemplate platformLogo="twitter.svg" isLoading={loading} profileUrl={DUMMY_TEMP.profileUrl} displayName={DUMMY_TEMP.displayName} username={DUMMY_TEMP.username} postContent={DUMMY_TEMP.postContent} likeCount={DUMMY_TEMP.likeCount} replyCount={DUMMY_TEMP.replyCount} platform={TABS[0]} datePosted={new Date().toString()} />
                    )))

            }
          </section>
        </Resizer>
      </div>

      <div className="flex justify-center fixed bottom-0 right-0 py-5 w-full mx-auto">
        <div className="relative shadow-xl w-max rounded-xl">
          {/* COLOR PICKER */}
          {showBackgroundPicker && <div onMouseLeave={() => setShowBackgroundPicker(false)} className="absolute flex gap-5 shadow-md p-5 rounded-md w-max bottom-[7rem] z-10 bg-white left-0">
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
          {showTemplateSelector && <div onMouseLeave={() => setShowTemplateSelector(false)} className="absolute flex gap-5 shadow-md p-5 rounded-md w-max bottom-[7rem] z-10 bg-white right-0">
            <div>

              <ul className="flex items-center gap-2 bg-white rounded-xl">
                <li className={STYLES.control} onClick={() => setSelectedTemplate(availableTemplates[0])}>
                  <IoEyedropSharp />
                  <p>Thread</p>
                </li>
                <li className={STYLES.control} onClick={() => setSelectedTemplate(availableTemplates[1])}>
                  <IoIosQuote />
                  <p>Quote</p>
                </li>
              </ul>
            </div>
          </div>}
          {/* COLOR PICKER */}

          {/* CONTROLBOX */}
          <ul className="p-3 md:px-6 dark:bg-dim flex justify-center items-center gap-2 md:gap-6 lg:text-xl bg-white rounded-xl">
            <li className={STYLES.control} onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}>
              <IoEyedropSharp />
              <small>Background</small>
            </li>
            <li className={STYLES.control} onClick={downloadImage}>
              <FiDownload size={20} />
              <small>Download</small>
            </li>
            <li className={STYLES.control} onClick={copyImage}>
              <IoCopy />
              <small>Copy</small>
            </li>
            <li className={STYLES.control} onClick={() => setShowTemplateSelector(prev => !prev)}>
              <VscExtensions size={20} />
              <small>Templates</small>
            </li>
            <li className={STYLES.control} onClick={() => setShowStats(prev => !prev)}>
              <IoMdStats size={20} />
              <small>Show Stats</small>
            </li>
          </ul>
          {/* CONTROLBOX */}
        </div>
      </div>
    </main>
  )
}
