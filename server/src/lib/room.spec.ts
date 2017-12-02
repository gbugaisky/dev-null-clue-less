/* tslint:disable:no-unused-expression */

import { Room } from "./room";
import { User } from "./user";

import { expect } from "chai";
import "mocha";

describe("Room Class Tests", () => {
  it("permits more than one person in the room at a time", () => {
    const u1 = new User("User 1", 1, false);
    const u2 = new User("User 2", 2, false);

    const room = new Room("Test Room", 0);

    room.enter(u1);
    let contents = room.contains();
    expect(contents.length).to.equal(1);
    expect(contents[0].playerId).to.equal(1);

    expect(room.enter(u2)).to.be.true;

    contents = room.contains();
    expect(contents.length).to.equal(2);
    expect(contents[0].playerId).to.equal(1);
    expect(contents[1].playerId).to.equal(2);
  });
});
