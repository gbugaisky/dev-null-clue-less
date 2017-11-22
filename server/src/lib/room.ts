"use strict";

import { Hallway } from "./hallway";
import { User } from "./user";
import { Weapon } from "./weapon";

const PERMITTED_OCC: number = 1;

export class Room extends Hallway {
  public weapon: Weapon;

  constructor(name: string, id: number) {
    super(name, id);
    this.weapon = null;
  }

  public isFull(): boolean {
    return this.occupant.size >= PERMITTED_OCC;
  }

  public enter(user: User): boolean {
    if (this.isFull()) {
      return false;
    }
    this.occupant.set(user, true);
    return true;
  }
}
