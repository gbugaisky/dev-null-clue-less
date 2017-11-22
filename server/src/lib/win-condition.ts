"use strict";

import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";

export class WinCondition {
  public murderer: User;
  public murderWeapon: Weapon;
  public murderRoom: Room;

  constructor(user: User, weapon: Weapon, room: Room) {
    this.murderer = user;
    this.murderWeapon = weapon;
    this.murderRoom = room;
  }

  public toString(): string {
    let str = "The Win Condition is ";
    str += this.murderer.name + " in ";
    str += this.murderRoom.name + " with ";
    str += this.murderWeapon + ".";
    return str;
  }

  public winConditionMet(user: User, weapon: Weapon, room: Room): boolean {
    return this.murderer.playerId === user.playerId &&
           this.murderWeapon === weapon &&
           this.murderRoom.id === room.id;
  }

  public playerOut(): void {
    return null;
  }
}
