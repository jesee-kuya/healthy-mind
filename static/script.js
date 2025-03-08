const questions = {
    depression: [
        "Little interest or pleasure in doing things",
        "Feeling down, depressed or hopeless",
        "Trouble falling or staying asleep, sleeping too much",
        "Feeling tired or having little energy",
        "Poor appetite or overeating",
        "Feeling bad about yourself—or that you are a failure or have let yourself or your family down",
        "Trouble concentrating on things, such as reading the newspaper or watching television",
        "Moving or speaking so slowly that other people could have noticed. Or the opposite—being so fidgety or restless that you have been moving around a lot more than usual",
        "Thoughts that you would be better off dead, or of hurting yourself"
    ],
    anxiety: [
        "Feeling nervous, anxious, or on edge",
        "Not being able to stop or control worrying",
        "Worrying too much about different things",
        "Trouble relaxing",
        "Being so restless that it is hard to sit still",
        "Becoming easily annoyed or irritable",
        "Feeling afraid as if something awful might happen"
    ]
};

const depressionQuestionsDiv = document.getElementById('depression-questions');
const anxietyQuestionsDiv = document.getElementById('anxiety-questions');
const mentalHealthForm = document.getElementById('mental-health-form');

function createQuestion(questionText, questionType, questionIndex) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const label = document.createElement('label');
    label.textContent = questionText;
    questionDiv.appendChild(label);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    for (let i = 0; i <= 3; i++) {
        const optionLabel = document.createElement('label');
        optionLabel.innerHTML = `<input type="radio" name="${questionType}-${questionIndex}" value="${i}" required> 
                                 ${i === 0 ? 'Not at all' : i === 1 ? 'Several days' : i === 2 ? 'More than half the days' : 'Nearly every day'}`;
        optionsDiv.appendChild(optionLabel);
    }

    questionDiv.appendChild(optionsDiv);
    return questionDiv;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("mental-health-form");

    questions.depression.forEach((question, index) => {
        depressionQuestionsDiv.appendChild(createQuestion(question, 'depression', index));
    });

    questions.anxiety.forEach((question, index) => {
        anxietyQuestionsDiv.appendChild(createQuestion(question, 'anxiety', index));
    });

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let depressionScore = 0;
            let anxietyScore = 0;

            // Collect responses
            const depressionQuestions = document.querySelectorAll('input[name="depression"]:checked');
            const anxietyQuestions = document.querySelectorAll('input[name="anxiety"]:checked');

            depressionQuestions.forEach(q => {
                depressionScore += parseInt(q.value);
            });

            anxietyQuestions.forEach(q => {
                anxietyScore += parseInt(q.value);
            });

            // Determine severity
            let depressionSeverity = depressionScore >= 15 ? "Severe" :
                                     depressionScore >= 10 ? "Moderate" :
                                     depressionScore >= 5 ? "Mild" : "Minimal";

            let anxietySeverity = anxietyScore >= 15 ? "Severe" :
                                  anxietyScore >= 10 ? "Moderate" :
                                  anxietyScore >= 5 ? "Mild" : "Minimal";

            // Store results in localStorage
            localStorage.setItem("depressionScore", depressionScore);
            localStorage.setItem("depressionSeverity", depressionSeverity);
            localStorage.setItem("anxietyScore", anxietyScore);
            localStorage.setItem("anxietySeverity", anxietySeverity);

            // Send email with results
            sendEmail(
                "kuyajesee@proton.me",
                "Mental Health Assessment Results",
                `Depression Score: ${depressionScore} - ${depressionSeverity}\nAnxiety Score: ${anxietyScore} - ${anxietySeverity}`
            );

            // Redirect to results page
            window.location.href = "results.html";
        });
    }
});

// Function to send email using SMTP
function sendEmail(to, subject, body) {
    Email.send({
        SecureToken: "mail.iplatform.co.ke",
        To: to,
        From: "healthyminds@iplatform.co.ke",
        Subject: subject,
        Body: body
    }).then(message => alert("Email sent successfully!"));
}
