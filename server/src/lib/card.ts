"use strict";

import { CardType } from "./card-type";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";

export class Card {
  name: string;
  type: CardType;
  obj: any;

  constructor(name: string, type: string, obj: User | Weapon | Room) {
    this.name = name;
    this.type = CardType[type];
    this.obj = obj;
  }

  isType(type: any): boolean {
    return this.type === type;
  }

  contains(): string {
    return this.name;
  }
}
