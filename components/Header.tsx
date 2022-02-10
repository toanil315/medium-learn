import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className=" sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/">
            <img
              className="h-12 cursor-pointer object-contain"
              src="https://upload.wikimedia.org/wikipedia/en/6/67/Medium_logo_%282020%29.png"
              alt="logo"
            />
          </Link>
          <div className="ml-4 hidden items-center space-x-6 font-semibold md:flex lg:ml-8">
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className="cursor-pointer rounded-full bg-green-500 px-4 py-1 text-white">
              Follow
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-4 font-semibold text-green-500">
          <h3>Sign in</h3>
          <h3 className="cursor-pointer rounded-full border border-green-500 px-4 py-1">
            Get Started
          </h3>
        </div>
      </div>
    </header>
  )
}
