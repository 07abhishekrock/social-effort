import './style.css'

const firstElement = document.querySelector('#first');
const secondElement = document.querySelector('#second');
const thirdElement = document.querySelector('#third');
const fourthElement = document.querySelector('#fourth');

let allCallbacks = [ {
  callback: ()=>firstElement?.classList.add('visible'),
  startAfter: 500
}, {
  callback: ()=>{
    firstElement?.classList.remove('visible');
    firstElement?.classList.add('invisible');
  },
  startAfter: 1500
}, {
  callback: ()=>{
    secondElement?.classList.add('visible');
  },
  startAfter: 200
}, {
  callback: ()=>{
    secondElement?.classList.remove('visible');
    secondElement?.classList.add('invisible');
  }, 
  startAfter: 1000
}, {
  callback: ()=>{
    thirdElement?.classList.add('visible');
  },
  startAfter: 500
}, {
  callback: ()=>{
    fourthElement?.classList.add('visible');
  },
  startAfter: 1000
}]

const timeoutRefs: number[] = [];

let timeout = 0;

allCallbacks.forEach((cb, index)=>{
  const timeoutRef = setTimeout(()=>{
    cb.callback();
    allCallbacks = allCallbacks.filter((_, cI) => cI !== index);
  }, timeout + cb.startAfter)

  timeout = timeout + cb.startAfter;

  timeoutRefs.push(timeoutRef);
}) 

document.addEventListener('visibilitychange', ()=>{

  if(document.visibilityState === 'hidden'){
    timeoutRefs.forEach(clearTimeout);
  }

  else if (document.visibilityState === 'visible') {

    let timeout = 0;

    allCallbacks.forEach((cb, index)=>{
      const timeoutRef = setTimeout(()=>{
        cb.callback();
        allCallbacks = allCallbacks.filter((_, cI) => cI !== index);
      }, timeout + cb.startAfter)

    timeout = timeout + cb.startAfter;

      timeoutRefs.push(timeoutRef);
    }) 
  }

})
