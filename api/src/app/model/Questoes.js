const mongoose = require("mongoose");

const QuestoesSchema = new mongoose.Schema(
    {
        "id": String,
        "materia": String,
        "vestibular": String,
        "resolucao": String,
        "enunciado": String,
        "numeroQuestao": Number,
        "ano": Number,
        "alternativas": [
            {
                "letra": String,
                "correta": Boolean,
                "texto": String
            }
        ],
        "disponivel": Boolean
    }
);

module.exports = mongoose.model("Questoes", QuestoesSchema);