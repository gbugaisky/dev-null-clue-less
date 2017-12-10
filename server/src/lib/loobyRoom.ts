import {Player} from "./Player";

export class LobbyRoom {

    private roomName: string;
    private players: Player[];

    public constructor(roomName: string, players: Player[]) {
        this.setRoomName(roomName);
        this.setPlayers(players);
    }
    public setRoomName(roomName: string): void {
        this.roomName = roomName;
    }
    public getRoomName(): string {
        return this.roomName;
    }
    public setPlayers(players: Player[]): void {
        this.players = players;
    }
    public getPlayers(): Player[] {
        return this.players;
    }
    public addPlayer(player: Player): void {
        this.players.push(player);
    }
    public removePlayer(player: Player): void {
        let index = 0;
        for (const p of this.getPlayers()) {
            if (p.getGuid() === player.getGuid()) {
                break;
            }
            index++;
        }
        if (index !== -1) {
            this.players = this.players.slice(index, 1);
        }
    }
    public toString(): string {
        let finalString = "";
        finalString += this.getRoomName() + ": " + this.getPlayers().length;
        return finalString;
    }
}
