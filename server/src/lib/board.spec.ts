/* tslint:disable:no-unused-expression */

import { Board } from "./board";
import { Card } from "./card";
import { Deck } from "./deck";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";
import { WinCondition } from "./win-condition";

import { expect } from "chai";
import "mocha";

describe("Board Class Tests", () => {
  it("testing board initialization - users", () => {
    const u1 = new User("user1", 0, true);
    const u2 = new User("user2", 1, true);
    const u3 = new User("user3", 2, true);
    const u4 = new User("user4", 3, true);
    const u5 = new User("user5", 4, true);
    const u6 = new User("user6", 5, true);
    /*const r1 = new Room("Room1", 12);
    const h1 = new Hallway("Test Hallway", 0);
    const d1 = new Deck([u1, r1, Weapon.Rope]);*/
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);

    const contents = game.listPlayers();
    expect(contents[0].name).to.equal(u1.name);
    expect(contents[1].name).to.equal(u2.name);
    expect(contents[2].name).to.equal(u3.name);
    expect(contents[3].name).to.equal(u4.name);
    expect(contents[4].name).to.equal(u5.name);
    expect(contents[5].name).to.equal(u6.name);

    /*r1.enter(u1);
    let contents = b1.isLegalMove(r1, h1);
    expect(contents).to.equal(true);*/
  });

  it("testing nextPlayer", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const u1 = contents[0];
    game.currentPlayer = u1;
    expect (game.nextPlayer()).to.equal(contents[1]);
  });

  it("testing nextTurn", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    // const u1 = contents[0];
    // game.currentPlayer = u1;
    game.moveMade = true;
    game.guessMade = true;
    game.nextTurn();

    expect(game.currentPlayer).to.equal(contents[1]);
    expect(game.moveMade).to.equal(false);
    expect(game.guessMade).to.equal(false);
  });

  it("testing valid accusation", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();

    expect(game.isLegalAccusation(contents[0], contents[0].location)).to.equal(true);
  });

  it("testing invalid accusation", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const fakeRoom = new Room("fake", 100);

    expect(game.isLegalAccusation(contents[0], fakeRoom)).to.equal(false);
  });

  it("testing correct accusation", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const room = new Room("Test Room", 0);

    game.winCondition.murderer = contents[2];
    game.winCondition.murderRoom = room;
    game.winCondition.murderWeapon = Weapon.Rope;
    contents[0].location = room;
    room.enter(contents[0]);

    game.userAccusation(contents[0], contents[2], Weapon.Rope, room);

    expect(game.isLegalAccusation(contents[0], room)).to.equal(true);
    expect(game.gameOverStatus).to.equal(true);
  });

  it("testing incorrect accusation", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const room = new Room("Test Room", 0);

    game.winCondition.murderer = contents[2];
    game.winCondition.murderRoom = room;
    game.winCondition.murderWeapon = Weapon.Rope;
    contents[0].location = room;
    room.enter(contents[0]);

    expect(game.listPlayers()[0].inGame).to.equal(true);
    game.userAccusation(contents[0], contents[1], Weapon.Rope, room);
    expect(game.listPlayers()[0].inGame).to.equal(false);
  });

  it("testing legal move", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const room = new Room("Test Room", 0);
    const fakeRoom = new Room("fake", 100);

    contents[0].location.setAdjacencies([room]);

    expect(game.isLegalMove(contents[0].location, room)).to.equal(true);
    expect(game.isLegalMove(contents[0].location, fakeRoom)).to.equal(false);
    game.move(contents[0], room);
    expect(game.moveMade).to.equal(true);
    expect(contents[0].location).to.equal(room);
    expect(room.contains().indexOf(contents[0])).to.equal(0);
  });

  it("testing legal guess", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const room = new Room("Test Room", 0);
    const u1 = contents[0];

    u1.location.exit(u1);
    u1.location = room;
    room.enter(u1);
    expect(game.isLegalGuess(u1, room)).to.equal(true);
  });

  it("testing illegal guess", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const room = new Room("Test Room", 0);
    const u1 = contents[0];
    const fakeRoom = new Room("fake", 100);

    u1.location.exit(u1);
    u1.location = room;
    room.enter(u1);
    expect(game.isLegalGuess(u1, fakeRoom)).to.equal(false);
  });

  it("testing guess submission where card exists", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const room = new Room("Test Room", 0);
    const u1 = contents[0];
    const u2 = contents[1];
    const fakeRoom = new Room("fake", 100);
    let possibleCards: Card[];

    u1.location.exit(u1);
    u1.location = room;
    room.enter(u1);

    const WeaponCard = new Card(Weapon.Rope, "Weapon", Weapon.Rope);
    const UserCard = new Card(u1.name, "User", u1);
    const HallwayCard = new Card(room.name, "Hallway", room);
    game.nextPlayer().hand = [WeaponCard, UserCard, HallwayCard];
    possibleCards = [HallwayCard];

    expect(game.isLegalGuess(u1, room)).to.equal(true);
    expect(game.nextPlayer()).to.equal(u2);
    expect(game.nextPlayer().handContains("Rope")).to.equal(true);
    expect(game.userSubmitGuess(u1, u2, Weapon.Candlestick, room)).to.equal(HallwayCard.name);
  });

  it("testing guess submission where card does not exist", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const room = new Room("Test Room", 0);
    const u1 = contents[0];
    const u2 = contents[1];
    const fakeRoom = new Room("fake", 100);
    let possibleCards: Card[];

    u1.location.exit(u1);
    u1.location = room;
    room.enter(u1);

    const WeaponCard = new Card(Weapon.Rope, "Weapon", Weapon.Rope);
    const UserCard = new Card(u1.name, "User", u1);
    const HallwayCard = new Card(fakeRoom.name, "Hallway", fakeRoom);
    game.nextPlayer().hand = [WeaponCard, UserCard, HallwayCard];
    possibleCards = [HallwayCard];

    expect(game.isLegalGuess(u1, room)).to.equal(true);
    expect(game.userSubmitGuess(u1, u2, Weapon.Candlestick, room)).to.equal(null);
  });

  it("testing remove player", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const u1 = contents[0];
    game.removePlayer(u1);
    expect (u1.inGame).to.equal(false);
  });

  it("testing game over", () => {
    const game: Board = Board.initialize(["user1", "user2", "user3", "user4", "user5", "user6"]);
    const contents = game.listPlayers();
    const u1 = contents[0];
    const winner = game.gameOver();
    expect (game.gameOverStatus).to.equal(true);
    expect (winner).to.equal(u1);
  });
});
