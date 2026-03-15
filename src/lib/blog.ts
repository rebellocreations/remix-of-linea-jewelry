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
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

    if (error) {
        if (import.meta.env.DEV) console.error("Supabase Error (fetchPublishedBlogs):", error);
        return [];
    }

    return data || [];
}

/**
 * Fetch a single blog by its slug
 */
export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

    if (error) {
        if (import.meta.env.DEV) console.error(`Supabase Error (fetchBlogBySlug for ${slug}):`, error);
        return null;
    }

    return data;
}
