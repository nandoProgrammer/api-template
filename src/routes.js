import { Router } from "express";
import multer from "multer";
import multerConfig  from "./config/multer";

const routes = new Router();
const upload = multer(multerConfig);

import auth from "./app/middlewares/auth";
import sessions from "./app/controllers/SessionsController";

// Sessions
routes.post("/auth", sessions.create);

// Controla o acesso a partir desse ponto
routes.use(auth);

routes.post("/upload", upload.single("file"), (req, res) => {
    return res.json({message: "Ok"})
})

export default routes;