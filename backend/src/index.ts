import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3333
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ msg: 'Hello World' })
})

app.listen(PORT, () => console.log(`> Server listen on port ${PORT}`))
