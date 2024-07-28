class Singleton {
  constructor() {
    if (!Singleton.instance) {
      this.value = 0;
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }
}

module.exports = { Singleton };
