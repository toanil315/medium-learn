export interface IPost {
    _createdAt: string;
  _id: string;
  author: {
    name: string;
    image: string;
  };
  description: string;
  mainImage: {
    _type: string;
    asset: {
      url: string;
    }
  };
  slug: {
    _type: string;
    current: string;
  };
  title: string;
  body: any;
}