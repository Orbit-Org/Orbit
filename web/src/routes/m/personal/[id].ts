import { Request, Response } from "express"
import { AuthService, CoreService, ValidationService } from "services"
import { IdResponse, UploadMessageRequest } from "types"

const auth: AuthService = new AuthService()
const valid: ValidationService = new ValidationService()
const core: CoreService = new CoreService()

export const POST = [auth.sessionGuard, async (req: Request, res: Response) => {
   const uid: string = res.locals.uid
   const chat_id: string = req.params.id
   const text: string = req.body.text
   const type: string = req.body.type
   const content: string = req.body.content

   const ereq: UploadMessageRequest = {
      text,
      content,
      type
   }

   valid.contentValidation(ereq.text, ereq.content, ereq.type).then(() => {
      valid.documentIdValidation(chat_id, "personal-chats").then(() => {
         core.getMembersFromChatId(uid, chat_id).then((members: string[]) => {
            core.newChatMessage(uid, chat_id, members, ereq.text, ereq.type, ereq.content).then((idResponse: IdResponse) => {
               res.status(201).json({
                  ...idResponse //return the post id
               })
            }).catch((error: Error) => { res.status(500).json({ error: error.message }) })
         }).catch((error: Error) => { res.status(500).json({ error: error.message }) })
      }).catch((error: Error) => { res.status(400).json({ error: error.message }) })
   }).catch((error: Error) => { res.status(400).json({ error: error.message }) })
}]