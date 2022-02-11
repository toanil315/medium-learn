import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { IPost } from '../../typing'
import { PortableText } from '@portabletext/react'
import { useForm } from 'react-hook-form'

interface Props {
  post: IPost
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

export default function Post({ post }: Props) {
  const date = new Date(post._createdAt)
  const [submited, setSubmited] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const onSubmit = (data: IFormInput) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((value) => {
        setSubmited(true)
      })
      .catch((error) => {
        console.log(error)
        setSubmited(false)
      })
  }

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
        <div className="pt-6">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }) => {
                  return (
                    <div className="mx-auto pt-2 md:w-1/2">
                      <img
                        className="h-full w-full"
                        src={urlFor(value).url()!}
                      />
                    </div>
                  )
                },
              },
              block: {
                h1: ({ children }) => (
                  <h1 className="pb-4 text-4xl">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="pb-4 text-3xl">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="pb-4 text-2xl">{children}</h3>
                ),
                normal: ({ children }) => (
                  <p className="pb-4 text-lg">{children}</p>
                ),
              },
            }}
          />
        </div>
        <div>
          <span className="mx-auto mt-4 block h-[2px] w-full max-w-2xl bg-yellow-400"></span>
          {submited ? (
            <div className="mx-auto mt-2 box-border w-full max-w-2xl bg-yellow-500 p-4">
              <h3 className="mb-3 text-3xl font-bold text-white">
                Thank you for submitting your comment!
              </h3>
              <p className="text-sm text-white">
                Once it has been approved, it will appear bellow!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto mt-4 max-w-2xl"
            >
              <p className="font-semibold text-yellow-500">
                Enjoyed this article?
              </p>
              <h3 className="mb-4 mt-2 inline-block border-b-2 border-b-gray-600 pb-2 text-3xl font-bold text-gray-800">
                Leave a comment bellow!
              </h3>
              <div className="hidden">
                <label className="block font-semibold text-gray-700">
                  Name
                </label>
                <input
                  {...register('_id')}
                  value={post._id}
                  className="input-field"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold text-gray-700">
                  Name
                </label>
                <input
                  {...register('name', { required: true })}
                  className="input-field"
                  type="text"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-2 text-xs font-semibold text-red-700">
                    *Name is required!
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="block font-semibold text-gray-700">
                  Email
                </label>
                <input
                  {...register('email', { required: true })}
                  className="input-field"
                  type="text"
                  placeholder="Enter your name"
                />
                {errors.email && (
                  <p className="mt-2 text-xs font-semibold text-red-700">
                    *Email is required!
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="block font-semibold text-gray-700">
                  Comment
                </label>
                <textarea
                  {...register('comment', { required: true })}
                  className="input-field resize-none"
                  rows={5}
                  placeholder="Enter your name"
                />
                {errors.comment && (
                  <p className="mt-2 text-xs font-semibold text-red-700">
                    *Comment is required!
                  </p>
                )}
              </div>
              <button
                className="mt-2 w-full rounded-md bg-yellow-500 py-2 text-center font-semibold text-white transition duration-150 ease-out hover:bg-yellow-600"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
        </div>
        <div className="mx-auto mt-6 box-border w-full max-w-2xl p-4 shadow-md shadow-yellow-500">
          <h3 className="mb-4 inline-block border-b-2 border-b-gray-600 pb-2 text-3xl font-bold text-gray-800">
            Comments
          </h3>
          {post.comment.map((comment) => {
            return (
              <p key={comment._id} className="mb-3">
                <span className="pr-2 text-lg font-semibold text-yellow-500">
                  {comment.name}:
                </span>
                {comment.comment}
              </p>
            )
          })}
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
    'comment': *[_type == "comment" && post._ref == ^._id] {
      _id,
      name,
      email,
      comment,
    },
    body,
  }`

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
