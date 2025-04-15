import createHttpError from 'http-errors';
import { getBlogs } from '../blogs/blog.js';
import {
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../blogs/blogId.js';
import { validateBlog } from '../validation/blogValidator.js';

export const getAllBlogsController = async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = parseInt(req.query.page) || 1;
  const sortBy = req.query.sortBy || '_id';

  const sortOrder = req.query.sortOrder ? parseInt(req.query.sortOrder) : 1;

  const filter = {};
  if (req.query.theme) {
    filter.theme = req.query.theme;
  }

  const data = await getBlogs({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found blog posts!',
    data,
  });
};

export const getBlogByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getBlogById(id);
  if (!data) {
    throw createHttpError(404, `Blog post with id=${id} not found`);
  }
  res.json({
    status: 200,
    message: `Blog post ${id}`,
    data,
  });
};

export const addBlogController = async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) {
    throw createHttpError(400, error.details.map((e) => e.message).join(', '));
  }

  const payload = req.body;
  const data = await createBlog(payload);

  res.status(201).json({
    status: 201,
    message: 'Successfully created blog post!',
    data,
  });
};

export const updateBlogController = async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) {
    throw createHttpError(400, error.details.map((e) => e.message).join(', '));
  }

  const { id } = req.params;
  const data = await updateBlog(id, req.body);
  if (!data) {
    throw createHttpError(404, `Blog post with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully updated blog post!',
    data,
  });
};

export const deleteBlogController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteBlog(id);
  if (!data) {
    throw createHttpError(404, `Blog post with id=${id} not found`);
  }
  res.status(204).send();
};
