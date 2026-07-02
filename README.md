# CuriouslyCory's Developer/Personal Website

- Step 1: Clone the repository
- Step 2: Run `npm install`
- Step 3: ????
- Step 4: Profit

## Blog Feature

The website includes a custom blog system with the following features:

- **Custom Post Pages**: Each blog post is a custom Next.js page component with its own unique layout and features
- **Database Indexing**: Custom posts are still indexed in the database for search and listings
- **Manual Indexing**: Blog indexing is decoupled from the build; run `pnpm blog:index` to extract metadata from custom post components and update the database. This runs manually today and moves to CI on merge in a future update.
- **Rich Features**: Full support for pagination, tags, search, featured posts, and more
- **SEO Friendly**: Automatic metadata generation for each post

### How to Create a Blog Post

1. Create a new directory under `src/app/blog/your-post-slug/`
2. Create a `page.tsx` file in that directory with your custom content
3. Include a special comment with your post metadata:

```tsx
{/* 
  ---
  title: Your Post Title
  excerpt: Short description of your post
  coverImage: /images/blog/your-image.jpg
  publishedAt: 2023-12-15
  featured: true
  tags: tag1,tag2,tag3
  --- 
*/}
```

4. Run `pnpm blog:index` to index the new post (search and listings won't show it until you do). Blog indexing is decoupled from the build; it runs manually until CI automation lands.

## Development Commands

| Command             | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `pnpm dev`           | Start the local dev server with Turbopack                    |
| `pnpm lint`           | Run ESLint                                                    |
| `pnpm typecheck`      | Run the TypeScript compiler in `--noEmit` mode                |
| `pnpm build`          | Build for production (does not touch the database)            |
| `pnpm blog:index`     | Index blog posts (extract metadata from custom post components and update the database) |

## Credits

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
