/* eslint-disable @next/next/no-img-element */
import { TABS } from '@/constants/tabs'
import { TthreadProps } from '@/types'
import linkifyUsernames from '@/utils/formatPostContent.util'
import React, { FC, useContext } from 'react'
import Loader from '../loader'
import Image from 'next/image'
import ThreadLink from '../ThreadLink'
import convertLinksToHTML from '@/utils/convertsLinksToHTML.util'
import { AppContext } from '@/context'
import { IAppContext } from '@/interfaces'

const QuoteTemplate: FC<TthreadProps> = ({ platformLogo, platform, isLoading, profileUrl, displayName, username, postContent, likeCount, replyCount, showwcasePostImages, twitterPostImages, showwcaseUserEmoji, verifiedTwitter, datePosted, showwcaseLink }) => {

  const {  cardTheme } = useContext<IAppContext | null>(AppContext) as IAppContext
  return (

      <>
      <div className={`min-w-[400px] max-w-[650px] ${cardTheme === "dark" ? "bg-dimmer text-white dark:text-white" : "bg-white"}  p-6 dark:text-black shadow-2xl rounded-2xl relative ${isLoading ? "flex items-center justify-center" : ""}`}>
          {
            isLoading ? <Loader /> : (<>
              <div className="flex justify-between  items-center">
                <div className="flex gap-2 items-center justify-center w-full">
                  <img src={profileUrl} className="w-[80px] border-4  absolute -top-6 -left-6 rounded-full h-[80px] object-contain bg-blue-300" alt="user_profile" width={50} height={50} />
                  <div className="flex  flex-col">
                    <span className='flex gap-1'>
                      <b>{displayName}</b>
                      {platform === TABS[0] ? (showwcaseUserEmoji && <p>{showwcaseUserEmoji}</p>) : (verifiedTwitter && <img src="../assets/verified.svg" width={20} height={20} alt="verified_badge" />)}
                    </span>
                    <small className="text-gray-500">@{username}</small>
                  </div>
                </div>
                <Image src={`/assets/${platformLogo}`} alt={platform} width={50} height={50} className={` absolute  rounded-full  object-cover ${platform === TABS[0] ? "bg-white w-[50px] h-[50px] -bottom-6 -right-6" : "w-[70px] h-[70px] -bottom-8 -right-8"} `} />
              </div>
              <p className="my-3 text-center" dangerouslySetInnerHTML={{ __html: linkifyUsernames(convertLinksToHTML(postContent)) }} />
              <div className={`grid ${(showwcasePostImages?.length === 1 || twitterPostImages?.length === 1) ? " " : "grid-cols-2"} gap-1`} id={(showwcasePostImages?.length === 3 || twitterPostImages?.length === 3) ? "three-images" : ""} >
                {
                  platform === TABS[0] ?
                    (showwcasePostImages && showwcasePostImages.map((postImage) => (
                      <img key={postImage} src={postImage} alt="post_image" loading='lazy' className={`bg-gray-500  w-full rounded-md  border object-contain bg-contain ${(showwcasePostImages?.length === 2 || twitterPostImages?.length === 2) ? "h-[280px] w-[250px]" : " max-h-[370px] "}`} />
                    ))) :
                    (twitterPostImages && twitterPostImages.map((twitterPostImage) => {
                      const { url, preview_image_url } = twitterPostImage
                      return (
                        <img key={url || preview_image_url} src={url || preview_image_url} alt="post_image" loading='lazy' className='bg-gray-500 w-full rounded-md max-h-[370px] border object-cover' />
                      )
                    }))
                }
                {
                  platform === TABS[0] ? (
                    (postContent.length < 350 && (showwcasePostImages && showwcasePostImages?.length < 1)) && (
                      (showwcaseLink && showwcaseLink.type !== "thread") && <ThreadLink title={showwcaseLink.title} description={showwcaseLink.description} url={showwcaseLink.url} images={showwcaseLink.images} />
                    )
                  )
                    : (
                      <></>
                    )
                }
              </div>
            </>)
          }

        </div>
      </>

  )
}

export default QuoteTemplate
