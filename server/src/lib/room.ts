"use strict";

import { User } from "./user";
import { Weapon } from "./weapon";
import { Hallway } from "./hallway";

const PERMITTED_OCC: number = 1;

export class Room extends Hallway {
  weapon: Weapon;

  isFull(): boolean {
    return this.occupant.size >= PERMITTED_OCC;
  }

  enter(user: User): boolean {
    if(this.isFull()) {
      return false;
    }
    this.occupant.set(user, true);
    return true;
  }
}
