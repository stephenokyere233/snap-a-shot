import React, { FC } from 'react'

interface Poll {
  createdAt: string
  endDate: string
  id: number
  isPublic: boolean
  options: Option[]
  question: string
  totalVotes: number
  updatedAt: string
  vote: undefined
  voters: any[]
}
interface Option {
  createdAt: string
  id: number
  option: string
  pollId: number
  totalVotes: number
  updatedAt: string
}

const ShowwcasePoll: FC<{ options: Option[], totalVotes: number }> = ({ options, totalVotes }) => {
  return (
    <div style={{ background: 'rgba(169, 169, 169, 0.2)' }} className='rounded-md p-3'>
      {
        options.map((opt) => {
          const { option, id } = opt
          console.log(option)
          return (<div key={id} className='flex gap-2 items-center'>
            <input type="radio" name="" id="" />
            <p>{option}</p>
          </div>)
        })
      }
      <div className='opacity-50 justify-end flex'>
        <small> Total Votes:<span>{totalVotes}</span> </small>
      </div>
    </div>
  )
}

export default ShowwcasePoll
