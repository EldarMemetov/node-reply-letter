import { Router } from 'express';
import * as blogController from '../contollers/blogs.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const blogRouter = Router();

blogRouter.get('/', ctrlWrapper(blogController.getAllBlogsController));
blogRouter.get('/:id', ctrlWrapper(blogController.getBlogByIdController));
blogRouter.post('/', ctrlWrapper(blogController.addBlogController));
blogRouter.put('/:id', ctrlWrapper(blogController.updateBlogController));
blogRouter.delete('/:id', ctrlWrapper(blogController.deleteBlogController));

export default blogRouter;
