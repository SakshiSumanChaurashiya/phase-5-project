
const questionInput = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const answer = document.getElementById("answer");

askBtn.addEventListener("click", async () => {
    const question = questionInput.value.trim();

    if (!question) {
        answer.textContent = "Please enter a question.";
        return;
    }

    answer.textContent = "Thinking...";
    askBtn.disabled = true;

    try {
        const response = await fetch(
            "https://phase-5-project-jpn6.onrender.com/ask",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Server error: ${response.status}`);
        }

        answer.textContent = data.answer || "No answer received.";

    } catch (error) {
        console.error("Error:", error);
        answer.textContent = "Error: " + error.message;
    } finally {
        askBtn.disabled = false;
    }
});
