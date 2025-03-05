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

