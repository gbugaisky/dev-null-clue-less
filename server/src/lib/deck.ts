"use strict";

import { Card } from "./card";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";
import { WinCondition } from "./win-condition";

const DECK_SIZE: number = 21;

export class Deck {
  public cards: Card[];
  public inPlayCards: Card[];
  public graveyard: Card[];
  public winCards: Card[];

  constructor(values: Array<User | Weapon | Room>) {
    this.cards = [];
    this.inPlayCards = [];
    this.graveyard = [];
    this.winCards = [];

    if (values.length !== DECK_SIZE) {
      throw new RangeError("Missing values in initializer.  Must have a values array of length " + DECK_SIZE);
    }
    for (const element of values) {
      // TODO!
      let name: string = "";
      let type: string = "";

      if (element instanceof User || element instanceof Room) {
        name = element.name;
        type = element.constructor.name;
      } else {
        name = element;
        type = "Weapon";
      }

      this.cards.push(new Card(name, type, element));
    }
  }

  public deal(num: number): Card[] {
    if (num > DECK_SIZE || num < 0) {
      throw new RangeError("Draw size must be between 0 and " + DECK_SIZE);
    }

    const draw: Card[] = [];

    for (let i = 0; i < num; i++) {
      if (this.cards.length < 1) {
        this.reshuffle();
      }

      const pull = this.draw();

      draw.push(pull.card);
      this.inPlayCards.push(pull.card);
      this.cards.splice(pull.index, 1);
    }

    return draw;
  }

  public returnCard(card: Card): void {
    for (let i = 0; i < this.inPlayCards.length; i++) {
      if (this.inPlayCards[i] === card) {
        this.inPlayCards.splice(i, 1);
        this.graveyard.push(card);
        break;
      }
    }
  }

  public setWinCondition(): WinCondition {
    let user: User;
    let weapon: Weapon;
    let room: Room;

    while (!user) {
      const pull = this.draw();
      if (pull.card.isType("User")) {
        user = pull.card.obj as User;
        this.winCards.push(pull.card);
        this.cards.splice(pull.index, 1);
        user.murderer = true;
      }
    }

    while (!weapon) {
      const pull = this.draw();
      if (pull.card.isType("Weapon")) {
        weapon = pull.card.obj as Weapon;
        this.winCards.push(pull.card);
        this.cards.splice(pull.index, 1);
      }
    }

    while (!room) {
      const pull = this.draw();
      if (pull.card.isType("Room")) {
        room = pull.card.obj as Room;
        this.winCards.push(pull.card);
        this.cards.splice(pull.index, 1);
      }
    }

    return new WinCondition(user, weapon, room);
  }

  public reshuffle(): void {
    this.cards = [...this.graveyard];
    this.graveyard = [];
  }

  private draw(): {card: Card, index: number} {
    const index: number = Math.floor(Math.random() * this.cards.length);
    const card: Card = this.cards[index];
    return {card, index};
  }

  private sanityCheck(): boolean {
    return (this.cards.length
      + this.inPlayCards.length
      + this.graveyard.length) === DECK_SIZE;
  }
}
