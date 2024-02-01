import { checkIfSessionTokenIsValid } from "@contexts/AuthContext"
import { deletePost, updatePost } from "@contexts/ContentContext"
import { hasPermission } from "@contexts/UserContext"
import { isValidContentType } from "@contexts/ValidationContext"
import { Request, Response } from "express"

export const PATCH = [checkIfSessionTokenIsValid, async (req: Request, res: Response) => {
   const uid: string = res.locals.uid
   const postId: string = req.params.id
   const type: string = req.body.type
   const content: string = req.body.content

   Promise.all([
      isValidContentType(content, type),
      hasPermission(uid, postId)
   ])
      .then(() => {
         updatePost(postId, content, type).then((updatedPostId: string) => {
            res.status(200).json({ success: true, post: updatedPostId }) //return the updated post id
         }).catch((error) => { res.status(500).json({ success: false, message: error.message }) })
      }).catch((error) => { res.status(400).json({ success: false, message: error.message }) })
}]

export const DELETE = [checkIfSessionTokenIsValid, async (req: Request, res: Response) => {
   const uid: string = res.locals.uid
   const postId: string = req.params.id

   Promise.all([
      hasPermission(uid, postId),
   ])
      .then(() => {
         deletePost(postId).then(() => {
            res.status(200).json({ success: true }) //return a success message
         }).catch((error) => { res.status(500).json({ success: false, message: error.message }) })
      }).catch((error) => { res.status(400).json({ success: false, message: error.message }) })
}]
