"use strict";

import { Deck } from "./deck";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { User } from "./user";
import { WinCondition } from "./win-condition";

export class Board {
  public static initialize(users: User[]): Board {
    return null;
  }

  public rooms: Room[];
  public halls: Hallway[];
  public spaces: Map<number, Hallway>;
  public players: User[];
  public winCondition: WinCondition;
  public turn: number;
  public owner: User;
  public boardId: number;
  public deck: Deck;

  constructor(owner: User) {
    this.rooms = [];
    this.halls = [];
    this.spaces = new Map<number, Hallway>();
    this.players = [];
    this.winCondition = null;
    this.turn = 0;
    this.owner = owner;
    this.boardId = Math.random() * Number.MAX_SAFE_INTEGER;
    this.deck = null;
  }

  public listPlayers(): User[] {
    return this.players;
  }

  /**
   * Function for moving a player to a room
   * Returns a boolean depending on whether the move was
   * completed or not (depending on validity of the move).
   * @param user User player to move
   * @param room Room destination room to move to
   * @returns boolean
   */
  public move(user: User, room: Room): boolean {
    return false;
  }

  public isLegalAccusation(user: User, accusedRoom: Room): boolean {
    return false;
  }

  public cleanup(): boolean {
    return false;
  }

  public gameOver(): void {
    return null;
  }

  private setGrid(halls: Hallway[], rooms: Room[]): Map<number, Hallway> {
    return null;
  }

  /**
   * Function for determining if a move from room to room
   * is legal
   * @param oldRoom Room
   * @param newRoom Room
   * @returns boolean
   */
  private isLegalMove(oldRoom: Room, newRoom: Room): boolean {
    return false;
  }
}
