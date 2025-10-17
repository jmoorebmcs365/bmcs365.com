import { getSupabase } from "/lib/supabase.js";
const out=document.getElementById("inv-output");const $=(s)=>document.querySelector(s);
function show(d){ out.textContent=JSON.stringify(d,null,2); }
const supabase=getSupabase();
async function refreshTable(){
  if(!supabase) return;
  const {data,error}=await supabase.from("invoices").select("*").order("created_at",{ascending:false});
  if(error){ show(error); return; }
  const tb=document.querySelector("#inv-table tbody"); tb.innerHTML="";
  let total=0,paid=0,outstanding=0;
  (data||[]).forEach(r=>{ total++; if(r.status==="paid") paid++; if(r.status!=="paid") outstanding+=Number(r.amount||0);
    const st=r.status, badge=st==="paid"?"status status-paid":(st==="overdue"?"status status-overdue":"status status-draft");
    const tr=document.createElement("tr"); tr.innerHTML=`<td>${r.client_name}</td><td>$${Number(r.amount).toFixed(2)}</td><td><span class="${badge}">${st}</span></td><td>${new Date(r.created_at).toLocaleString()}</td>`; tb.appendChild(tr);
  });
  $("#kpi-total").textContent=total; $("#kpi-paid-pct").textContent=total?Math.round((paid/total)*100)+"%":"0%"; $("#kpi-outstanding").textContent="$"+outstanding.toFixed(2);
}
async function createInvoice(){
  if(!supabase){ show({error:"Supabase not configured"}); return; }
  const client=$("#inv-client").value.trim(); const amount=parseFloat($("#inv-amount").value.trim()||"0"); const status=$("#inv-status").value;
  const company_id="00000000-0000-0000-0000-000000000001";
  const {data,error}=await supabase.from("invoices").insert([{client_name:client,amount,status,company_id}]).select("*").single();
  if(error){ show(error); return; } show({created:data}); refreshTable(); return data;
}
async function sendInvoiceEmail(){
  const client=$("#inv-client").value.trim(); const amount=parseFloat($("#inv-amount").value.trim()||"0");
  const subject=`Invoice from B&M Commercial Services — $${amount.toFixed(2)}`;
  const text=`Hello ${client}, your invoice total is $${amount.toFixed(2)}. Please pay via the provided link. Thank you.`;
  const res=await BMCS.sendEmail({to:"you@bmcs365.com",subject,text}); show(res);
}
async function simulateMelioPay(){
  const last=await createInvoice();
  const res=await BMCS.simulatePaymentWebhook({type:"payment.updated",status:"paid",amount:last?last.amount:0,invoice_id:last?last.id:null});
  show(res);
}
document.getElementById("btn-create").addEventListener("click",createInvoice);
document.getElementById("btn-send").addEventListener("click",sendInvoiceEmail);
document.getElementById("btn-simulate").addEventListener("click",simulateMelioPay);
refreshTable();

async function createMelioLink(invoiceId, amount){
  const res = await fetch("/.netlify/functions/melioCreateLink", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ invoiceId, amount })
  });
  const js = await res.json();
  if(js && js.link){ window.open(js.link, "_blank"); }
  return js;
}

document.getElementById("btn-melio")?.addEventListener("click", async ()=>{
  const amount = parseFloat(document.querySelector("#inv-amount")?.value || "0");
  const created = await createInvoice();
  if(created && created.id){
    await createMelioLink(created.id, amount);
  }
});

document.getElementById("btn-pdf")?.addEventListener("click", async ()=>{
  const created = await createInvoice();
  if(created && created.id && window.generatePDF){
    await window.generatePDF(created.id);
  }
});
