export default class Product {
  private _id: string
  private _name: string;
  private _price: number

  constructor(_id: string, _name: string, _price: number) {
    this._id = _id;
    this._name = _name;
    this._price = _price
    this.validate()
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }

    return true
  }
}