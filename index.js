const express = require("express");
let responseTime = require("response-time");
let {config} = require("./config");
let gzip = require("compression");
let logger4Js = require("log4js");
let loggerWinston = require("./utils/loggers/winston");
const app = express();
const PORT = config.port;
logger4Js.configure({
    appenders:{ cheese: { type:"file", filename: "cheese.log"}},
    categories: { default: { appenders:["cheese"], level:"info"}}
});
let pino = require("pino")({
    prettyPrint: {
        translateTime: "dd-mm hh",
        ignore: "pid,hostname"
    }
});


let saludo = "Hola Que tal!";

app.use(responseTime());

/* app.get("/info", (req, res, next)=>{      //sin gzip
    res.send(saludo.repeat(1000));
}); */


/* app.get("/info", gzip(), (req, res, next)=>{                 //con gzip
    // const compressed = await gzip(`${saludo.repeat(1000)}`)
    res.send(saludo.repeat(1000));
});
*/


let isnum = num => !isNaN(num);

app.get("/suma", (req, res, next)=>{
    // let logger = logger4Js.getLogger('cheese');
    try {
        let { a, b } = req.query; 
        if(!a || !b) {
            loggerWinston.info("Falta información para realizar el servicio");
            // logger.fatal("Falta información para realizar el servicio");
            throw new Error("Falta información para realizar el servicio");
        }
        if(!isnum(a) || !isnum(b)){
            loggerWinston.info("Has enviado un valor no válido para la suma");
            // logger.fatal("Has enviado un valor no válido para la suma");
            throw new Error("Has enviado un valor no válido para la suma");
        }
        let r = Number(a) + Number(b);
        loggerWinston.warning(`La suma entre ${a} + ${b} es ${r}`);
        // logger.info(`La suma entre ${a} + ${b} es ${r}`);
        res.send(`La suma entre ${a} + ${b} es ${r}`);
    } catch (error) {
        loggerWinston.error(JSON.stringify(error));
        // logger.error(JSON.stringify(error));
    }
    // const compressed = await gzip(`${saludo.repeat(1000)}`)
    res.send("Hubo un error");
});



app.get("/pino", (req, res, next)=>{
    pino.info("Desde pino, clase 18135");
    pino.error("Error desde pino");
    res.send(true);
});



app.listen(PORT, ()=>{
    console.log(`Server On http://localhost:${PORT}`);
})