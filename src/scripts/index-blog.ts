#!/usr/bin/env tsx
// This script runs the blog post indexer

import { config } from 'dotenv';

// Setup environment variables from .env
config();

// Import the blog indexer function
import { indexBlogPosts } from './blog-indexer.js';

async function main(): Promise<void> {
  try {
    await indexBlogPosts();
  } catch (error) {
    console.error("Failed to index blog posts:", error);
    process.exit(1);
  }
}

void main();
