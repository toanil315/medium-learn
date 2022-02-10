import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Post from '../components/Post';
import {sanityClient} from '../sanity';
import { IPost } from '../typing';

interface Props {
  posts: [IPost];
}

export default function Home({posts} : Props) {
  return (
    <div className="">
      <Head>
        <title>Medium Clone With Sanity</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <div className="pt-6 max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:space-x-4 lg:space-x-6 xl:space-x-8 gap-y-6">
        {
          posts.map(post => {
            return <div key={post._id}>
              <Post post={post} />
            </div>
          }) 
        }
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    mainImage,
    description,
    slug,
    author -> {
    name,
    image,
  },
  }
  `;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts
    }
  }
}
