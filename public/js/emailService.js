async function sendEmail() {
    const recipient = document.getElementById('recipient').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient, subject, message }),
    });

    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      console.error('Error sending email');
    }
  }