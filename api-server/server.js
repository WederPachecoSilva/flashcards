// @ts-check

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const decks = require("./decks");
const morgan = require("morgan");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const token = req.get("Authorization");

  if (token) {
    // @ts-ignore
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error:
        "Please provide an Authorization header to identify yourself (can be whatever you want)",
    });
  }
});

app.get("/decks", (req, res) => {
  // @ts-ignore
  decks.getDecks(req.token).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.get("/deck/:deckId", (req, res) => {
  // @ts-ignore
  decks.getDeck(req.token, req.params.deckId).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.post("/deck", bodyParser.json(), (req, res) => {
  const { body } = req;
  // @ts-ignore
  decks.addDeck(req.token, body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.delete("/deck/:deckId", (req, res) => {
  // @ts-ignore
  decks.deleteDeck(req.token, req.params.deckId).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.get("/cards/:deckId", (req, res) => {
  // @ts-ignore
  decks.getCardsByDeck(req.token, req.params.deckId).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.post("/card/:deckId", bodyParser.json(), (req, res) => {
  // const { card } = req.body;
  const { deckId } = req.params;
  // @ts-ignore
  decks.addCard(req.token, deckId, req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.delete("/card/:deckId/:cardId", (req, res) => {
  // @ts-ignore
  decks.deleteCard(req.token, req.params.cardId, req.params.deckId).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error.",
      });
    }
  );
});

app.listen(config.port, () => {
  console.log("Server listening on port %s, Ctrl+C to stop", config.port);
});
