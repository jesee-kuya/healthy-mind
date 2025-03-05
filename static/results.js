
import { sendEmail } from './script.js';

document.addEventListener('DOMContentLoaded', function () {
    const depressionScore = localStorage.getItem('depressionScore');
    const depressionSeverity = localStorage.getItem('depressionSeverity');
    const anxietyScore = localStorage.getItem('anxietyScore');
    const anxietySeverity = localStorage.getItem('anxietySeverity');

    document.getElementById('depression-score').textContent = `Depression Score: ${depressionScore} - ${depressionSeverity}`;
    document.getElementById('anxiety-score').textContent = `Anxiety Score: ${anxietyScore} - ${anxietySeverity}`;

    const submitContactButton = document.getElementById('submit-contact');

    submitContactButton.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('message', message);

        // Prepare email body
        let emailBody = `
        Mental Health Form Results:
        Depression: ${depressionScore} - ${depressionSeverity}
        Anxiety: ${anxietyScore} - ${anxietySeverity}
    `;

        if (name || email || message) {
            emailBody += `\n\nContact Details:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
        }

        // Send email
        sendEmail(emailBody);
    });
});