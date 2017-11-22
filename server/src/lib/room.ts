"use strict";

import { Weapon } from "./weapon";
import { User } from "./user";

export class Room {
  public weapon: Weapon;
  public name: string;
  public occupant: User;
  public id: number;
}
