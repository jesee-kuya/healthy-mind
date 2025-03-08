document.addEventListener("DOMContentLoaded", function () {
    const depressionScore = localStorage.getItem("depressionScore");
    const depressionSeverity = localStorage.getItem("depressionSeverity");
    const anxietyScore = localStorage.getItem("anxietyScore");
    const anxietySeverity = localStorage.getItem("anxietySeverity");

    document.getElementById("depression-score").textContent =
        `Depression Score: ${depressionScore} - ${depressionSeverity}`;
    document.getElementById("anxiety-score").textContent =
        `Anxiety Score: ${anxietyScore} - ${anxietySeverity}`;

    const submitContactButton = document.getElementById("submit-contact");

    if (submitContactButton) {
        submitContactButton.addEventListener("click", function () {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            if (!email) {
                alert("Please enter your email before submitting.");
                return;
            }

            // Save contact details locally
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("message", message);

            // Prepare email content
            let emailBody = `Mental Health Form Results:\n\nDepression: ${depressionScore} - ${depressionSeverity}\nAnxiety: ${anxietyScore} - ${anxietySeverity}\n\nContact Details:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

            // Send email
            sendEmail("kuya@gmail.com", "User Contact Details", emailBody);
        });
    }
});

// Function to send email using SMTP
function sendEmail(to, subject, body) {
    Email.send({
        SecureToken: "your-smtp-token",
        To: to,
        From: "healthyminds@iplatform.co.ke",
        Subject: subject,
        Body: body
    }).then(message => alert("Contact details sent successfully!"));
}
