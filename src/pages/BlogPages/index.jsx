import Overview from '../../components/Overview/Index';
import BlogHero from '../../components/BlogHero/Index';
import BlogContent from '../../components/BlogContent/Index';

function BlogPage() {
    return (
        <div className="blog-page">
            <BlogHero />
            <Overview />
            <BlogContent />
        </div>
    );
}

export default BlogPage;