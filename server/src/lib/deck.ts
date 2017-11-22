"use strict";

import { Card } from "./card";
import { WinCondition } from "./win-condition";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";

const DECK_SIZE: number = 21;

export class Deck {
  cards: Card[];
  inPlayCards: Card[];
  graveyard: Card[];

  constructor(values: (User | Weapon | Room)[]) {
    if (values.length !== DECK_SIZE) {
      throw new RangeError("Missing values in initializer.  Must have a values array of length " + DECK_SIZE)
    }
    for (let element of values) {
      // TODO!
      this.cards.push(new Card("test String", typeof element, element));
    }
  }

  deal(num: number): Card[] {
    if (num > DECK_SIZE || num < 0) {
      throw new RangeError("Draw size must be between 0 and " + DECK_SIZE);
    }

    let draw: Card[] = [];

    for (let i = 0; i < num; i++) {
      if (this.cards.length < 1) {
        this.reshuffle();
      }

      let pull = this.draw();

      draw.push(pull.card);
      this.inPlayCards.push(pull.card);
      this.cards.splice(pull.index, 1);
    }

    return draw;
  }

  returnCard(card: Card): void {
    for(let i = 0; i < this.inPlayCards.length; i++) {
      if (this.inPlayCards[i] === card) {
        this.inPlayCards.splice(i, 1);
        this.graveyard.push(card);
        break;
      }
    }
  }

  setWinCondition(): WinCondition {
    let user: User;
    let weapon: Weapon;
    let room: Room;

    while (!user) {
      let pull = this.draw();
      if (pull.card.isType(User)) {
        user = pull.card.obj;
      }
    }

    while(!weapon) {
      let pull = this.draw();
      if (pull.card.isType(Weapon)) {
        weapon = pull.card.obj;
      }
    }

    while(!room) {
      let pull = this.draw();
      if (pull.card.isType(Room)) {
        room = pull.card.obj;
      }
    }

    return new WinCondition(user, weapon, room);
  }

  reshuffle(): void {
    this.cards = [...this.graveyard];
    this.graveyard = [];
  }

  private draw(): {card: Card, index: number} {
    let drawN: number = Math.random() * this.cards.length;
    let card: Card = this.cards[drawN];
    return {card: card, index: drawN};
  }

  private sanityCheck(): boolean {
    return (this.cards.length
      + this.inPlayCards.length
      + this.graveyard.length) === DECK_SIZE;
  }
}
