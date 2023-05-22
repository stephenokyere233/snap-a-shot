/* eslint-disable @next/next/no-img-element */
import { FC, useContext } from 'react'
import { FaRegComment } from 'react-icons/fa'
import Loader from '../loader'
import Image from 'next/image'
import { TthreadProps } from '@/types'
import { AiTwotoneHeart } from 'react-icons/ai'
import { TABS } from '@/constants/tabs'
import formatDate from '@/utils/formatDate.util'
import linkifyUsernames from '@/utils/formatPostContent.util'
import Link from 'next/link'
import ThreadLink from '../ThreadLink'
import convertLinksToHTML from '@/utils/convertsLinksToHTML.util'
import addHashtagLinks from '@/utils/addhashTagLinks.util'
import { AppContext } from '@/context'
import { IAppContext } from '@/interfaces'

const ThreadTemplate: FC<TthreadProps> = ({ platformLogo, platform, isLoading, profileUrl, displayName, username, postContent, likeCount, replyCount, showwcasePostImages, twitterPostImages, showwcaseUserEmoji, verifiedTwitter, datePosted, showwcaseLink, twitterLink }) => {

    const { showStats, setShowStats } = useContext<IAppContext | null>(AppContext) as IAppContext

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
                                        <span className='flex gap-1'>
                                            <b>{displayName}</b>
                                            {platform === TABS[0] ? (showwcaseUserEmoji && <p>{showwcaseUserEmoji}</p>) : (verifiedTwitter && <img src="../assets/verified.svg" width={20} height={20} alt="verified_badge" />)}
                                        </span>
                                        <small className="text-gray-500">@{username}</small>
                                    </div>
                                </div>
                                <Image src={`/assets/${platformLogo}`} alt={platform} width={50} height={50} className="w-[45px] rounded-full h-[45px] object-cover" />
                            </div>
                            <p className="my-3" dangerouslySetInnerHTML={{ __html: linkifyUsernames(convertLinksToHTML(addHashtagLinks(postContent))) }} />
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
                            </div>
                            {
                                platform === TABS[0] ? (
                                    (postContent.length < 350 && (showwcasePostImages && showwcasePostImages?.length < 1)) && (
                                        (showwcaseLink && showwcaseLink.type !== "thread") && <ThreadLink title={showwcaseLink.title} description={showwcaseLink.description} url={showwcaseLink.url} images={showwcaseLink.images} />
                                    )
                                )
                                    : <></>
                                // (postContent.length < 350 && (twitterPostImages && twitterPostImages?.length < 1)) && (
                                //     (twitterLink) && <ThreadLink title={twitterLink.title} description={twitterLink?.description || twitterLink.expanded_url} url={twitterLink.url} images={twitterLink.images || [""]} />
                                // )
                            }
                            {
                                showStats && (
                                    <div className='flex justify-between items-center mt-3'>
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
                                    </div>
                                )
                            }

                        </>)
                    }

                </div>
            </>

        </div>
    )
}

export default ThreadTemplate


