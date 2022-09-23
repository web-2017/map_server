import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const typeString = {
	type: String,
	required: true,
}
const postSchema = new mongoose.Schema(
	{
		from: typeString,
		to: typeString,
		pallet: typeString,
		startDate: typeString,
		endDate: typeString,
		distance: typeString,
	},

	{ timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
export default Post
