/* tslint:disable:no-unused-expression */

import { Room } from "./room";
import { User } from "./user";

import { expect } from "chai";
import "mocha";

describe("Room Class Tests", () => {
  it("only permits one person in the room at a time", () => {
    const u1 = new User("User 1", 1);
    const u2 = new User("User 2", 2);

    const room = new Room("Test Room", 0);

    room.enter(u1);
    let contents = room.contains();
    expect(contents.length).to.equal(1);
    expect(contents[0].playerId).to.equal(1);

    expect(room.enter(u2)).to.be.false;

    contents = room.contains();
    expect(contents.length).to.equal(1);
    expect(contents[0].playerId).to.equal(1);
  });
});
