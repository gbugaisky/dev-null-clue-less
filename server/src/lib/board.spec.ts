/* tslint:disable:no-unused-expression */

import { Board } from "./board";
import { Deck } from "./deck";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";
import { WinCondition } from "./win-condition";

import { expect } from "chai";
import "mocha";

describe("Board Class Tests", () => {
  it("testing legal moves", () => {
    const u1 = new User("user1", 1, true);
    const u2 = new User("user2", 2, true);
    /*const r1 = new Room("Room1", 12);
    const h1 = new Hallway("Test Hallway", 0);
    const d1 = new Deck([u1, r1, Weapon.Rope]);*/
    const game: Board = Board.initialize(["user1", "user2"]);

    const contents = game.listPlayers();
    expect(contents).to.equal([u1, u2]);

    /*r1.enter(u1);
    let contents = b1.isLegalMove(r1, h1);
    expect(contents).to.equal(true);*/
  });
});
