const questions = {
    depression: [
        "Little interest or pleasure in doing things",
        "Feeling down, depressed or hopeless",
        "Trouble falling or staying asleep, sleeping too much",
        "Feeling tired or having little energy",
        "Poor appetite or overeating",
        "Feeling bad about yourself-or that you are a failure or have let yourself or your family down",
        "Trouble concentrating on things, such as reading the newspaper or watching television",
        "Moving or speaking so slowly that other people could have noticed. Or the opposite-being so figety or restless that you have been moving around a lot more than usual",
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

const formContainer = document.getElementById('form-container');
const depressionQuestionsDiv = document.getElementById('depression-questions');
const anxietyQuestionsDiv = document.getElementById('anxiety-questions');
const mentalHealthForm = document.getElementById('mental-health-form');
const resultsDiv = document.getElementById('results');
const contactFormDiv = document.getElementById('contact-form');
const submitContactButton = document.getElementById('submit-contact');

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
        optionLabel.innerHTML = `
            <input type="radio" name="${questionType}-${questionIndex}" value="${i}" required> ${i === 0 ? 'Not at all' : i === 1 ? 'Several days' : i === 2 ? 'More than half the days' : 'Nearly every day'}
        `;
        optionsDiv.appendChild(optionLabel);
    }

    questionDiv.appendChild(optionsDiv);
    return questionDiv;
}

questions.depression.forEach((question, index) => {
    depressionQuestionsDiv.appendChild(createQuestion(question, 'depression', index));
});


questions.anxiety.forEach((question, index) => {
    anxietyQuestionsDiv.appendChild(createQuestion(question, 'anxiety', index));
});

mentalHealthForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let depressionScore = 0;
    let anxietyScore = 0;

    // Calculate depression score
    for (let i = 0; i < questions.depression.length; i++) {
        depressionScore += parseInt(document.querySelector(`input[name="depression-${i}"]:checked`).value);
    }

    // Calculate anxiety score
    for (let i = 0; i < questions.anxiety.length; i++) {
        anxietyScore += parseInt(document.querySelector(`input[name="anxiety-${i}"]:checked`).value);
    }

    const depressionSeverity = getDepressionSeverity(depressionScore);
    const anxietySeverity = getAnxietySeverity(anxietyScore);


    // Store results and contact info in local storage
    localStorage.setItem('depressionScore', depressionScore);
    localStorage.setItem('depressionSeverity', depressionSeverity);
    localStorage.setItem('anxietyScore', anxietyScore);
    localStorage.setItem('anxietySeverity', anxietySeverity);

    // Redirect to results page
    window.location.href = 'results.html';
});

function getDepressionSeverity(score) {
    if (score >= 0 && score <= 4) return "Minimal depression";
    if (score >= 5 && score <= 9) return "Mild depression";
    if (score >= 10 && score <= 14) return "Moderate depression";
    if (score >= 15 && score <= 19) return "Moderately severe depression";
    return "Severe depression";
}

function getAnxietySeverity(score) {
    if (score >= 0 && score <= 4) return "Minimal anxiety";
    if (score >= 5 && score <= 9) return "Mild anxiety";
    if (score >= 10 && score <= 14) return "Moderate anxiety";
    return "Severe anxiety";
}

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
        Depression: ${localStorage.getItem('depressionScore')} - ${localStorage.getItem('depressionSeverity')}
        Anxiety: ${localStorage.getItem('anxietyScore')} - ${localStorage.getItem('anxietySeverity')}
    `;

    if (name || email || message) {
        emailBody += `\n\nContact Details:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    }

    // Send email
    sendEmail(emailBody);
});

function sendEmail(body) {
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            body: JSON.stringify({
                service_id: 'service_gvdt6vh',
                template_id: 'template_m5x8t4q',
                user_id: 'p_i3gJ9EuQtqhez8b',
                template_params: {
                    'from_name': 'jackson@gmail.com',
                    'to_name': 'jkuya@gmail.com',
                    'message': body,
                    'reply_to': 'jackson@gmail.com'
                }
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
