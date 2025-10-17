
import { getSupabase } from "/lib/supabase.js";

async function fetchPortal(){
  const params = new URLSearchParams(location.search);
  const token = params.get('token'); const id = params.get('id');
  const res = await fetch('/.netlify/functions/portalFetch', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ token, id })
  });
  const js = await res.json();
  if(!js.ok){ document.querySelector('#portal').innerHTML = `<div class="panel"><h2>Access unavailable</h2><p>${js.error||'This invoice is not accessible.'}</p></div>`; return; }
  render(js.invoice, js.items, js.melioLink);
}

function money(n){ return `$${Number(n||0).toFixed(2)}`; }

function render(inv, items, melio){
  document.querySelector('#inv-id').textContent = inv.id;
  const d = document.querySelector('#inv-details');
  d.innerHTML = `<div class="panel"><p><strong>Client:</strong> ${inv.client_name||''}</p>
  <p><strong>Status:</strong> <span class="status ${inv.status==='paid'?'status-paid':inv.status==='overdue'?'status-overdue':'status-draft'}">${inv.status}</span></p>
  <p><strong>Amount:</strong> ${money(inv.amount)}</p></div>`;
  const tb = document.querySelector('#line-items tbody');
  tb.innerHTML = "";
  let grand = 0;
  (items||[]).forEach(it=>{
    const subtotal = (it.quantity||0)*(it.rate||0);
    const total = subtotal + subtotal*((it.tax||0)/100);
    grand += total;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${it.description||''}</td><td>${it.quantity||0}</td><td>${money(it.rate)}</td><td>${(it.tax||0)}%</td><td>${money(total)}</td>`;
    tb.appendChild(tr);
  });
  document.querySelector('#grand').textContent = money(grand);
  if (melio) document.querySelector('#btn-pay').onclick = ()=> window.open(melio,'_blank');
  document.querySelector('#btn-download').onclick = ()=> window.generatePDF(inv.id);
}

fetchPortal();
setInterval(fetchPortal, 15000);
