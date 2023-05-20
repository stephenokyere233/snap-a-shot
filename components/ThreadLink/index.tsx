import Link from 'next/link'
import React, { FC } from 'react'

const ThreadLink: FC<{ title: string, description: string, url: string, images: string[] }> = ({ title, description, url, images }) => {
    return (
        <div className='border rounded-md p-2'>
            <Link href={url ? url : ""} className=' text-gray-500'>
                {images && <img src={images[0]} className='w-full' alt="threadlink" width={500} height={200} />}
                <div>
                    <h2 className='text-black'>{title}</h2>
                    <p>{description}</p>
                </div>
            </Link>
        </div>
    )
}

export default ThreadLink
