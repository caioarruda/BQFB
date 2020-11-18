const express = require("express");
const db = require("./database/config");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")
class App {
    constructor() {
        this.express = express();

        this.database();
        this.middlewares();
        this.cors();
        this.routes();

        this.express.listen(3001, () =>
            console.log(`Sua API REST está funcionando na porta 3001 `)
        );
    }

    database() {
        mongoose.connect(db.uri, { useNewUrlParser: true });
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(bodyParser.json());
    }
    cors() {
        this.express.use(cors());
    }

    routes() {
        this.express.use(require("./routes"));
    }
}
module.exports = new App().express;