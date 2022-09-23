import express from 'express'
const router = express.Router()

import {
	getAllPostsController,
	createPostController,
	updatePostController,
	calculatePostController,
} from '../controllers/postController.js'

router
	.get('/post/:id', getAllPostsController)
	.post('/calculate', calculatePostController)
	.post('/post', createPostController)
	.put('/post', updatePostController)

export default router
