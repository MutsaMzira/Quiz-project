/* 
  BrainBlast Quiz Logic
  Handles quiz flow, score tracking,
  answer checking and results page.
*/

/* jshint esversion: 6 */

// =========================
// Page sections
// =========================

const homePage = document.getElementById("home-page");
const quizPage = document.getElementById("quiz-page");
const resultsPage = document.getElementById("results-page");

// Buttons
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

// Quiz text and progress
const qCounter = document.getElementById("q-counter");
const qTypeBadge = document.getElementById("q-type-badge");
const progressFill = document.getElementById("progress-fill");
const progressWrap = document.querySelector(".progress-bar-wrap");
const questionText = document.getElementById("question-text");
const optionsGrid = document.getElementById("options-grid");

// Fill in blank
const fitbWrap = document.getElementById("fitb-wrap");
const fitbInput = document.getElementById("fitb-input");

// Feedback
const feedbackBox = document.getElementById("feedback-box");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackText = document.getElementById("feedback-text");

// Live score
const scoreLive = document.getElementById("score-live");

// Results
const resultsEmoji = document.getElementById("results-emoji");
const resultsTitle = document.getElementById("results-title");
const ringFill = document.getElementById("ring-fill");
const ringNum = document.getElementById("ring-num");
const resultsPct = document.getElementById("results-pct");
const resultsBreakdown = document.getElementById("results-breakdown");

// =========================
// Quiz variables
// =========================

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let userAnswers = [];

// =========================
// Shuffle questions
// =========================

function shuffleArray(arr) {

  const copied = [...arr];

  for (let i = copied.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
  }

  return copied;
}

// =========================
// Show pages
// =========================

function showPage(page) {

  [homePage, quizPage, resultsPage].forEach(function(section) {
    if (section) {
      section.classList.add("hidden");
    }
  });

  page.classList.remove("hidden");
}

// =========================
// Start quiz
// =========================

function startQuiz() {

  shuffledQuestions = shuffleArray(QUESTIONS);

  currentIndex = 0;
  score = 0;
  answered = false;
  userAnswers = [];

  scoreLive.textContent = "Score: 0";

  showPage(quizPage);
  loadQuestion();
}

// =========================
// Load question
// =========================

function loadQuestion() {

  const currentQuestion = shuffledQuestions[currentIndex];

  answered = false;

  // Question counter
  qCounter.textContent = "Question " + (currentIndex + 1) + " of " + shuffledQuestions.length;

  // Progress bar
  const progress = (currentIndex / shuffledQuestions.length) * 100;
  progressFill.style.width = progress + "%";
  progressWrap.setAttribute("aria-valuenow", currentIndex);

  // Type badge
  const labels = {
    mc: "Multiple Choice",
    tf: "True / False",
    fitb: "Fill in the Blank"
  };

  qTypeBadge.textContent = labels[currentQuestion.type] || "Question";

  // Question text
  questionText.textContent = currentQuestion.question;

  // Reset feedback
  feedbackBox.classList.add("hidden");
  feedbackBox.classList.remove("correct-fb", "incorrect-fb");

  nextBtn.disabled = true;

  // Load the right question type
  if (currentQuestion.type === "mc") {
    renderMC(currentQuestion);
  } else if (currentQuestion.type === "tf") {
    renderTF(currentQuestion);
  } else if (currentQuestion.type === "fitb") {
    renderFITB(currentQuestion);
  }

}

// =========================
// Multiple choice
// =========================

function renderMC(question) {

  optionsGrid.classList.remove("hidden");
  fitbWrap.classList.add("hidden");
  optionsGrid.innerHTML = "";

  const shuffledOptions = shuffleArray(question.options);

  shuffledOptions.forEach(function(option) {

    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;

    button.addEventListener("click", function() {
      selectOption(button, option, question);
    });

    optionsGrid.appendChild(button);

  });

}

// =========================
// True or false
// =========================

function renderTF(question) {

  optionsGrid.classList.remove("hidden");
  fitbWrap.classList.add("hidden");
  optionsGrid.innerHTML = "";

  ["True", "False"].forEach(function(option) {

    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;

    button.addEventListener("click", function() {
      selectOption(button, option, question);
    });

    optionsGrid.appendChild(button);

  });

}

// =========================
// Selecting answers
// =========================

function selectOption(clickedBtn, selected, question) {

  if (answered) { return; }

  answered = true;

  const correct = selected === question.answer;
  const buttons = optionsGrid.querySelectorAll(".option-btn");

  buttons.forEach(function(button) {
    button.disabled = true;
    if (button.textContent === question.answer) {
      button.classList.add("reveal");
    }
  });

  if (correct) {
    clickedBtn.classList.remove("reveal");
    clickedBtn.classList.add("correct");
    score++;
  } else {
    clickedBtn.classList.add("incorrect");
  }

  scoreLive.textContent = "Score: " + score;

  showFeedback(correct, question);
  recordAnswer(question, selected, correct);

  nextBtn.disabled = false;
}

// =========================
// Fill in blank
// =========================

function renderFITB(question) {

  optionsGrid.classList.add("hidden");
  fitbWrap.classList.remove("hidden");

  fitbInput.value = "";
  fitbInput.disabled = false;
  fitbInput.focus();

  // Submit using Enter
  fitbInput.onkeydown = function(event) {
    if (event.key === "Enter") {
      submitFITB(question);
    }
  };

  nextBtn.disabled = false;

  nextBtn.onclick = function() {
    if (!answered) {
      submitFITB(question);
    } else {
      advanceQuestion();
    }
  };

}

// =========================
// Submit fill blank answer
// =========================

function submitFITB(question) {

  if (answered) { return; }

  answered = true;

  const userValue = fitbInput.value.trim().toLowerCase();
  const correctValue = question.answer.trim().toLowerCase();
  const correct = userValue === correctValue;

  fitbInput.disabled = true;

  if (correct) { score++; }

  scoreLive.textContent = "Score: " + score;

  showFeedback(correct, question);
  recordAnswer(question, fitbInput.value.trim(), correct);

  nextBtn.onclick = function() {
    advanceQuestion();
  };

}

// =========================
// Feedback message
// =========================

function showFeedback(correct, question) {

  feedbackBox.classList.remove("hidden", "correct-fb", "incorrect-fb");

  if (correct) {
    feedbackBox.classList.add("correct-fb");
    feedbackIcon.textContent = "✅";
    feedbackText.textContent = "Correct! " + question.explanation;
  } else {
    feedbackBox.classList.add("incorrect-fb");
    feedbackIcon.textContent = "❌";
    feedbackText.textContent = "Correct answer: " + question.answer + ". " + question.explanation;
  }

}

// =========================
// Save answers
// =========================

function recordAnswer(question, userAnswer, correct) {

  userAnswers.push({
    question: question.question,
    userAnswer: userAnswer,
    correct: correct,
    correctAnswer: question.answer,
    explanation: question.explanation
  });

}

// =========================
// Next question
// =========================

function advanceQuestion() {

  currentIndex++;

  if (currentIndex < shuffledQuestions.length) {

    loadQuestion();

    if (shuffledQuestions[currentIndex].type !== "fitb") {
      nextBtn.onclick = function() {
        if (answered) { advanceQuestion(); }
      };
    }

  } else {
    showResults();
  }

}

// =========================
// Results page
// =========================

function showResults() {

  showPage(resultsPage);

  const totalQuestions = shuffledQuestions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  let emoji;
  let title;

  // Result rankings
  if (percentage >= 90) {
    emoji = "🏆";
    title = "Excellent!";
  } else if (percentage >= 70) {
    emoji = "🥈";
    title = "Great Job!";
  } else if (percentage >= 50) {
    emoji = "🥉";
    title = "Nice Try!";
  } else {
    emoji = "📚";
    title = "Keep Practicing!";
  }

  resultsEmoji.textContent = emoji;
  resultsTitle.textContent = title;
  resultsPct.textContent = "You scored " + score + " out of " + totalQuestions + " (" + percentage + "%)";
  ringNum.textContent = score;

  // Animate the score ring
  const circumference = 314;
  const offset = circumference - (percentage / 100) * circumference;

  setTimeout(function() {
    ringFill.style.strokeDashoffset = offset;
  }, 100);

  progressFill.style.width = "100%";

  // Build answer breakdown
  resultsBreakdown.innerHTML = "";

  userAnswers.forEach(function(item) {

    const div = document.createElement("div");
    div.classList.add("breakdown-item", item.correct ? "bd-correct" : "bd-incorrect");

    const questionElement = document.createElement("p");
    questionElement.classList.add("bd-q");
    questionElement.textContent = item.question;

    const answerElement = document.createElement("p");
    answerElement.classList.add("bd-a");

    if (item.correct) {
      answerElement.innerHTML = "Your answer: <span class='bd-correct-ans'>" + escapeHTML(item.userAnswer) + " ✓</span>";
    } else {
      answerElement.innerHTML = "Your answer: <em>" + escapeHTML(item.userAnswer || "(none)") + "</em> · Correct: <span class='bd-correct-ans'>" + escapeHTML(item.correctAnswer) + "</span>";
    }

    div.appendChild(questionElement);
    div.appendChild(answerElement);
    resultsBreakdown.appendChild(div);

  });

}

// =========================
// Prevent HTML injection
// =========================

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// =========================
// Event listeners
// =========================

if (startBtn) {
  startBtn.addEventListener("click", startQuiz);
}

if (nextBtn) {
  nextBtn.onclick = function() {
    if (answered) { advanceQuestion(); }
  };
}

if (retryBtn) {
  retryBtn.addEventListener("click", startQuiz);
}
