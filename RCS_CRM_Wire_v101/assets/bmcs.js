window.BMCS = (function(){
  async function sendEmail({to, subject, text, html}){
    const res = await fetch("/.netlify/functions/sendEmail", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({to, subject, text, html})
    });
    return res.json();
  }
  async function simulatePaymentWebhook(sample){
    const res = await fetch("/.netlify/functions/melioWebhook", {
      method: "POST",
      headers: {"Content-Type":"application/json","x-melio-signature":"stub-secret"},
      body: JSON.stringify(sample || {type:"payment.updated", status:"paid", amount:100})
    });
    return res.json();
  }
  return { sendEmail, simulatePaymentWebhook };
})();
