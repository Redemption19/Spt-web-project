// app/media/blog/page.tsx
import { BlogCard } from '../../../components/blog-card';
import { blogPosts } from '../../../lib/constants';
import { BlogPost } from '../../../lib/schemas/blog-schema';

export default function BlogPage() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="section-title">Our Blog</h2>
          <p className="section-subtitle mx-auto">
            Discover insights, news, and updates from our team.
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="card-hover">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
