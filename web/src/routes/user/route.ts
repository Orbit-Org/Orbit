import { Request, Response, Router } from "express";

const app: Router = Router();

app.get("/", (req: Request, res: Response) => {
   //TODO
   console.log(res.locals.uid);
   res.json({});
});

export default app;
