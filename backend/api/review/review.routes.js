const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addReview, getReviews, deleteReview } = require('./review.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getReviews)
    // WITHOUT AUTH - for checking:
router.post('/', log, addReview)
router.delete('/:id', deleteReview)
    // WITH AUTH
    // router.post('/', log, requireAuth, addReview)
    // router.delete('/:id', requireAuth, deleteReview)

module.exports = router