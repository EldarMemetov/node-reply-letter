import BlogPost from '../db/models/BlogPost.js';

export const getBlogs = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = 1,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const blogsQuery = BlogPost.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(perPage);

  const blogs = await blogsQuery;
  const totalItems = await BlogPost.countDocuments(filter);

  return {
    page,
    perPage,
    totalItems,
    blogs,
  };
};
