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
    const u1 = new User("User 1", 1);
    const u2 = new User("User 2", 2);
    const r1 = new Room("Room1", 12);
    const h1 = new Hallway("Test Hallway", 0);
    const d1 = new Deck([u1, r1, Weapon.Rope]);
    const b1 = new Board(u1, [u1, u2], d1);


    r1.enter(u1);
    let contents = b1.isLegalMove(r1, h1);
    expect(contents).to.equal(true);
  });
});
