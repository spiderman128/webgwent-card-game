const db = require("./db");
const bcrypt = require("bcrypt");

const BCRYPT_WORK_FACTOR = 10;

class Api {
  constructor() {}

  async authenticateUser(data) {
    const result = await db.query(
      `SELECT username, 
                password, 
                email, 
                rating, 
                wins, 
                losses,
                ratio
          FROM users 
          WHERE username = $1`,
      [data.username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(data.password, user.password);

      if (isValid) return user;
    }

    const invalid = new Error("Invalid Credentials");
    invalid.status = 401;
    throw invalid;
  }

  async registerUser(data) {
    const duplicateCheck = await db.query(
      `SELECT username 
            FROM users 
            WHERE username = $1`,
      [data.username]
    );
    console.log(data);

    if (duplicateCheck.rows[0]) {
      const err = new Error(
        `There already exists a user with username '${data.username}`
      );
      err.status = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users 
            (username, password, email, rating, wins, losses, ratio) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) 
          RETURNING username, email, rating, wins, losses, ratio`,
      [data.username, hashedPassword, data.email, 1000, 0, 0, 0]
    );

    return result.rows[0];
  }

  async getUsers() {
    const result = await db.query(
      `SELECT username, email, rating
          FROM users
          ORDER BY username`
    );

    return result.rows;
  }

  async getUser(username) {
    const userRes = await db.query(
      `SELECT username, email, rating, wins, losses, ratio 
            FROM users 
            WHERE username = $1`,
      [username]
    );
    const user = userRes.rows[0];

    if (!user) {
      const error = new Error(`There exists no user '${username}'`);
      error.status = 404; // 404 NOT FOUND
      throw error;
    }

    return user;
  }

  async getCards() {
    let query = `
      SELECT card_key, name, power, ability, type, faction 
      FROM card`;

    const cardsRes = await db.query(query);
    return cardsRes.rows;
  }

  async getCard(key) {
    let query = `
      SELECT card_key, name, power, ability, type, faction 
      FROM card
      WHERE card_key = $1`;

    const cardsRes = await db.query(query, [key]);
    console.log(cardsRes.rows[0]);
    return cardsRes.rows[0];
  }

  async getDecks() {
    let deckQuery = `
      SELECT d.deck_id, f.name AS faction  
      FROM deck AS d 
      INNER JOIN faction AS f on d.faction_id = f.faction_id`;

    const decksRes = await db.query(deckQuery);
    console.log(decksRes.rows);
    return decksRes.rows;
  }

  async getDeck(id) {
    let out = {};
    let deckQuery = `
      SELECT d.deck_id, f.name AS faction  
      FROM deck AS d 
      INNER JOIN faction AS f on d.faction_id = f.faction_id`;

    const deckRes = await db.query(deckQuery);
    out = deckRes.rows[0];

    let cardsQuery = `
    SELECT c.card_key, c.name, c.power, c.ability, c.img, c.type, c.faction
    FROM card AS c
    INNER JOIN deck_card AS dc ON c.card_key = dc.card_key
    WHERE dc.deck_id = $1`;
    const cardsRes = await db.query(cardsQuery, [id]);

    out.cards = cardsRes.rows;

    return out;
  }
}

const API = new Api();

module.exports = API;
