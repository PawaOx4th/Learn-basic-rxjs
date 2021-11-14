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
  subscribe(observer: Observer) {
    let i = 0;
    const index = setInterval(() => observer.next(i++), 1000);
    const teardown:Teardown = () => clearInterval(index);
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
const source = new Observable();
const subscription = source.subscribe(observer);
setTimeout(() => subscription.unsubscibe(), 5000);
