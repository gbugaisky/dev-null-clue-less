"use strict";

import { Deck } from "./deck";
import { Hallway } from "./hallway";
import { Room } from "./room";
import { User } from "./user";
import { Weapon } from "./weapon";
import { WinCondition } from "./win-condition";

const ROOMS = [
  "Study",
  "Hall",
  "Lounge",
  "Library",
  "Billiard Room",
  "Dining Room",
  "Conservatory",
  "Ballroom",
  "Kitchen" ];

export class Board {
  public static initialize(users: string[]): Board {
    if (users.length > 6) {
      throw new RangeError("There can be no more than 6 players!");
    }

    const usersArr: User[] = [];
    let uIdx = 0;
    for (uIdx; uIdx < users.length; uIdx++) {
      const nU: User = new User(users[uIdx], uIdx, true);
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

    // This sets up the required placeholder users
    while (deckSetUsers.length < 6) {
      uIdx++;
      deckSetUsers.push(new User("Random User" + uIdx, uIdx, false));
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

    game.setAllAdjacencies();

    const unsetUsers: number[] = [0, 1, 2, 3, 4, 5];
    const unsetStarts: number[] = [1, 2, 4, 7, 10, 11];

    while (unsetUsers.length > 0) {
      const randUser: number = Math.random() * unsetUsers.length - 1;
      const randStart: number = Math.random() * unsetStarts.length - 1;

      const user = game.players[unsetUsers[randUser]];

      game.spaces.get(unsetStarts[randStart]).enter(user);

      unsetUsers.splice(randUser, 1);
      unsetStarts.splice(randStart, 1);
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

  private constructor(owner: User, players: User[], deck: Deck) {
    this.rooms = [];
    this.halls = [];
    this.deck = deck;
    this.spaces = new Map<number, Hallway>();
    this.players = [];
    this.winCondition = deck.setWinCondition();
    this.turn = 0;
    this.owner = owner;
    this.boardId = Math.random() * Number.MAX_SAFE_INTEGER;
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
    return user.location === accusedRoom;
  }

  public cleanup(): boolean {
    return false;
  }

  public gameOver(): void {
    return null;
  }

  // Replaced by static setAllAdjacencies function
  // private setGrid(halls: Hallway[], rooms: Room[]): Map<number, Hallway> {
  //   return null;
  // }

  /**
   * Function for determining if a move from room to room
   * is legal
   * @param oldRoom Room
   * @param newRoom Room
   * @returns boolean true if the room movement is permitted, false otherwise
   */
  private isLegalMove(oldRoom: Room, newRoom: Room): boolean {
    return false;
  }

  /**
   * Builds the adjacencies.  We're hardcoding this setup
   * for now.
   * Board is built under the assumption of following ids:
   *   12(R)--00(H)--13(R)--01(H)--14(R)
   *    |             |             |
   *   02(H)         03(H)         04(H)
   *    |             |             |
   *   15(R)--05(H)--16(R)--06(H)--17(R)
   *    |             |             |
   *   07(H)         08(H)         09(H)
   *    |             |             |
   *   18(R)--10(H)--19(R)--11(H)--20(R)
   */

  private setAllAdjacencies(): void {
    // Set halls first
    this.spaces.get(0).setAdjacencies([this.spaces.get(12), this.spaces.get(13)]);
    this.spaces.get(1).setAdjacencies([this.spaces.get(13), this.spaces.get(14)]);
    this.spaces.get(2).setAdjacencies([this.spaces.get(12), this.spaces.get(15)]);
    this.spaces.get(3).setAdjacencies([this.spaces.get(13), this.spaces.get(16)]);
    this.spaces.get(4).setAdjacencies([this.spaces.get(14), this.spaces.get(17)]);
    this.spaces.get(5).setAdjacencies([this.spaces.get(15), this.spaces.get(16)]);
    this.spaces.get(6).setAdjacencies([this.spaces.get(16), this.spaces.get(17)]);
    this.spaces.get(7).setAdjacencies([this.spaces.get(15), this.spaces.get(18)]);
    this.spaces.get(8).setAdjacencies([this.spaces.get(16), this.spaces.get(19)]);
    this.spaces.get(9).setAdjacencies([this.spaces.get(17), this.spaces.get(20)]);
    this.spaces.get(10).setAdjacencies([this.spaces.get(18), this.spaces.get(19)]);
    this.spaces.get(11).setAdjacencies([this.spaces.get(19), this.spaces.get(20)]);

    // Set Rooms (Corner rooms have diagonal Room adjacencies too)
    // All Rooms except the center (16) should have 3 adjacencies
    // Center 16 has 4.
    this.spaces.get(12).setAdjacencies([this.spaces.get(0),
                                        this.spaces.get(2),
                                        this.spaces.get(20)]);
    this.spaces.get(13).setAdjacencies([this.spaces.get(0),
                                        this.spaces.get(1),
                                        this.spaces.get(3)]);
    this.spaces.get(14).setAdjacencies([this.spaces.get(1),
                                        this.spaces.get(4),
                                        this.spaces.get(18)]);
    this.spaces.get(15).setAdjacencies([this.spaces.get(2),
                                        this.spaces.get(5),
                                        this.spaces.get(7)]);
    this.spaces.get(16).setAdjacencies([this.spaces.get(3),
                                        this.spaces.get(5),
                                        this.spaces.get(6),
                                        this.spaces.get(8)]);
    this.spaces.get(17).setAdjacencies([this.spaces.get(4),
                                        this.spaces.get(6),
                                        this.spaces.get(9)]);
    this.spaces.get(18).setAdjacencies([this.spaces.get(7),
                                        this.spaces.get(10),
                                        this.spaces.get(14)]);
    this.spaces.get(19).setAdjacencies([this.spaces.get(8),
                                        this.spaces.get(10),
                                        this.spaces.get(11)]);
    this.spaces.get(20).setAdjacencies([this.spaces.get(9),
                                        this.spaces.get(11),
                                        this.spaces.get(12)]);
  }

}
