# WebGwent #

WebGwent is a web-based implementation of the popular turn-based card game from the Witcher 3. The game is played by two players both starting with 10 cards in their hand. When the round is over, the cards’ power scores are calculated to a total score. Player with the highest total number of power scores wins the round.

#### Cards? Power scores? 
The game is simulating a battle and has three types of cards: infantry, ranged and siege. Each unit card has a power score and might have a secondary ability. Each turn a player plays a card or passes the turn. Passing the turn will prevent the player from playing in the current round further. At the start of every round the battle score is reset, and the board is cleared. A game is won with 2 round wins.


## Introduction 
The game is built using Express.js framework on backend and React on frontend. Socket.io is used to maintain fast  
real-time, bidirectional, event-based communication.

### The tools used in development include

- [Node.js](https://nodejs.org/en/) + [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/) with [React Router](https://reactrouter.com/)
- [Socket.io](https://socket.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

You should have a PostgreSQL database setup before you run the project. Edit the `config.js` file in the backend folder with relevant data, or use [dotenv](https://www.npmjs.com/package/dotenv) to create and load local environmental variables. Provide `PORT, SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE, DATABASE_URL`.


Step 1: Clone this repo
```
git clone https://github.com/PZDuck/webgwent
```

Step 2: Navigate to the `/backend` folder and run `npm install`

Step 3: Run the backend server

```
node server.js
```

Step 4: Navigate to the `/frontend` folder and run `npm install`

Step 5: Run the frontend server

```
npm start
```

Step 6: The application will open in a new browser tab. You are now free to use and explore it

## Backend Api
#### Users

##### GET
/users - get a list of all users                                                                          

/users/:userId - get a user by userId                                                    

##### POST
/users/register - register a user                                                                   
/users/login - login a user                                                                 

##### DELETE
/users/:userId - delete user’s account                                                    
 
----------

#### Matches

##### GET
/matches                                                                     - get a list of all matches

/matches/:userId - get a list of matches the user played           


##### POST
/matches - record a match                                                              
 
----------

#### Cards

##### GET
/cards - get a list of all available cards                                                                         

/cards?faction=:faction - get a list of cards of the faction                                           

/cards/:key - get a card by key                                                               

----------

#### Decks

##### GET
/decks - get all decks                                                                          

/decks/:deckId - get a deck by deck id                                                        


## Schema
![](https://i.ibb.co/MZbvXyb/Deluxe-Auto-Repair.png)

