import { checkIfSessionTokenIsValid } from '@contexts/AuthContext'
import signin from '@routes/auth/sign-in/route'
import signup from '@routes/auth/sign-up/route'
import healthz from '@routes/healthz/route'
import home from '@routes/home/route'
import interests from '@routes/interests/route'
import user from '@routes/user/route'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

dotenv.config()
const app: Express = express()

app.use(cors()) //TODO change to vercel domain
app.use(express.json())

app.use('/', healthz)
app.use('/auth/sign-in', signin)
app.use('/auth/sign-up', signup)
app.use('/interests', interests)
app.use('/home', checkIfSessionTokenIsValid, home)
app.use('/u', checkIfSessionTokenIsValid, user)

app.set('view engine', 'ejs')
app.use('*', (_: Request, res: Response) => { res.render('404') })

app.listen(process.env.PORT, () => { console.log(`⚡[server]: server is running on port: http://localhost:${process.env.PORT}`) }) //TODO REMOVE IN PRODUCTION
