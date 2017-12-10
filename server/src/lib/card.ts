"use strict";

import { CardType } from "./card-type";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";

export class Card {
  public name: string;
  public type: string;
  public obj: User | Weapon | Room;

  constructor(name: string, type: string, obj: User | Weapon | Room) {
    this.name = name;
    this.type = type;
    this.obj = obj;
  }

  /**
   * Function that returns a boolean if the input type is equal to the type of the card
   * @returns boolean
   */
  public isType(type: any): boolean {
    return this.type === type;
  }

  /**
   * Function that returns the name of the card
   * @returns string
   */
  public contains(): string {
    return this.name;
  }
}
