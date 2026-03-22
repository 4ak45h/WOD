import express from "express"
import cors from "cors"
import githubRoute from "./routes/github.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/github", githubRoute)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})