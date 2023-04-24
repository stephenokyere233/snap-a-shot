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

    // return (
    //     isLoading ? <Loader /> : (
    //         <div>
    //             <Image src={`/assets/${platformLogo}`} alt={selectedPlatform} width={200} height={200} className="w-12 rounded-full h-12 object-cover top-0 m-2 absolute right-0" />

    //             <div className="flex items-center gap-2 pb-2">
    //                 <Image src="/assets/avatar.svg" className="w-16 rounded-full h-16 object-cover" alt="user_profile" width={200} height={200} />
    //                 <div className="flex flex-col">
    //                     <div className="text-xl font-semibold">
    //                         <h2>
    //                             Username
    //                         </h2>
    //                     </div>
    //                     <span className="opacity-70">
    //                         @username
    //                     </span>
    //                 </div>
    //             </div>
    //             <p className="">
    //                 A social platform for remote workers: With the increase in remote work, there is a need for social platforms that cater to remote workers. A platform that allows remote workers to connect, share experiences, and even organize remote work events could be a great project.
    //             </p>
    //             <div className="flex justify-end pt-2 text-lg items-center gap-2">
    //                 <div className="flex items-center gap-2"><FiHeart color="red" />30</div>
    //                 <div className="flex items-center gap-2"><FaCommentDots />30</div>
    //             </div>

    //         </div>
    //     )


    // )
}

export default DummyTemplate