const quiz = {
  title: "Обща Викторина",
  quizItems: [
    {
      question: "Коя е столицата на България?",
      options: ["София", "Пловдив", "Варна", "Бургас"],
      correctAnswer: 0
    },
    {
      question: "Кой е създателят на JavaScript?",
      options: ["Brendan Eich", "Bill Gates", "Mark Zuckerberg", "Linus Torvalds"],
      correctAnswer: 0
    },
    {
      question: "Какъв е символът за множествено умножение в JavaScript?",
      options: ["x", "*", "X", "^"],
      correctAnswer: 1
    },
    {
      question: "Коя от следните функции конвертира низ в число?",
      options: ["parseInt()", "parseFloat()", "Number()", "Всички"],
      correctAnswer: 3
    },
    {
      question: "Какъв тип данни връща функцията typeof?",
      options: ["Низ", "Число", "Обект", "Булева стойност"],
      correctAnswer: 0
    },
    {
      question: "Кой HTML елемент се използва за вграждане на JavaScript код?",
      options: ["<script>", "<js>", "<code>", "<javascript>"],
      correctAnswer: 0
    },
    {
      question: "Какво означава CSS абревиатурата?",
      options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
      correctAnswer: 0
    },
    {
      question: "Коя от следните конструкции използваме за условно изпълнение в JavaScript?",
      options: ["if-else", "for", "while", "switch"],
      correctAnswer: 0
    },
    {
      question: "Какво ще върне изразът: 3 + '3' в JavaScript?",
      options: ["6", "'33'", "NaN", "Error"],
      correctAnswer: 1
    },
    {
      question: "Кой от следните методи на масивите премахва последния елемент?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      correctAnswer: 0
    },
    {
      question: "Какво ще върне изразът: typeof NaN?",
      options: ["'number'", "'NaN'", "'undefined'", "'object'"],
      correctAnswer: 0
    },
    {
      question: "Кой оператор се използва за сравнение без преобразуване на типове?",
      options: ["==", "===", "=", "!=="],
      correctAnswer: 1
    },
    {
      question: "Как се нарича цикъл, който се изпълнява поне веднъж?",
      options: ["for", "while", "do...while", "if"],
      correctAnswer: 2
    },
    {
      question: "Коя от следните функции може да генерира случайно число?",
      options: ["Math.random()", "Math.floor()", "Math.max()", "Math.randomize()"],
      correctAnswer: 0
    },
    {
      question: "Кой е най-правилният начин да коментирате едноредов коментар в JavaScript?",
      options: ["// Това е коментар", "/* Това е коментар */", "<!-- Това е коментар -->", "# Това е коментар"],
      correctAnswer: 0
    }
  ]
};

let currentQuestionIndex = 0;
let score = 0;

const quizTitle = document.getElementById('quizTitle');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');

function loadQuiz() {
    quizTitle.textContent = quiz.title;
    showQuizItem(currentQuestionIndex);
}

function showQuizItem(index) {
    const quizItem = quiz.quizItems[index];
    questionElement.textContent = quizItem.question;
    optionsElement.innerHTML = '';
    quizItem.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(i));
        optionsElement.appendChild(button);
    });
    updateNavigationButtons();
}

function selectAnswer(selectedIndex) {
    const quizItem = quiz.quizItems[currentQuestionIndex];
    if (selectedIndex === quizItem.correctAnswer) {
        score++;
        resultElement.textContent = "Правилен отговор!";
    } else {
        resultElement.textContent = "Грешен отговор!";
    }
    scoreElement.textContent = `Точки: ${score}`;

    if (currentQuestionIndex < quiz.quizItems.length - 1) {
        currentQuestionIndex++;
        showQuizItem(currentQuestionIndex);
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    resultElement.textContent = `Викторината приключи! Вашият резултат е ${score} от ${quiz.quizItems.length}`;
    submitButton.disabled = true;
    nextButton.disabled = true;
}

function updateNavigationButtons() {
    nextButton.disabled = currentQuestionIndex === quiz.quizItems.length - 1;
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < quiz.quizItems.length - 1) {
        currentQuestionIndex++;
        showQuizItem(currentQuestionIndex);
    }
});

submitButton.addEventListener('click', () => {
    showFinalResult();
});

loadQuiz();