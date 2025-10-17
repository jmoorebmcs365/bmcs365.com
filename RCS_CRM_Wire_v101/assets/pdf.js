import { getSupabase } from "/lib/supabase.js";

window.generatePDF = async (invoiceId) => {
  const supabase = await getSupabase();
  if(!supabase){ alert("Supabase not configured"); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  try{
    const { data: inv, error } = await supabase.from("invoices").select("*").eq("id", invoiceId).single();
    if(error){ throw error; }
    // Header
    doc.setFillColor(10,35,66); // navy bar
    doc.rect(0,0,210,18,"F");
    doc.setTextColor(255,255,255);
    doc.setFont("helvetica","bold"); doc.setFontSize(16);
    doc.text("B&M Commercial Services", 12, 12);

    // Body
    doc.setTextColor(0,0,0);
    doc.setFontSize(12); doc.setFont("helvetica","normal");
    let y = 30;
    doc.text(`Invoice ID: ${inv.id}`, 12, y); y+=8;
    doc.text(`Client: ${inv.client_name}`, 12, y); y+=8;
    doc.text(`Amount: $${Number(inv.amount).toFixed(2)}`, 12, y); y+=8;
    doc.text(`Status: ${inv.status}`, 12, y); y+=12;

    doc.setDrawColor(176,183,195);
    doc.line(12,y,198,y); y+=10;

    doc.setFont("helvetica","italic");
    doc.text("Thank you for your business!", 12, y);

    doc.save(`Invoice_${inv.id}.pdf`);
  }catch(e){
    console.error(e);
    alert("Failed to generate PDF");
  }
};
