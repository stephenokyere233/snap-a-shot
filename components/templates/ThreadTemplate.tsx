/* eslint-disable @next/next/no-img-element */
import  { FC } from 'react'
import { FaCommentDots } from 'react-icons/fa'
import Loader from '../loader'
import Image from 'next/image'
import { TthreadProps } from '@/types'
import { AiTwotoneHeart } from 'react-icons/ai'
import { TABS } from '@/constants/tabs'

const ThreadTemplate: FC<TthreadProps> = ({ platformLogo, platform, isLoading, profileUrl, displayName, username, postContent, likeCount, replyCount, showwcasePostImages, twitterPostImages }) => {


    return (
        <div>
            <>
                <div className={`border min-w-[400px] max-w-[650px] p-6 bg-white shadow-2xl rounded-2xl relative ${isLoading ? "flex items-center justify-center" : ""}`}>
                    {
                        isLoading ? <Loader /> : (<>
                            <div className="flex justify-between  items-center">
                                <div className="flex gap-2 items-center">
                                    <img src={profileUrl} className="w-[50px] rounded-full h-[50px] object-cover" alt="user_profile" width={50} height={50} />
                                    <div className="flex flex-col">
                                        <b>{displayName}</b>
                                        <small className="text-gray-500">@{username}</small>
                                    </div>
                                </div>
                                <Image src={`/assets/${platformLogo}`} alt={platform} width={50} height={50} className="w-[45px] rounded-full h-[45px] object-cover" />
                            </div>
                            <p className="my-3">{postContent}</p>
                            <div className={`grid  grid-cols-2 gap-1`} id={(showwcasePostImages?.length === 3 || twitterPostImages?.length === 3) ? "three-images" : ""} >


                                {
                                    platform === TABS[0] ?
                                        (showwcasePostImages && showwcasePostImages.map((postImage) => (
                                            <img key={postImage} src={postImage} alt="post_image" loading='lazy' className={`bg-gray-500  w-full rounded-md  border object-cover ${(showwcasePostImages?.length === 2 || twitterPostImages?.length === 2) ? "h-[280px]" :" max-h-[370px] "}`} />
                                        ))) :
                                        (twitterPostImages && twitterPostImages.map((twitterPostImage) => {
                                            const { url, preview_image_url } = twitterPostImage
                                            return (
                                                <img key={url || preview_image_url} src={url || preview_image_url} alt="post_image" loading='lazy' className='bg-gray-500 w-full rounded-md max-h-[370px] border object-cover' />
                                            )
                                        }))
                                }
                            </div>

                            <ul className='flex gap-3 pt-3'>
                                <li className="flex items-center gap-1">
                                    <AiTwotoneHeart className="text-red-400" size={17} />
                                    <p className="text-gray-600 text-sm">{likeCount}</p>
                                </li>
                                <li className="flex items-center gap-1">
                                    <FaCommentDots size={17} />
                                    <p className="text-gray-600 text-sm">{replyCount}</p>
                                </li>
                            </ul></>)
                    }

                </div>
            </>

        </div>
    )
}

export default ThreadTemplate


