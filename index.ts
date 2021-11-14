console.clear();

interface Observer {
  next: (value: any) => void;
  error: (value: any) => void;
  complete: () => void;
}

type Teardown = () => void;

const observer: Observer = {
  next: (value: any) => console.log('next :', value),
  error: (err: any) => console.error('error :', err),
  complete: () => console.log('complete !!'),
};

// observer.next('Hey Pawa.');
// observer.error('Eror');
// observer.complete();

class Observable {
  subscriber: (observer: Observer) => Teardown;
  constructor(subscriber: (observer: Observer) => Teardown) {
    this.subscriber = subscriber;
  }
  subscribe(observer: Observer) {
    const teardown: Teardown = this.subscriber(observer);
    return {
      unsubscibe: () => teardown(),
    };
  }
}

/**
 * Observable
 */
// function source(observer: Observer) {
//   let i = 0;
//   const index = setInterval(() => observer.next(i++), 1000);
//   const teardown = () => clearInterval(index);
//   return {
//     unsubscibe: () => teardown(),
//   };
// }
function interval(milliseconds: number) {
  return new Observable((observer) => {
    let i = 0;
    const index = setInterval(() => observer.next(i++), milliseconds);
    const teardown = () => clearInterval(index);
    return teardown;
  });
}

function of(...datalist: any[]) {
  return new Observable((observer) => {
    datalist.forEach((data) => observer.next(data));
    observer.complete();
    return () => {};
  });
}

function from(datalist: any[]) {
  return new Observable((observer) => {
    datalist.forEach((data) => observer.next(data));
    observer.complete();
    return () => {};
  });
}

// const source = new Observable((observer) => {
//   let i = 0;
//   const index = setInterval(() => observer.next(i++), 1000);
//   const teardown = () => clearInterval(index);
//   return teardown;
// });

// 1.
// const source = interval(2000);

// 2.
// const source = of(10, 20, 30);

// 3.
const source = from([1, 2, 3, 4, 5, 6]);

const subscription = source.subscribe(observer);
setTimeout(() => subscription.unsubscibe(), 6000);
