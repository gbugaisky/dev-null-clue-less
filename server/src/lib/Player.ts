export class Player {

    private name: string;
    private guid: string;

    public constructor(name: string, guid: string) {
        this.setName(name);
        this.setGuid(guid);
    }
    public setName(name: string): void {
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }
    public setGuid(guid: string): void {
        this.guid = guid;
    }
    public getGuid(): string {
        return this.guid;
    }

    public toString(): string {
        return this.getName() + ":" + this.getGuid();
    }
}
