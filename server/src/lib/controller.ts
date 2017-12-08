import { Board } from "./board";
import { Data } from "./data";
import { Hallway } from "./hallway";
import { InitializationData } from "./initialization-data";
import { Room } from "./room";
import { User } from "./user";
import { UserInitializationData } from "./user-initialization-data";
import { Weapon } from "./weapon";

const turnOrder: number[] = [1, 2, 4, 7, 10, 11];

export class Controller {
  public static setupGame(data: Data, players: string[]): InitializationData {
    const game: Board = Board.initialize(players);
    const returnedData = new InitializationData();
    returnedData.boardId = data.store(game);
    for (const user of game.players) {
      const nU = new UserInitializationData();
      nU.realUser = user.realPlayer;
      nU.startingRoom = user.location.id;
      nU.turnOrder = turnOrder.indexOf(nU.startingRoom);
      nU.playerId = user.playerId;
      returnedData.users[user.name] = nU;
    }

    return returnedData;
  }

  public move(game: Board, user: User, room: Hallway): any {
    game.move(user, room);
    return {username: user.name, newRoom: room.id};
  }

  public accuse(game: Board, user: User, accusedUser: User, room: Room, weapon: Weapon): any {
    // if correct accusation, end game. else remove player
    game.userAccusation(user, accusedUser, weapon, room);
    return {isGameOver: game.gameOverStatus, murderRoom: room.id, murderWeapon: weapon,
      murderer: accusedUser.name, username: user.name};
  }

  public guess(game: Board, user: User, guessedUser: User, room: Room, weapon: Weapon): any {
    const cardname = game.userSubmitGuess(user, guessedUser, weapon, room);
    const cardfound: boolean = !(cardname === null || cardname === "invalid");
    const validguess: boolean = !(cardname === "invalid");

    return{username: user.name, guessedCard: cardname, cardFound: cardfound, validGuess: validguess};
  }
}
