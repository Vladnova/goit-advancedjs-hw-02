import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as f}from"./assets/vendor-651d7991.js";const n={form:document.querySelector(".form")};n.form.addEventListener("submit",u);function u(r){r.preventDefault();const e={};new FormData(n.form).forEach((t,o)=>e[o]=+t);let{delay:s,step:i,amount:c}=e;for(let t=1;t<=c;t+=1)l(t,s).then(({position:o,delay:m})=>{f.success({title:"OK",message:`✅ Fulfilled promise ${o} in ${m}ms`,position:"topRight"})}).catch(({position:o,delay:m})=>{f.error({title:"Error",message:`❌ Rejected promise ${o} in ${m}ms`,position:"topRight"})}),s+=i;n.form.reset()}function l(r,e){const a=Math.random()>.3;return new Promise((s,i)=>{setTimeout(()=>{a?s({position:r,delay:e}):i({position:r,delay:e})},e)})}
//# sourceMappingURL=commonHelpers3.js.map