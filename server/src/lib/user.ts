"use strict";

import { Card } from "./card";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { Weapon } from "./weapon";

export class User {
  public name: string;
  public playerId: number;
  public murderer: boolean;
  public realPlayer: boolean;
  public location: Hallway;
  public hand: Card[];
  public inGame: boolean;

  constructor(name: string, id: number, realPlayer: boolean) {
    this.name = name;
    this.playerId = id;
    this.murderer = false;
    this.realPlayer = realPlayer;
    this.location = null;
    this.hand = [];
    this.inGame = realPlayer;
  }

  /**
   * Function that returns whether or not user is the murderer
   * @returns boolean
   */
  public isMurderer(): boolean {
    return this.murderer;
  }

  /**
   * Function that returns whether or not a card with card.name === input is in hand
   * @param input string containing name of card to be checked
   * @returns boolean
   */
  public handContains(input: string): boolean {
    const index = this.hand.length - 1;
    for (let i = 0; i <= index; i++) {
      if (this.hand[i].name === input) {
        return true;
      }
    }
    return false;
  }
}
