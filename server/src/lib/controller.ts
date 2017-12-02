import { Board } from "./board";
import { Data } from "./data";
import { InitializationData } from "./initialization-data";
import { UserInitializationData } from "./user-initialization-data";

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
      returnedData.users[user.name] = nU;
    }

    return returnedData;
  }
}
