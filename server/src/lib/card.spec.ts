/* tslint:disable:no-unused-expression */

import { Card } from "./card";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";

import { expect } from "chai";
import "mocha";

describe("Card Class Tests", () => {
    it("testing contains", () => {
        const u1: User = new User("player1", 1, true);
        const fakeRoom = new Room("fake", 100);
        const WeaponCard = new Card(Weapon.Rope, "Weapon", Weapon.Rope);
        const UserCard = new Card(u1.name, "User", u1);
        const HallwayCard = new Card(fakeRoom.name, "Hallway", fakeRoom);

        expect (HallwayCard.contains()).to.equal("fake");
        expect (WeaponCard.contains()).to.equal("Rope");
        expect (UserCard.contains()).to.equal("player1");
    });

    it("testing isType()", () => {
        const u1: User = new User("player1", 1, true);
        const fakeRoom = new Room("fake", 100);
        const WeaponCard = new Card(Weapon.Rope, "Weapon", Weapon.Rope);
        const UserCard = new Card(u1.name, "User", u1);
        const HallwayCard = new Card(fakeRoom.name, "Hallway", fakeRoom);

        expect (HallwayCard.isType("Hallway")).to.equal(true);
        expect (WeaponCard.isType("Weapon")).to.equal(true);
        expect (UserCard.isType("User")).to.equal(true);
        expect (HallwayCard.isType("Weapon")).to.equal(false);
        expect (WeaponCard.isType("User")).to.equal(false);
        expect (UserCard.isType("Hallway")).to.equal(false);
    });

});
