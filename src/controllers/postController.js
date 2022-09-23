import moment from 'moment'
import Post from '../models/post.js'

export const getAllPostsController = async (req, res) => {
	try {
		const posts = await Post.find().sort('-createdAt')
		await res.json(posts)
	} catch (e) {
		console.log(e)
	}
}

export const calculatePostController = async (req, res) => {
	const { from, to, startDate, endDate, pallet, distance } = req.body

	const momentStartDate = moment(startDate)
	const momentEndDate = moment(endDate)
	const TOTAL_DAYS = momentEndDate.diff(momentStartDate, 'days')
	console.log(req.body)

	if (!from || !to)
		return res.status(422).json({ message: 'All fields required!!!' })

	try {
		const COST_PALLET_SMALL = 8
		const COST_PALLET_SMALL_DELIVERY = 2
		const COST_PALLET_MEDIUM = 6
		const COST_PALLET_MEDIUM_DELIVERY = 1
		const COST_PALLET_LARGE = 5
		const COST_PALLET_LARGE_DELIVERY = 0.5
		const TARIFF_SMALL = 50
		const TARIFF_STANDARD = 51
		const TARIFF_PREMIUM = 1000

		// 	1 - 50 pallets (is 8$ per pallet per day) and (delivery 2$ per pallet per mile)
		// 51 - 1000 pallets is 6$ per pallet per day and delivery 1$ per pallet per mile
		// 1000+ pallets is 5$ per pallet per day and delivery 0.5$ per pallet per mile

		function updateSendOptions(params) {
			console.log(params)
			return res.json({ ...params })
		}
		const option = {}

		if (pallet >= 1 && pallet <= TARIFF_SMALL) {
			option.palletPerDay = pallet * COST_PALLET_SMALL * TOTAL_DAYS
			option.deliveryPallet = distance * COST_PALLET_SMALL_DELIVERY
			option.costPerPallet = COST_PALLET_SMALL
			option.costDeliveryPerMile = COST_PALLET_SMALL_DELIVERY
			option.distance = distance
			option.totalDays = TOTAL_DAYS
			option.total = option.palletPerDay + option.deliveryPallet
			updateSendOptions(option)
		} else if (pallet >= TARIFF_STANDARD && pallet <= TARIFF_PREMIUM) {
			option.palletPerDay = pallet * COST_PALLET_MEDIUM * TOTAL_DAYS
			option.deliveryPallet = distance * COST_PALLET_MEDIUM_DELIVERY
			option.costPerPallet = COST_PALLET_MEDIUM
			option.costDeliveryPerMile = COST_PALLET_MEDIUM_DELIVERY
			option.totalDays = TOTAL_DAYS
			option.distance = distance
			option.total = option.palletPerDay + option.deliveryPallet
			updateSendOptions(option)
		} else if (pallet >= 1001) {
			option.palletPerDay = pallet * COST_PALLET_LARGE * TOTAL_DAYS
			option.deliveryPallet = distance * COST_PALLET_LARGE_DELIVERY
			option.costPerPallet = COST_PALLET_LARGE
			option.costDeliveryPerMile = COST_PALLET_LARGE_DELIVERY
			option.distance = distance
			option.totalDays = TOTAL_DAYS
			option.total = option.palletPerDay + option.deliveryPallet
			updateSendOptions(option)
		} else {
			return res.status(422).json({ message: 'Pallet should be at least 1' })
		}
	} catch (e) {
		console.log(e)
		return res.status(422).json({ message: 'Error: ' + e })
	}
}

export const createPostController = async (req, res) => {
	try {
		const createPost = await new Post({ ...req.body })
		createPost.save().then(() => res.json(createPost))
	} catch (e) {
		console.log(e)
		return res.status(422).json({ message: 'Error: ' + e })
	}
}

export const updatePostController = async (req, res) => {
	console.log('body', req.body)
	try {
		Post.findByIdAndUpdate(
			req.body.postId,
			{ ...req.body },
			{ new: true }
		).exec((err, post) => {
			if (err) return res.status(422).json({ message: err })
			else return res.status(200).json(post)
		})
	} catch (e) {
		return res.status(422).json({ message: 'postId is required' })
	}
}
