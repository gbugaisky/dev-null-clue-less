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

  /**
   * Function that returns the win condition as string
   * @returns string
   */
  public toString(): string {
    let str = "The Win Condition is ";
    str += this.murderer.name + " in ";
    str += this.murderRoom.name + " with ";
    str += this.murderWeapon + ".";
    return str;
  }

  /**
   * Function that returns a boolean checking if win conditionis met
   * @param user user accused
   * @param weapon weapon accused
   * @param room accused
   * @returns boolean
   */
  public winConditionMet(user: User, weapon: Weapon, room: Room): boolean {
    return this.murderer.playerId === user.playerId &&
           this.murderWeapon === weapon &&
           this.murderRoom.id === room.id;
  }

}
