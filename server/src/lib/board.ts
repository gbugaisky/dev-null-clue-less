"use strict";

import { Card } from "./card";
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
      roomsArr.push(new Room(roomStr, hIdx));
      hIdx++;
    }

    const deckSetUsers: User[] = [...usersArr];

    // This sets up the required placeholder users
    while (deckSetUsers.length < 6) {
      deckSetUsers.push(new User("Random User" + uIdx, uIdx, false));
      uIdx++;
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

    const game: Board = new Board(usersArr[0], deckSetUsers, deck);

    game.halls = hallsArr;
    game.rooms = roomsArr;

    for (const element of [...roomsArr, ...hallsArr]) {
      game.spaces.set(element.id, element);
    }

    game.setAllAdjacencies();

    const unsetUsers: number[] = [0, 1, 2, 3, 4, 5];
    const unsetStarts: number[] = [1, 2, 4, 7, 10, 11];

    while (unsetUsers.length > 0) {
      const randUser: number = Math.floor(Math.random() * (unsetUsers.length - 1));
      const randStart: number = Math.floor(Math.random() * (unsetStarts.length - 1));

      const user = game.players[unsetUsers[randUser]];

      game.spaces.get(unsetStarts[randStart]).enter(user);

      unsetUsers.splice(randUser, 1);
      unsetStarts.splice(randStart, 1);
    }

    game.currentPlayer = game.listPlayers()[0];

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
  public currentPlayer: User;
  public guessMade: boolean = false;
  public moveMade: boolean = false;
  public gameOverStatus: boolean = false;

  private constructor(owner: User, players: User[], deck: Deck) {
    this.rooms = [];
    this.halls = [];
    this.deck = deck;
    this.spaces = new Map<number, Hallway>();
    this.players = players;
    this.winCondition = deck.setWinCondition();
    this.turn = 0;
    this.owner = owner;
    this.boardId = Math.random() * Number.MAX_SAFE_INTEGER;
  }

  /**
   * Function for listing all the players in the game
   * Returns an array of players.
   * @returns User[]
   */
  public listPlayers(): User[] {
    return this.players;
  }

  /**
   * Function for finding the next player.
   * Returns the next player.
   * @returns User
   */
  public nextPlayer(): User {
    let index = this.players.indexOf(this.currentPlayer);
    if (index === this.players.length) {
      index = 0;
    } else {
      index = index + 1;
    }
    return this.players[index];
  }

  /**
   * Function for ending a turn by setting currentPlayer to nextPlayer.
   * Returns a player.
   * @returns User
   */
  public nextTurn(): void {
    this.currentPlayer = this.nextPlayer();
    this.guessMade = false;
    this.moveMade = false;
    return;
  }

  /**
   * Function for moving a player to a room
   * Returns a boolean depending on whether the move was
   * completed or not (depending on validity of the move).
   * @param user User player to move
   * @param room Room destination room to move to
   * @returns boolean
   */
  public move(user: User, room: Hallway): boolean {
    if (this.isLegalMove(user.location, room)) {
      user.location.exit(user);
      room.enter(user);
      user.location = room;
      this.moveMade = true;
      return true;
    }
    return false;
  }

  /**
   * Function for checking if the accusation is legal. User must be in same room as the accused room.
   * Returns a boolean depending on whether the accusation is legal
   * @param user User player accusing
   * @param accusedRoom Room accused
   * @returns boolean
   */
  public isLegalAccusation(user: User, accusedRoom: Hallway): boolean {
    if (accusedRoom.contains().indexOf(user) > -1) {
      return true;
    }
    return false;
  }

  public isLegalGuess(user: User, guessedRoom: Room): boolean {
    // user must be in the accusedRoom
    return user.location === guessedRoom;
  }

  public gameOver(): User {
    // currently wincondition in board, but make accusation in user. how to link?
    this.gameOverStatus = true;
    return this.currentPlayer;
  }

  public removePlayer(user: User): void {
    user.inGame = false;
    this.nextTurn();
    return null;
  }

  public userSubmitGuess(currentUser: User, guessUser: User, weapon: Weapon, room: Room): string {
    // checks if person to right has any of the cards guessUser, weapon, room
    // could use currentPlayer?
    if (this.isLegalGuess(currentUser, room)) {
      this.guessMade = true;
      const WeaponCard = new Card(weapon, "Weapon", weapon);
      const UserCard = new Card(guessUser.name, "User", guessUser);
      const HallwayCard = new Card(room.name, "Hallway", room);
      const nextUser = this.nextPlayer();
      let possibleCards: Card[];

      guessUser.location.exit(guessUser);
      guessUser.location = room;
      room.enter(guessUser);

      if (nextUser.handContains(WeaponCard.name) && nextUser.handContains(UserCard.name)
      && nextUser.handContains(HallwayCard.name)) {
        possibleCards = [WeaponCard, UserCard, HallwayCard];
      } else if (nextUser.handContains(WeaponCard.name) && nextUser.handContains(UserCard.name)) {
        possibleCards = [WeaponCard, UserCard];
      } else if (nextUser.handContains(WeaponCard.name)  && nextUser.handContains(HallwayCard.name)) {
        possibleCards = [WeaponCard, HallwayCard];
      } else if (nextUser.handContains(HallwayCard.name) && nextUser.handContains(UserCard.name)) {
        possibleCards = [HallwayCard, UserCard];
      } else if (nextUser.handContains(WeaponCard.name)) {
        possibleCards = [WeaponCard];
      } else if (nextUser.handContains(HallwayCard.name)) {
        possibleCards = [HallwayCard];
      } else if (nextUser.handContains(UserCard.name)) {
        possibleCards = [UserCard];
      } else {
        return null;
      }
      return possibleCards[Math.floor(Math.random() * possibleCards.length)].name;
    } else {
    // Throw invalid guess error
      return null;
    }
  }

  public userAccusation(currentUser: User, accusedUser: User, weapon: Weapon, room: Room): void {
    if (this.isLegalAccusation(currentUser, room)) {
      if (this.winCondition.winConditionMet(accusedUser, weapon, room) === true) {
        this.gameOver();
      } else {
        this.removePlayer(currentUser);
      }
    }
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
  public isLegalMove(oldRoom: Hallway, newRoom: Hallway): boolean {
    // if hallways/rooms are adjacent, then valid move
    return oldRoom.isAdjacent(newRoom);
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
