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

// const source = new Observable((observer) => {
//   let i = 0;
//   const index = setInterval(() => observer.next(i++), 1000);
//   const teardown = () => clearInterval(index);
//   return teardown;
// });
const source = interval(2000);
const subscription = source.subscribe(observer);
setTimeout(() => subscription.unsubscibe(), 6000);
