import Image from "next/image"
import { FC } from "react"
import { AiTwotoneHeart } from 'react-icons/ai'

interface IPost {
    platformLogo: string
    platform: string
    loading?: boolean
    images?: string[]
    name: string
    username: string
    content: string
}

const Post: FC<IPost> = ({ platformLogo, platform, loading, name, username, content, images }) => {
    return (
        <div className={`border w-[400px] min-w-[320px] max-w-[650px] p-6 bg-white shadow-2xl rounded-2xl relative ${loading ? "flex items-center justify-center" : ""}`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Image src="/assets/avatar.svg" className="w-[50px] rounded-full h-[50px] object-cover" alt="user_profile" width={50} height={50} />
                    <div className="flex flex-col">
                        <b>{name}</b>
                        <small className="text-gray-500">@{username}</small>
                    </div>
                </div>
                <Image src={`/assets/${platformLogo}`} alt={platform} width={30} height={30} className="w-[30px] rounded-full h-[30px] object-cover" />
            </div>
            <p className="my-3">{content}</p>
            {images?.map((item, index: number) => <Image key={index} src={item} className="w-full rounded-md h-[300px] border object-cover" alt="" width={0} height={0} />)}
            <ul>
                <li className="flex items-center gap-1">
                    <AiTwotoneHeart className="text-red-400" size={17} />
                    <p className="text-gray-600 text-sm">23.7K</p>
                </li>
            </ul>
        </div>
    )
}

export default Post