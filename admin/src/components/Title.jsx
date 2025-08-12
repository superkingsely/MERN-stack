import React from 'react'

const Title = ({word1,word2}) => {
  return (
    <div className='text-[35px] font-[400] uppercase  flex gap-[15px] items-center justify-center ' >
        <span className='text-[#868686] ' >{word1}</span>
        <span>{word2}</span>
        <hr className="w-[50px] h-[2px] bg-black " />
    </div>
  )
}

export default Title