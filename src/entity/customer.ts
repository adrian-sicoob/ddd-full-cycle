import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._active = false;
    this.validate()
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required")
    }

    if (this._id.length === 0) {
      throw new Error("Id is required")
    }
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id
  }

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is required")
    }
    this._active = true;
  }

  deactivate() {
    this._active = false
  }

  set Address(address: Address) {
    this._address = address
  }

  isActive(): boolean {
    return this._active
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }
}