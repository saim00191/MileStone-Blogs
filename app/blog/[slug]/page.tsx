import { client } from "@/sanity/lib/client";
import Blog from "./Blog";
import { BlogPost } from "./types";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug } = await params;

  const query = `*[_type == "blog" && slug.current == $slug]{ 
    title,
    related,
    date,
    image,
    subimage,
    content
  }`;

  const blogPost : BlogPost[] = await client.fetch(query, { slug });

  if (!blogPost || blogPost.length === 0) {
    return <div>Blog post not found.</div>;
  }

  return <Blog blogPost={blogPost[0]} slug={slug} />;
};

export default BlogPage;

