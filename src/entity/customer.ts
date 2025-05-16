class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._active = true;
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

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false
  }
}