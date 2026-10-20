const questionInput = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const answer = document.getElementById("answer");

askBtn.addEventListener("click", async () => {

    const question = questionInput.value;

    if (!question) {
        answer.textContent = "Please enter a question.";
        return;
    }

    answer.textContent = "Thinking...";

    try {

        const response = await fetch("https://phase-5-project-jpn6.onrender.com/ask", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        answer.textContent = data.answer;

    } catch (error) {

        answer.textContent = "Something went wrong.";

        console.error(error);
    }
});