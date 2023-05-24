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
import ShowwcasePoll from '../Polls/ShowwcasePoll'
import TwitterPoll from '../Polls/TwitterPoll'

const ThreadTemplate: FC<TthreadProps> = ({ platformLogo, platform, isLoading, profileUrl, displayName, username, postContent, likeCount, replyCount, showwcasePostImages, twitterPostImages, showwcaseUserEmoji, verifiedTwitter, datePosted, showwcaseLink, twitterLink, showwcasePoll, twitterPoll }) => {

    const { showStats, cardTheme } = useContext<IAppContext | null>(AppContext) as IAppContext

    return (
        <div>
            <>
                <div className={` lg:min-w-[400px]  ${cardTheme === "dark" ? "bg-dimmer text-white dark:text-white" : "bg-white"} max-w-[650px] dark:text-black p-6 shadow-2xl rounded-2xl relative ${isLoading ? "flex items-center justify-center" : ""}`}>
                    {
                        isLoading ? <Loader /> : (<>
                            <div className="flex justify-between  items-center">
                                <div className="flex gap-2 items-center">
                                    <img src={profileUrl} className="w-[50px] rounded-full h-[50px] object-cover" alt="user_profile" width={300} height={300} />
                                    <div className="flex flex-col">
                                        <span className='flex gap-1'>
                                            <b>{displayName}</b>
                                            {platform === TABS[0] ? (showwcaseUserEmoji && <p>{showwcaseUserEmoji}</p>) : (verifiedTwitter && <img src="../assets/verified.svg" width={20} height={20} alt="verified_badge" />)}
                                        </span>
                                        <small className="text-gray-500">@{username}</small>
                                    </div>
                                </div>
                                <img src={`/assets/${platformLogo}`} alt={platform} width={50} height={50} className="w-[45px] rounded-full h-[45px] object-cover" />
                            </div>
                            <p className="my-3" dangerouslySetInnerHTML={{ __html: linkifyUsernames(convertLinksToHTML(addHashtagLinks(postContent))) }} />
                            <div className={`grid ${(showwcasePostImages?.length === 1 || twitterPostImages?.length === 1) ? " " : "grid-cols-2"} gap-1`} id={(showwcasePostImages?.length === 3 || twitterPostImages?.length === 3) ? "three-images" : ""} >
                                {
                                    platform === TABS[0] ?
                                        (showwcasePostImages && showwcasePostImages.map((postImage) => (
                                            <img key={postImage} src={postImage} alt="post_image" loading='lazy' className={`bg-gray-500  w-full rounded-md object-contain bg-contain ${(showwcasePostImages?.length === 2 || twitterPostImages?.length === 2) ? "h-[280px] w-[250px]" : " max-h-[370px] "}`} />
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
                                        ((showwcaseLink && showwcaseLink !== "null") && showwcaseLink.type !== "thread") && <ThreadLink title={showwcaseLink.title} description={showwcaseLink.description} url={showwcaseLink.url} images={showwcaseLink.images} />
                                    )
                                )
                                    : <></>
                                // (postContent.length < 350 && (twitterPostImages && twitterPostImages?.length < 1)) && (
                                //     (twitterLink) && <ThreadLink title={twitterLink.title} description={twitterLink?.description || twitterLink.expanded_url} url={twitterLink.url} images={twitterLink.images || [""]} />
                                // )
                            }
                            {
                                platform === TABS[0] ? (
                                    showwcasePoll && <ShowwcasePoll options={showwcasePoll.options} totalVotes={showwcasePoll.totalVotes} />

                                ) : (
                                    twitterPoll && <TwitterPoll />
                                )
                            }
                            <div className='flex justify-between items-center mt-3'>
                                {
                                    showStats && (
                                        <ul className='flex gap-3 '>
                                            <li className="flex items-center gap-1">
                                                <AiTwotoneHeart className="text-red-400" size={17} />
                                                <p className={`text-gray-600 ${cardTheme === "dark" && "text-white"} text-sm`}>{likeCount}</p>
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <FaRegComment size={17} />
                                                <p className={`text-gray-600 ${cardTheme === "dark" && "text-white"} text-sm`}>{replyCount}</p>
                                            </li>
                                        </ul>
                                    )
                                }
                                <small className={`${!showStats && " w-full flex justify-end"}`}>
                                    {formatDate(datePosted)}
                                </small>
                            </div>

                        </>)
                    }

                </div>
            </>

        </div>
    )
}

export default ThreadTemplate


