"use strict";

import { Hallway } from "./hallway";
import { Room } from "./room";
import { Weapon } from "./weapon";

export class User {
  name: string;
  playerId: number;
  murderer: boolean;

  constructor(name: string, id: number) {
    this.name = name;
    this.playerId = id;
  }

  isMurderer(): boolean {
    return this.murderer;
  }

  location(): Hallway {
    return null;
  }

  submitGuess(user: User, weapon: Weapon, room: Room): void {

  }

  accusation(user: User, weapon: Weapon, room: Room): boolean {
    return null;
  }
}
