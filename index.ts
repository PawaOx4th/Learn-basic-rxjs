console.clear();

interface Observer {
  next: (value: any) => void;
  error: (value: any) => void;
  complete: () => void;
}

type Teardown = () => void;

// observer.next('Hey Pawa.');
// observer.error('Eror');
// observer.complete();

class Subscription {
  teardownList: Teardown[] = [];
  constructor(teardown?: Teardown) {
    if (teardown) this.teardownList.push(teardown);
  }
  unsubscibe() {
    this.teardownList.forEach((teardown) => teardown());
    this.teardownList = [];
  }
  add(subscription: Subscription) {
    this.teardownList.push(() => subscription.unsubscibe());
  }
}

class Observable {
  subscriber: (observer: Observer) => Teardown;
  constructor(subscriber: (observer: Observer) => Teardown) {
    this.subscriber = subscriber;
  }
  subscribe(observer: Observer) {
    const teardown: Teardown = this.subscriber(observer);
    const subscription = new Subscription(teardown);
    return subscription;
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

const observer1: Observer = {
  next: (value: any) => console.log(' observer1 next :', value),
  error: (err: any) => console.error(' observer1 error :', err),
  complete: () => console.log(' observer1 complete !!'),
};

const observer2: Observer = {
  next: (value: any) => console.log(' observer2 next :', value),
  error: (err: any) => console.error(' observer2 error :', err),
  complete: () => console.log(' observer2 complete !!'),
};

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
// const source = from([1, 2, 3, 4, 5, 6]);

// const subscription = source.subscribe(observer1);
const subMain = new Subscription();
subMain.add(interval(1000).subscribe(observer1));
subMain.add(interval(2000).subscribe(observer2));
// const sub1 = interval(1000).subscribe(observer1);
// const sub2 = interval(3000).subscribe(observer2);
// setTimeout(() => subscription.unsubscibe(), 6000);
// subMain.add(sub1);
// subMain.add(sub2);

setTimeout(() => {
  subMain.unsubscibe();
}, 5000);



