export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    content: string;
    tags?: string[];
    author?: string;
}
