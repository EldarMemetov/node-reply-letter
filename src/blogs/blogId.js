import BlogPost from '../db/models/BlogPost.js';

export const getBlogById = (id) => BlogPost.findById(id);

export const createBlog = (payload) => BlogPost.create(payload);

export const updateBlog = (id, data) =>
  BlogPost.findByIdAndUpdate(id, data, { new: true });

export const deleteBlog = (id) => BlogPost.findByIdAndDelete(id);
