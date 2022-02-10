import React from 'react'

export default function Banner() {
  return (
    <div className="mx-auto border-y border-black bg-yellow-400 px-4 2xl:max-w-7xl">
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className="py-8 lg:py-0">
          <h1 className="max-w-xl pb-4 font-serif text-5xl font-bold leading-tight lg:max-w-2xl lg:text-6xl lg:leading-tight">
            <span className="underline">Medium</span> is a place to write, read,
            and connect
          </h1>
          <p className="text-sm">
            It's easy and free to post your any thinking on any topic and
            connect with milions of readers
          </p>
        </div>
        <img
          className="hidden object-contain md:inline md:h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="medium logo"
        />
      </div>
    </div>
  )
}
