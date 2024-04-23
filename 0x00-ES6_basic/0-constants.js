export function taskFirst() {
    const task = 'I prefer const when I can.';
    return task;
  }

  export function getLast() {
    return ' is okay';
  }

  export function taskNext() {
    let both = 'But sometimes let';
    both += getLast();

    return both;
  }
