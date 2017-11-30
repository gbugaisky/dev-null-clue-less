"use strict";

import { Hallway } from "./hallway";
import { Room } from "./room";
import { Weapon } from "./weapon";

export class User {
  public name: string;
  public playerId: number;
  public murderer: boolean;
  public currentLocation: Hallway;

  constructor(name: string, id: number) {
    this.name = name;
    this.playerId = id;
    this.murderer = false;
  }

  public isMurderer(): boolean {
    return this.murderer;
  }

  public location(): Hallway {
    return this.currentLocation;
  }

  // move to board?
  public submitGuess(user: User, weapon: Weapon, room: Room): void {
    return null;
  }
  //move to board?
  public accusation(user: User, weapon: Weapon, room: Room): boolean {
    return null;
  }
}
