import { Router, Request, Response } from "express";

//router una función 

const router = Router();

//petición get , cuando alguien haga un http al sitio web va a obtener lo de mensajes
router.get('/mensajes', (req:Request, res: Response) => {
    //Mensaje de respuesta
    res.json({
        ok:true,
        mensaje: 'Todo esta bien'
    });
});

router.post('/mensajes/:id', (req:Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const id     = req.params.id;

    //Mensaje de respuesta
    res.json({
        ok:true,
        cuerpo,
        de,
        id
    });
});

export default router;