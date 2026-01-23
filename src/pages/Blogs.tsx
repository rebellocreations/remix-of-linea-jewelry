import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import EditorialHeader from "@/components/header/EditorialHeader";
import EditorialFooter from "@/components/footer/EditorialFooter";
import { fetchPublishedBlogs, Blog } from "@/lib/blog";

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Blog | Rebello Creation";

        const loadBlogs = async () => {
            console.log("Blogs.tsx: Initializing blog load...");
            const data = await fetchPublishedBlogs();
            console.log("Blogs.tsx: Received data from fetchPublishedBlogs:", data);
            setBlogs(data);
            setLoading(false);
        };

        loadBlogs();
    }, []);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <EditorialHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C3028] mb-6"
                    >
                        Stories & Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-[#5C5C5C] max-w-2xl mx-auto"
                    >
                        Discover the stories behind sustainable living, craftsmanship, and
                        the journey of transforming waste into wonder.
                    </motion.p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="px-6 md:px-12 lg:px-20 pb-24">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white/60 rounded-2xl overflow-hidden animate-pulse"
                                >
                                    <div className="aspect-[16/10] bg-[#E8E4DE]" />
                                    <div className="p-6 space-y-4">
                                        <div className="h-4 bg-[#E8E4DE] rounded w-1/3" />
                                        <div className="h-6 bg-[#E8E4DE] rounded w-full" />
                                        <div className="h-4 bg-[#E8E4DE] rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[#5C5C5C] text-lg">
                                No blog posts available yet. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog, index) => (
                                <motion.article
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <Link
                                        to={`/blogs/${blog.slug}`}
                                        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                                    >
                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-sm text-[#8B8B8B] mb-3">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatDate(blog.published_at)}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-4 h-4" />
                                                    {blog.author}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="font-serif text-xl md:text-2xl text-[#2C3028] mb-3 group-hover:text-[#6B7B5C] transition-colors">
                                                {blog.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-[#5C5C5C] text-sm line-clamp-2 mb-4">
                                                {blog.excerpt}
                                            </p>

                                            {/* Read More */}
                                            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7B5C] group-hover:gap-3 transition-all">
                                                Read More
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <EditorialFooter />
        </div>
    );
};

export default Blogs;
