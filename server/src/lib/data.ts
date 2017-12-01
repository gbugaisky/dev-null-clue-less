import { Board } from "./board";

let dataSingleton: Data = null;

export class Data {
  public static initialize(): Data {
    if (!dataSingleton) {
      dataSingleton = new Data();
    }
    return dataSingleton;
  }

  private inMemDatabase: Map<number, Board>;
  private constructor() {
    this.inMemDatabase = new Map<number, Board>();
  }

  public store(board: Board): number {
    this.inMemDatabase.set(board.boardId, board);
    return board.boardId;
  }

  public retrieve(id: number): Board {
    return this.inMemDatabase.get(id);
  }
}
