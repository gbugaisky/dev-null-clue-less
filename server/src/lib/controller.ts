import { Board } from "./board";
import { Data } from "./data";
import { InitializationData } from "./initialization-data";
import { Hallway } from "./hallway";
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

  public move(game: Board, user: User, room: Hallway): void {
    game.move(user, room);
    return;
  }

  public accuse(game: Board, user: User, accusedUser: User, room: Room, weapon: Weapon): void {
    // if correct accusation, end game. else remove player
    game.userAccusation(user, accusedUser, weapon, room);
    return;
  }

  public guess(game: Board, user: User, guessedUser: User, room: Room, weapon: Weapon): void{ 
    return;
  }
}
