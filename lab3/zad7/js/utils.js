export function debounce(fn, delay=300){
  let timeout;
  return (...args)=>{ clearTimeout(timeout); timeout=setTimeout(()=>fn(...args), delay); };
}

export function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.style.display="block";
  setTimeout(()=>{ el.style.display="none"; }, 2000);
}
