const menuButton=document.getElementById("menu-mobile"),nav=document.getElementById("nav");
if(menuButton&&nav){
  menuButton.addEventListener("click",()=>{const opened=nav.classList.toggle("active");menuButton.classList.toggle("active",opened);menuButton.setAttribute("aria-expanded",String(opened));});
  document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("active");menuButton.classList.remove("active");menuButton.setAttribute("aria-expanded","false");}));
}
const phone="5561993708694";
document.querySelectorAll("[data-service]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();window.open(`https://wa.me/${phone}?text=${encodeURIComponent("Olá! Gostaria de agendar "+a.dataset.service+" no Studio Deborah Cristinny.")}`,"_blank","noopener");}));
document.querySelectorAll("[data-prof]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();window.open(`https://wa.me/${phone}?text=${encodeURIComponent("Olá! Gostaria de agendar um horário com "+a.dataset.prof+".")}`,"_blank","noopener");}));

const deps=[...document.querySelectorAll(".depoimento")],dots=[...document.querySelectorAll(".dep-dots i")];let idx=0;
function show(i){if(!deps.length)return;idx=(i+deps.length)%deps.length;deps.forEach((x,n)=>x.classList.toggle("active",n===idx));dots.forEach((x,n)=>x.classList.toggle("active",n===idx));}
document.getElementById("prev")?.addEventListener("click",()=>show(idx-1));
document.getElementById("next")?.addEventListener("click",()=>show(idx+1));
setInterval(()=>show(idx+1),6000);

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(!e.isIntersecting||e.target.dataset.done)return;
  e.target.dataset.done="1";
  const el=e.target,target=Number(el.dataset.counter),start=performance.now(),decimal=el.dataset.decimal;
  function animate(now){
    const p=Math.min((now-start)/1200,1),value=target*(1-Math.pow(1-p,3));
    el.textContent=(el.dataset.prefix||"")+(decimal?value.toFixed(1).replace(".",","):Math.round(value).toLocaleString("pt-BR"));
    if(p<1)requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  obs.unobserve(el);
}),{threshold:.35});
document.querySelectorAll("[data-counter]").forEach(el=>obs.observe(el));