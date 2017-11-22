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

  public isType(type: any): boolean {
    return this.type === type;
  }

  public contains(): string {
    return this.name;
  }
}
