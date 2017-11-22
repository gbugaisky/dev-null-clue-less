"use strict";

import { User } from "./user";

export class Hallway {
  id: number;
  name: string;
  protected occupant: Map<User, boolean>;
  adjacent: Map<number, Hallway>;

  constructor(name: string, id: number) {
    this.occupant = new Map<User, boolean>();
    this.name = name;
    this.id = id;
    this.adjacent = new Map<number, Hallway>();
  }

  contains(): User[] {
    return [...this.occupant.keys()];
  }

  inLocation(user: User): boolean {
    if (!this.occupant.get(user)) {
      return false;
    }
    return true;
  }

  enter(user: User): boolean {
    this.occupant.set(user, true);
    return true;
  }

  exit(user: User): void {
    if (this.inLocation(user)) {
      this.occupant.delete(user);
    }
  }

  setAdjacencies(adjacencies: Hallway[]): void {
    for (let hall of adjacencies) {
      this.adjacent.set(hall.id, hall);
    }
  }
}
