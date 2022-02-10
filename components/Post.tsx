import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'
import { IPost } from '../typing'

interface Props {
  post: IPost
}

export default function Post({ post }: Props) {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="group shadow-lg cursor-pointer overflow-hidden rounded-lg">
        <div className="h-72 md:h-56 overflow-hidden">
          <img
            className="w-full h-full object-cover transition duration-200 ease-in-out group-hover:scale-105"
            src={urlFor(post.mainImage).url()!}
            alt="post image"
          />
        </div>
        <div className="px-2 py-4">
          <h3 className="text-2xl font-semibold">{post.title}</h3>
          <div className="flex items-center justify-between">
            <p className='w-3/4 truncate'>{post.description}</p>
            <p className='flex items-center'>
                By
            <img
              className="h-9 w-9 rounded-full ml-2"
              src={urlFor(post.author.image).url()!}
              alt="author image"
              title={post.author.name}
            />
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
