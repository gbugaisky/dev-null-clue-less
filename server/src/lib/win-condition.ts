"use strict";

import { User } from "./user";
import { Weapon } from "./weapon";
import { Room } from "./room";
import { start } from "repl";

export class WinCondition {
  public murderer: User;
  public murderWeapon: Weapon;
  public murderRoom: Room;

  constructor(user: User, weapon: Weapon, room: Room) {
    this.murderer = user;
    this.murderWeapon = weapon;
    this.murderRoom = room;
  }

  toString(): string {
    let str = "The Win Condition is ";
    str += this.murderer.name + " in ";
    str += this.murderRoom.name + " with ";
    str += this.murderWeapon + ".";
    return str;
  }

  winConditionMet(user: User, weapon: Weapon, room: Room): boolean {
    return this.murderer.playerId === user.playerId &&
           this.murderWeapon === weapon &&
           this.murderRoom.id === room.id;
  }

  playerOut(): void {}
}
