import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { fetchBlogBySlug, Blog } from "@/lib/blog";

const BlogDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlog = async () => {
            if (!slug) return;

            console.log(`BlogDetail.tsx: Initializing blog load for slug: ${slug}...`);
            const data = await fetchBlogBySlug(slug);
            console.log("BlogDetail.tsx: Received data from fetchBlogBySlug:", data);
            setBlog(data);
            setLoading(false);

            if (data) {
                document.title = `${data.title} | Rebello Creation`;
                // Update meta description
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) {
                    metaDesc.setAttribute("content", data.excerpt);
                } else {
                    const meta = document.createElement("meta");
                    meta.name = "description";
                    meta.content = data.excerpt;
                    document.head.appendChild(meta);
                }
            }
        };

        loadBlog();
    }, [slug]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF8F5]">
                <EditorialHeader />
                <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
                    <div className="max-w-3xl mx-auto animate-pulse">
                        <div className="h-8 bg-[#E8E4DE] rounded w-1/4 mb-4" />
                        <div className="h-12 bg-[#E8E4DE] rounded w-3/4 mb-8" />
                        <div className="aspect-video bg-[#E8E4DE] rounded-2xl mb-10" />
                        <div className="space-y-4">
                            <div className="h-4 bg-[#E8E4DE] rounded w-full" />
                            <div className="h-4 bg-[#E8E4DE] rounded w-full" />
                            <div className="h-4 bg-[#E8E4DE] rounded w-2/3" />
                        </div>
                    </div>
                </div>
                <EditorialFooter />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#FAF8F5]">
                <EditorialHeader />
                <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-serif text-4xl text-[#2C3028] mb-6">
                            Blog Not Found
                        </h1>
                        <p className="text-[#5C5C5C] mb-8">
                            The blog post you're looking for doesn't exist or has been
                            removed.
                        </p>
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 text-[#6B7B5C] hover:gap-3 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blogs
                        </Link>
                    </div>
                </div>
                <EditorialFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <EditorialHeader />

            <article className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8"
                    >
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 text-[#6B7B5C] hover:gap-3 transition-all text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blogs
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <div className="flex items-center gap-4 text-sm text-[#8B8B8B] mb-4">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {formatDate(blog.published_at)}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                {blog.author}
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2C3028] leading-tight">
                            {blog.title}
                        </h1>
                    </motion.header>


                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="prose prose-lg prose-stone max-w-none
                       prose-headings:font-serif prose-headings:text-[#2C3028] prose-headings:mb-4 prose-headings:mt-8
                       prose-h2:text-2xl md:prose-h2:text-3xl
                       prose-h3:text-xl md:prose-h3:text-2xl
                       prose-p:text-[#4A4A4A] prose-p:leading-relaxed prose-p:mb-6
                       prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
                       prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
                       prose-li:text-[#4A4A4A]
                       prose-a:text-[#6B7B5C] prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-[#2C3028]
                       prose-img:rounded-xl
                       prose-blockquote:border-l-[#6B7B5C] prose-blockquote:italic prose-blockquote:text-[#5C5C5C]"
                        dangerouslySetInnerHTML={{ __html: blog.content_html }}
                    />
                </div>
            </article>

            <EditorialFooter />
        </div>
    );
};

export default BlogDetail;
