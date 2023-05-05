/* eslint-disable @next/next/no-img-element */
import { TABS } from '@/constants/tabs'
import { TthreadProps } from '@/types'
import formatDate from '@/utils/formatDate.util'
import linkifyUsernames from '@/utils/formatPostContent.util'
import React, { FC } from 'react'
import { AiTwotoneHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import Loader from '../loader'
import Image from 'next/image'

const QuoteTemplate: FC<TthreadProps> = ({ platformLogo, platform, isLoading, profileUrl, displayName, username, postContent, likeCount, replyCount, showwcasePostImages, twitterPostImages, showwcaseUserEmoji, verifiedTwitter, datePosted }) => {
  return (
    <div>
      <>
        <div className={`border min-w-[400px] max-w-[650px]  p-6 bg-white shadow-2xl rounded-2xl relative ${isLoading ? "flex items-center justify-center" : ""}`}>
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
                <Image src={`/assets/${platformLogo}`} alt={platform} width={50} height={50} className={` absolute  rounded-full  object-cover ${platform === TABS[0] ? "bg-white w-[50px] h-[50px] -bottom-6 -right-6" :"w-[70px] h-[70px] -bottom-8 -right-8"} `} />
              </div>
              <p className="my-3" dangerouslySetInnerHTML={{ __html: linkifyUsernames(postContent) }} />
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
                  platform === TABS[0] ? <></> : (
                    <></>
                  )
                }
              </div>
              {/* <div className='flex justify-between items-center mt-3'>
                <ul className='flex gap-3 '>
                  <li className="flex items-center gap-1">
                    <AiTwotoneHeart className="text-red-400" size={17} />
                    <p className="text-gray-600 text-sm">{likeCount}</p>
                  </li>
                  <li className="flex items-center gap-1">
                    <FaRegComment size={17} />
                    <p className="text-gray-600 text-sm">{replyCount}</p>
                  </li>
                </ul>
                <small className=''>
                  {formatDate(datePosted)}
                </small>
              </div> */}

            </>)
          }

        </div>
      </>

    </div>

  )
}

export default QuoteTemplate
