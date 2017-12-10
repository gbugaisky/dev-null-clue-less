import { UserInitializationData } from "./user-initialization-data";

export class InitializationData {
  public boardId: number;
  public users: { [userName: string]: UserInitializationData } = {};
}
