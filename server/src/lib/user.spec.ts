/* tslint:disable:no-unused-expression */

import { Card } from "./card";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";

import { expect } from "chai";
import "mocha";

describe("User Class Tests", () => {
    it("testing murder boolean", () => {
        const u1: User = new User("player1", 1, true);
        expect (u1.isMurderer()).to.equal(false);
        u1.murderer = true;
        expect (u1.isMurderer()).to.equal(true);
    });
    it("testing handContains", () => {
        const u1: User = new User("player1", 1, true);
        const fakeRoom = new Room("fake", 100);
        const WeaponCard = new Card(Weapon.Rope, "Weapon", Weapon.Rope);
        const UserCard = new Card(u1.name, "User", u1);
        const HallwayCard = new Card(fakeRoom.name, "Hallway", fakeRoom);

        u1.hand = [WeaponCard, UserCard, HallwayCard];
        expect (u1.handContains("Rope")).to.equal(true);
        expect (u1.handContains("player1")).to.equal(true);
        expect (u1.handContains("fake")).to.equal(true);
        expect (u1.handContains("abc")).to.equal(false);
    });

});
