console.clear();

interface Observer {
  next: (value: any) => void;
  error: (value: any) => void;
  complete: () => void;
}

const observer: Observer = {
  next: (value: any) => console.log('next :', value),
  error: (err: any) => console.error('error :', err),
  complete: () => console.log('complete !!'),
};

// observer.next('Hey Pawa.');
// observer.error('Eror');
// observer.complete();

/**
 * Observable
 */
function source(observer: Observer) {
  let i = 0;
  const index = setInterval(() => observer.next(i++), 1000);
  const teardown = () => clearInterval(index);
  return {
    unsubscibe: () => teardown(),
  };
}

const subscription = source(observer);
setTimeout(() => subscription.unsubscibe(), 5000);
