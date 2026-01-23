import { supabase } from "./supabase";

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content_html: string; // HTML content
    hero_image_url: string;
    author: string;
    status: 'draft' | 'published';
    published_at: string;
    created_at: string;
}

/**
 * Fetch all published blogs, ordered by newest first
 */
export async function fetchPublishedBlogs(): Promise<Blog[]> {
    console.log("Supabase: Fetching published blogs from 'blog_posts'...");
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

    if (error) {
        console.error("Supabase Error (fetchPublishedBlogs):", error);
        return [];
    }

    console.log(`Supabase Success: Fetched ${data?.length || 0} blogs:`, data);
    return data || [];
}

/**
 * Fetch a single blog by its slug
 */
export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
    console.log(`Supabase: Fetching blog with slug (${slug}) from 'blog_posts'...`);
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

    if (error) {
        console.error(`Supabase Error (fetchBlogBySlug for ${slug}):`, error);
        return null;
    }

    console.log(`Supabase Success: Fetched blog details for ${slug}:`, data);
    return data;
}
