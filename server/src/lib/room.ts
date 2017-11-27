"use strict";

import { Hallway } from "./hallway";
import { User } from "./user";
import { Weapon } from "./weapon";

export class Room extends Hallway {
  public weapon: Weapon;

  constructor(name: string, id: number) {
    super(name, id);
    this.weapon = null;
    this.PERMITTED_OCC = 6;
  }

}
