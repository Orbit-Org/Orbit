import { changeAll, interestsFromUID, retrieveUserDataFromUID } from '@contexts/UserContext'
import { areValidInterests, isValidUsername } from '@helpers/validate'
import { Request, Response, Router } from 'express'

const app: Router = Router()

app.get("/", async (req: Request, res: Response) => {

   const uid: string = res.locals.uid

   const interests: string[] = await interestsFromUID(uid)
   const { username, name, pfp } = await retrieveUserDataFromUID(uid)

   res.status(200).json({ interests: interests, username: username, name: name, pfp: pfp })
})

app.patch("/", async (req: Request, res: Response) => {
   const uid: string = res.locals.uid
   const interests: string[] = req.body.interests
   const username: string = req.body.username
   const name: string = req.body.name
   const pfp: string = req.body.pfp
   console.log(username)
   Promise.all([isValidUsername(username), areValidInterests(interests)]).then(() => {
      changeAll(uid, interests, username, name, pfp)
      res.status(200).json({})
   }).catch((error: Error) => {
      res.status(400).json({ message: error.message })
   })
})

export default app