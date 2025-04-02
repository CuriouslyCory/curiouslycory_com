#!/usr/bin/env node
// This script runs the blog post indexer

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';
import * as process from 'process';

// Setup environment variables from .env
config();

// Import the blog indexer function
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use dynamic import for the blog indexer
async function main() {
  try {
    // Dynamically import the blog indexer
    const { indexBlogPosts } = await import('./blog-indexer.js');
    await indexBlogPosts();
  } catch (error) {
    console.error("Failed to index blog posts:", error);
    process.exit(1);
  }
}

main(); 