import { interests } from "assets"
import { Request, Response } from "express"

export const GET = (_: Request, res: Response) => { res.status(200).json({ success: true, interests }) }
