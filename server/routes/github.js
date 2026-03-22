import express from "express"
import axios from "axios"
import rateLimit from "express-rate-limit"

const router = express.Router()

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30
})

router.use(limiter)

router.get("/:username", async (req, res) => {

  try {

    const { username } = req.params

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    )

    res.json(response.data)

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch repositories"
    })

  }

})

export default router