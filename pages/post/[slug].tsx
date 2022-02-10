import { GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { IPost } from '../../typing'
import { PortableText } from '@portabletext/react'

interface Props {
  post: IPost
}

export default function Post({ post }: Props) {
  const date = new Date(post._createdAt)
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl p-4">
        <div className="h-56">
          <img
            className="h-full w-full object-cover"
            src={urlFor(post.mainImage).url()!}
            alt="banner post"
          />
        </div>
        <h1 className="pt-6 pb-2 text-4xl font-semibold">{post.title}</h1>
        <p className="pb-4 text-lg text-gray-500">{post.description}</p>
        <div className="flex items-center">
          <img
            className="h-11 w-11 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt="author image"
          />
          <p className="pl-4 text-gray-500">
            Blog post by{' '}
            <span className="font-semibold text-green-500">
              {post.author.name}
            </span>{' '}
            - Published at {date.getDate()}/{date.getMonth()}/
            {date.getFullYear()}
          </p>
        </div>
        <div className='pt-6'>
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }) => {
                  return <div className='md:w-1/2 mx-auto pt-2'>
                    <img className='w-full h-full' src={urlFor(value).url()!} />
                  </div>
                },
              },
              block: {
                h1: ({children}) => <h1 className="text-4xl pb-4">{children}</h1>,
                h2: ({children}) => <h2 className="text-3xl pb-4">{children}</h2>,
                h3: ({children}) => <h3 className="text-2xl pb-4">{children}</h3>,
                normal: ({children}) => <p className="text-lg pb-4">{children}</p>,
              },
            }}
          />
        </div>
      </main>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
        _id,
        slug,
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: IPost) => {
    return {
      params: {
        slug: post.slug.current,
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    mainImage,
    description,
    slug,
    author -> {
    name,
    image,
  },
    body,
  }
  `

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
