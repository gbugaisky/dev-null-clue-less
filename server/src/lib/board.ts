"use strict";

import { Deck } from "./deck";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";
import { WinCondition } from "./win-condition";

const ROOMS = [
  "Observatory",
  "Dining Room",
  "Living Room",
  "Foyer",
  "Kitchen" ];

export class Board {
  public static initialize(users: string[]): Board {
    if (users.length > 6) {
      throw new RangeError("There can be no more than 6 players!");
    }

    const usersArr: User[] = [];
    let uIdx = 0;
    for (uIdx; uIdx < users.length; uIdx++) {
      const nU: User = new User(users[uIdx], uIdx);
      usersArr.push(nU);
    }

    const hallsArr: Hallway[] = [];
    let hIdx = 0;
    for (hIdx; hIdx < 12; hIdx++) {
      hallsArr.push(new Hallway(null, hIdx));
    }

    const roomsArr: Room[] = [];
    for (const roomStr of ROOMS) {
      hIdx++;
      roomsArr.push(new Room(roomStr, hIdx));
    }

    const deckSetUsers: User[] = [...usersArr];

    while (deckSetUsers.length < 6) {
      uIdx++;
      deckSetUsers.push(new User("Random User" + uIdx, uIdx));
    }

    const deckSetup: Array<User | Room | Weapon> = [...deckSetUsers,
                                                    ...roomsArr,
                                                    Weapon.Candlestick,
                                                    Weapon.Dagger,
                                                    Weapon.Lead_Pipe,
                                                    Weapon.Pistol,
                                                    Weapon.Rope,
                                                    Weapon.Wrench];

    const deck: Deck = new Deck(deckSetup);

    const game: Board = new Board(usersArr[0], usersArr, deck);

    game.halls = hallsArr;
    game.rooms = roomsArr;

    for (const element of [...roomsArr, ...hallsArr]) {
      game.spaces.set(element.id, element);
    }

    return game;
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

  constructor(owner: User, players: User[], deck: Deck) {
    this.rooms = [];
    this.halls = [];
    this.spaces = new Map<number, Hallway>();
    this.players = [];
    this.winCondition = null;
    this.turn = 0;
    this.owner = owner;
    this.boardId = Math.random() * Number.MAX_SAFE_INTEGER;
    this.deck = deck;
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
