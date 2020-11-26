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

  async updateUserRating(username, data) {
    console.log(data);
    const result =
      data.won === true
        ? await db.query(
            `UPDATE users SET rating=$1, wins = wins + 1, ratio = CASE WHEN losses = 0 THEN wins ELSE TRUNC(((wins + 1)::numeric / losses::numeric),2) END WHERE username=$2 RETURNING *`,
            [data.rating, username]
          )
        : await db.query(
            `UPDATE users SET rating=$1, losses = losses + 1, ratio = CASE WHEN losses = 0 THEN wins ELSE TRUNC((wins::numeric / (losses + 1)::numeric),2) END WHERE username=$2 RETURNING *`,
            [data.rating, username]
          );

    return result.rows[0];
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

  async getUserMatches(username) {
    const user = await db.query(`SELECT id FROM users WHERE username = $1`, [
      username,
    ]);

    const result = await db.query(
      `SELECT m.id, m.winner, m.loser, m.winner_faction, m.loser_faction, m.winner_rating, m.loser_rating, m.date, u.username AS winner_name, u2.username AS loser_name
          FROM match AS m INNER JOIN users AS u ON u.id = m.winner INNER JOIN users AS u2 ON u2.id = m.loser
          WHERE m.winner = $1 or m.loser = $1
          ORDER BY date`,
      [user.rows[0].id]
    );
    console.log(result.rows);
    return result.rows;
  }

  async getMatch(key) {
    const result = await db.query(
      `SELECT id, winner, loser, winner_faction, loser_faction, winner_rating, loser_rating, date
        FROM match
        WHERE id = $1 `,
      [key]
    );

    return result.rows[0];
  }

  async recordMatch(matchInfo) {
    const winner = await db.query(`SELECT id FROM users WHERE username = $1`, [
      matchInfo.winner.username,
    ]);
    const loser = await db.query(`SELECT id FROM users WHERE username = $1`, [
      matchInfo.loser.username,
    ]);

    const winner_faction = await db.query(
      `SELECT faction_id FROM faction WHERE name = $1`,
      [matchInfo.winner.faction]
    );
    const loser_faction = await db.query(
      `SELECT faction_id FROM faction WHERE name = $1`,
      [matchInfo.loser.faction]
    );

    const result = await db.query(
      `INSERT INTO match 
            (winner, loser, winner_faction, loser_faction, winner_rating, loser_rating, date) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) 
          RETURNING winner, loser, winner_faction, loser_faction, winner_rating, loser_rating, date`,
      [
        winner.rows[0].id,
        loser.rows[0].id,
        winner_faction.rows[0].faction_id,
        loser_faction.rows[0].faction_id,
        matchInfo.winner.rating,
        matchInfo.loser.rating,
        matchInfo.date,
      ]
    );

    return result.rows[0];
  }
}

const API = new Api();

module.exports = API;
