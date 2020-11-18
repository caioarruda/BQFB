const mongoose = require("mongoose");

const SimuladosSchema = new mongoose.Schema(
    {
        "sessao": String,
        "id": String,
        "username": String,
        "quantidade": Number,
        "questoes": [
            {
                "id": String,
                "inicio": Date,
                "fim": Date,
                "tempo": Number,
                "resposta": String,
                "correta": String
            }
        ],
        "finalizado": Boolean
    }
);

module.exports = mongoose.model("Simulados", SimuladosSchema);