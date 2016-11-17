import createPointCB from '../';
const obj = {};
const pointCB = createPointCB(obj);

window.addEventListener('mousemove', pointCB);
window.addEventListener('touchmove', pointCB);

window.addEventListener('mousemove', (e)=>{
    console.log('obj ', obj)
});
