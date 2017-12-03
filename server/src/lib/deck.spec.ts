/* tslint:disable:no-unused-expression */

import { Deck } from "./deck";

import { Card } from "./card";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";

import { expect } from "chai";
import "mocha";

const ROOMS = [
  "Study",
  "Hall",
  "Lounge",
  "Library",
  "Billiard Room",
  "Dining Room",
  "Conservatory",
  "Ballroom",
  "Kitchen" ];

describe("Deck Class Tests", () => {
  let initArr: Array<User | Weapon | Room> = [];
  beforeEach(() => {
    initArr = [];
    for (let idx = 0; idx < 6; idx++) {
      initArr.push(new User("Random User" + idx, idx, false));
    }

    let rIdx = 0;

    for (const rm of ROOMS) {
      initArr.push(new Room(rm, rIdx));
      rIdx ++;
    }

    initArr = [...initArr,
      Weapon.Candlestick,
      Weapon.Dagger,
      Weapon.Lead_Pipe,
      Weapon.Pistol,
      Weapon.Rope,
      Weapon.Wrench ];
  });

  it("Successfully builds a deck", () => {
    const deck: Deck = new Deck(initArr);

    expect(deck.cards.length).to.equal(21);
  });

  it("Successfully draws a card", () => {
    const deck = new Deck(initArr);
    const cards = deck.deal(1);

    expect(cards.length).to.equal(1);
    expect(deck.cards.length).to.equal(20);
    expect(deck.inPlayCards.length).to.equal(1);
    expect(cards[0]).to.be.instanceof(Card);
    expect(deck.inPlayCards[0]).to.eql(cards[0]);
  });

  it("Successfully sets a win condition", () => {
    const deck: Deck = new Deck(initArr);

    const winCond = deck.setWinCondition();

    expect(deck.cards.length).to.equal(18);
    expect(deck.winCards.length).to.equal(3);
  });
});
