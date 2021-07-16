class Messages {
  constructor(structure) {
    this.structure = structure || [];
  }

  add(path, value) {
    this.structure = [...this.structure, { path, value }];
    return this;
  }

  get(path) {
    const message = this.structure.filter((message) => {
      if (path.length !== message.path.length) return false;

      for (let counter = 0; counter < path.length; counter++) {
        if (path[counter] !== message.path[counter]) return false;
      }

      return true;
    })[0];

    if (message) return message.value;
  }
}

export default Messages;
