"use strict";

import { Hallway } from "./hallway";
import { Room } from "./room";
import { Weapon } from "./weapon";

export class User {
  public name: string;
  public playerId: number;
  public murderer: boolean;

  constructor(name: string, id: number) {
    this.name = name;
    this.playerId = id;
    this.murderer = false;
  }

  public isMurderer(): boolean {
    return this.murderer;
  }

  public location(): Hallway {
    return null;
  }

  public submitGuess(user: User, weapon: Weapon, room: Room): void {
    return null;
  }

  public accusation(user: User, weapon: Weapon, room: Room): boolean {
    return null;
  }
}
