
export function setupLineItems(){
  const tbody = document.querySelector('#line-items tbody');
  const addBtn = document.querySelector('#btn-add-item');
  const totalEl = document.querySelector('#grand-total');
  function mk(){ const tr = document.createElement('tr'); tr.innerHTML =
    `<td><input class="desc" placeholder="Description"></td>
     <td><input class="qty" type="number" value="1" min="0"></td>
     <td><input class="rate" type="number" value="0" step="0.01"></td>
     <td><input class="tax" type="number" value="0" step="0.01"></td>
     <td class="row-total">$0.00</td>`; tbody.appendChild(tr); bind(tr);}
  function bind(tr){ tr.querySelectorAll('input').forEach(i=> i.addEventListener('input', compute)); }
  function compute(){
    let gt=0; tbody.querySelectorAll('tr').forEach(tr=>{
      const q=parseFloat(tr.querySelector('.qty')?.value||"0");
      const r=parseFloat(tr.querySelector('.rate')?.value||"0");
      const t=parseFloat(tr.querySelector('.tax')?.value||"0");
      const sub=q*r; const tot=sub+sub*(t/100);
      tr.querySelector('.row-total').textContent = `$${tot.toFixed(2)}`; gt+=tot;
    }); if(totalEl) totalEl.textContent = `$${gt.toFixed(2)}`;
  }
  addBtn?.addEventListener('click', mk); compute();
}
