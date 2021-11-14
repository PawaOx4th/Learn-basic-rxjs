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

observer.next('Hey Pawa.');
observer.error('Eror'); 
observer.complete();

/**
 * Observable
 */
