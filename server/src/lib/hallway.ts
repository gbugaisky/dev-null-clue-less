"use strict";

import { User } from "./user";

export class Hallway {
  public id: number;
  public name: string;
  public adjacent: Map<number, Hallway>;
  protected occupant: Map<User, boolean>;

  constructor(name: string, id: number) {
    this.occupant = new Map<User, boolean>();
    this.name = name;
    this.id = id;
    this.adjacent = new Map<number, Hallway>();
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

  public enter(user: User): boolean {
    this.occupant.set(user, true);
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
}
