(function(){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('qh_dark');
  if(saved === null) { if(prefersDark) document.documentElement.classList.add('dark'); }
  else if(saved === '1') document.documentElement.classList.add('dark');
  window.toggleDark = function(){ document.documentElement.classList.toggle('dark'); localStorage.setItem('qh_dark', document.documentElement.classList.contains('dark')? '1':'0'); };
  window.readFileAsDataURL = function(file){ return new Promise((res,rej)=>{ const fr=new FileReader(); fr.onload=e=>res(e.target.result); fr.onerror=rej; fr.readAsDataURL(file); }); };
  window.downloadBlob = function(blob, filename){ const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); };
  window.toBase64SizeKB = function(base64){ if(!base64) return 0; const head = base64.indexOf(',')+1; const len = base64.length - head; return Math.round(len*3/4/1024); };
  window.qh_search = function(q){ q=(q||'').trim().toLowerCase(); document.querySelectorAll('.card').forEach(card=>{ const t=card.getAttribute('data-tags')||''; card.style.display = (q==='' || t.indexOf(q)!==-1)? '' : 'none'; }); };
})();