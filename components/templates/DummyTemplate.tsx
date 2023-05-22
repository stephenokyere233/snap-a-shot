import { FC } from "react"
import { FaCommentDots } from "react-icons/fa"
import { FiHeart } from "react-icons/fi"
import Image from "next/image"
import Loader from "../loader"

const DummyTemplate: FC<{ platformLogo: string, platform: string, isLoading: boolean }> = ({ platformLogo, platform, isLoading }) => {
    return <div>
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image src="/assets/avatar.svg" className="w-[50px] rounded-full h-[50px] object-cover" alt="user_profile" width={50} height={50} />
                <div className="flex flex-col">
                    <b>John Doe</b>
                    <small>@johndoe</small>
                </div>
            </div>
            <Image src={`/assets/${platformLogo}`} alt={platform} width={30} height={30} className="w-[30px] rounded-full h-[30px] object-cover" />
        </div>
        <p className="my-3">A social platform for remote workers: With the increase in remote work, there is a need for social platforms that cater to remote workers.</p>
        <Image src="/assets/avatar.svg" className="w-full rounded-md h-[300px] border object-cover" alt="user_profile" width={50} height={50} />
    </div>
}

export default DummyTemplate