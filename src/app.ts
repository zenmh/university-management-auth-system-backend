import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.json('The server is running 🔥💧🔥')
})

export default app
