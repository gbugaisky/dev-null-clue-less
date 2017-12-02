"use strict";

import { User } from "./user";

export class Hallway {
  public id: number;
  public name: string;
  public adjacent: Map<number, Hallway>;
  protected occupant: Map<User, boolean>;
  protected PERMITTED_OCC: number;

  constructor(name: string, id: number) {
    this.occupant = new Map<User, boolean>();
    this.name = name;
    this.id = id;
    this.adjacent = new Map<number, Hallway>();
    this.PERMITTED_OCC = 1;
  }

  public contains(): User[] {
    return [...this.occupant.keys()];
  }

  public inLocation(user: User): boolean {
    if (!this.occupant.get(user)) {
      return false;
    }
    return true;
  }

  public isFull(): boolean {
    return this.occupant.size >= this.PERMITTED_OCC;
  }

  public enter(user: User): boolean {
    if (this.isFull()) {
      return false;
    }
    this.occupant.set(user, true);
    user.currentLocation = this;
    return true;
  }

  public exit(user: User): void {
    if (this.inLocation(user)) {
      this.occupant.delete(user);
    }
  }

  public setAdjacencies(adjacencies: Hallway[]): void {
    for (const hall of adjacencies) {
      this.adjacent.set(hall.id, hall);
    }
  }

  public isAdjacent(testHallway: Hallway): boolean {
    if (this.adjacent.has(testHallway.id)){
      return true;
    }
    return false;
  }
}
