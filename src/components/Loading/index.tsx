import React from 'react'
import './index.css'

type LoadingProps = {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="transform -translate-y-1/2">
        <div className="m-auto mb-8">
          <p className="leading-4">
            Microsoft<span className="inline-block transform -translate-y-1 text-xs">©</span>
          </p>
          <p className="text-5xl font-bold">
            Windows<span className="xp inline-block transform -translate-y-3 text-2xl">XP</span>
          </p>
          <p className="leading-none text-xl">Professional</p>
        </div>
        <div className="progress flex items-center m-auto w-52 h-4 rounded-lg border-solid border-2 overflow-hidden">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
