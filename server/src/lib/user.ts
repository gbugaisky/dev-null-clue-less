"use strict";

import { Card } from "./card";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { Weapon } from "./weapon";

export class User {
  public name: string;
  public playerId: number;
  public murderer: boolean;
  public realPlayer: boolean;
  public location: Hallway;
  public hand: Card[];

  constructor(name: string, id: number, realPlayer: boolean) {
    this.name = name;
    this.playerId = id;
    this.murderer = false;
    this.realPlayer = realPlayer;
    this.location = null;
    this.hand = [];
  }

  public isMurderer(): boolean {
    return this.murderer;
  }

  public submitGuess(user: User, weapon: Weapon, room: Room): void {
    return null;
  }

  public accusation(user: User, weapon: Weapon, room: Room): boolean {
    return null;
  }
}
