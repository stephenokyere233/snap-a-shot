/* eslint-disable @next/next/no-img-element */
import React, { FC, useContext } from 'react'
import { FaCommentDots } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import Loader from '../loader'
import Image from 'next/image'
import { TthreadProps } from '@/types'

const ThreadTemplate: FC<TthreadProps> = ({ platformLogo, selectedPlatform, isLoading, profileUrl, displayName, username, postText, likeCount, replyCount, postImages, twitterPostImages }) => {

    return (
        <div>
            <Image src={`/assets/${platformLogo}`} alt={selectedPlatform} width={200} height={200} className="w-12 rounded-full h-12 object-cover top-0 m-2 absolute right-0" />
            {
                isLoading ? <Loader /> : (<>
                    <div className="flex items-center gap-2 pb-2">
                        <img src={profileUrl} className="w-16 rounded-full h-16 object-cover" alt="user_profile" loading='lazy' />
                        <div className="flex flex-col">
                            <div className="text-xl font-semibold">
                                <h2>
                                    {displayName}
                                </h2>
                            </div>
                            <span className="opacity-70">
                                @{username}
                            </span>
                        </div>
                    </div>
                    <p className="">
                        {
                            postText
                        }
                    </p>
                    {
                        selectedPlatform === "showwcase" ?
                            (postImages && postImages.map((postImage) => (
                                <img key={postImage} src={postImage} alt="post_image" loading='lazy' className='bg-gray-500' />
                            ))) : (twitterPostImages && twitterPostImages.map((twitterPostImage) => {
                                const { url, preview_image_url } = twitterPostImage
                                return (
                                    <img key={url || preview_image_url} src={url || preview_image_url} alt="post_image" loading='lazy' className='bg-gray-500' />
                                )
                            }))
                    }
                    <div className="flex justify-end pt-2 text-lg items-center gap-2">
                        <div className="flex items-center gap-2"><FiHeart color="red" />{likeCount}</div>
                        <div className="flex items-center gap-2"><FaCommentDots />{replyCount}</div>
                    </div>
                </>
                )
            }
        </div>
    )
}

export default ThreadTemplate
