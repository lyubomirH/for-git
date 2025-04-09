const quiz = {
    title: "Активационна Викторина по Уеб Технологии",
    quizItems: [
      {
        question: "Кой е правилният ред на елементите в основната структура на HTML документ?",
        options: [
          "<!DOCTYPE>, <html>, <head>, <body>",
          "<html>, <head>, <title>, <body>",
          "<head>, <html>, <body>, <title>",
          "<!DOCTYPE>, <body>, <html>, <head>"
        ],
        correctAnswer: 0
      },
      {
        question: "Какъв е основният елемент за създаване на навигационно меню в HTML5?",
        options: [
          "<nav>",
          "<menu>",
          "<ul>",
          "<header>"
        ],
        correctAnswer: 0
      },
      {
        question: "Какво описва DOM (Document Object Model)?",
        options: [
          "Метод за стилизиране на уеб страници",
          "Обектно-базиран интерфейс за взаимодействие с HTML и XML документи",
          "Система за управление на бази данни",
          "Език за създаване на интерактивни елементи на уеб страницата"
        ],
        correctAnswer: 1
      },
      {
        question: "Кой метод се използва за добавяне на CSS клас към елемент чрез JavaScript?",
        options: [
          "addClass()",
          "classList.add()",
          "setAttribute('class')",
          "appendClass()"
        ],
        correctAnswer: 1
      },
      {
        question: "Кой от следните начини не е валиден за включване на CSS във HTML документ?",
        options: [
          "Външен стилов файл чрез <link>",
          "Вграждане на стилове чрез <style>",
          "Инлайн стилове чрез атрибута style",
          "Включване на CSS чрез <script> таг"
        ],
        correctAnswer: 3
      },
      {
        question: "Как може да се асоциира JavaScript функция с бутон за кликване?",
        options: [
          "Използвайки атрибута onclick в HTML",
          "Чрез добавяне на <script> таг след бутона",
          "Включвайки функцията в CSS файла",
          "Използвайки атрибут onhover в JavaScript"
        ],
        correctAnswer: 0
      },
      {
        question: "Кой метод се използва за селектиране на всички елементи с даден клас в JavaScript?",
        options: [
          "document.getElementByClass()",
          "document.querySelectorAll()",
          "document.getElementsByClassName()",
          "document.selectByClass()"
        ],
        correctAnswer: 2
      },
      {
        question: "Кой оператор се използва за проверка на типа на променлива в JavaScript?",
        options: [
          "instanceof",
          "typeof",
          "getType",
          "checkType"
        ],
        correctAnswer: 1
      },
      {
        question: "Какъв е резултатът от израза: `5 + '5'` в JavaScript?",
        options: [
          "10",
          "'55'",
          "NaN",
          "undefined"
        ],
        correctAnswer: 1
      },
      {
        question: "Кой метод се използва за преобразуване на обект в JSON формат?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "toJSON()",
          "convertToJSON()"
        ],
        correctAnswer: 1
      },
      {
        question: "Как се създава анонимна функция в JavaScript?",
        options: [
          "function () { ... }",
          "function() => { ... }",
          "() => { ... }",
          "anonymous function { ... }"
        ],
        correctAnswer: 2
      },
      {
        question: "Каква е основната разлика между localStorage и sessionStorage?",
        options: [
          "localStorage изтича след затваряне на браузъра, а sessionStorage не",
          "sessionStorage изтича след затваряне на браузъра, а localStorage не",
          "localStorage може да съхранява само стрингове, докато sessionStorage може да съхранява обекти",
          "sessionStorage е достъпна от всички домейни, а localStorage не"
        ],
        correctAnswer: 1
      },
      {
        question: "Кой метод се използва за премахване на дете елемент от родителски елемент в DOM?",
        options: [
          "parent.removeChild(child)",
          "child.remove()",
          "parent.deleteChild(child)",
          "child.delete()"
        ],
        correctAnswer: 0
      },
      {
        question: "Какъв е основният предимство на използването на event delegation?",
        options: [
          "Намалява броя на необходимите обработчици на събития",
          "Увеличава скоростта на зареждане на страницата",
          "Позволява използването на повече CSS класове",
          "Оптимизира размера на HTML документа"
        ],
        correctAnswer: 0
      },
      {
        question: "Кой метод се използва за избиране на първия елемент, отговарящ на даден CSS селектор?",
        options: [
          "document.getElementsBySelector()",
          "document.querySelector()",
          "document.selectFirst()",
          "document.getFirstElement()"
        ],
        correctAnswer: 1
      },
      {
        question: "Как се добавя нов елемент към края на списък с JavaScript?",
        options: [
          "appendChild()",
          "addElement()",
          "push()",
          "insertAfter()"
        ],
        correctAnswer: 0
      },
      {
        question: "Кой CSS свойство се използва за промяна на цвета на текста?",
        options: [
          "background-color",
          "font-color",
          "color",
          "text-color"
        ],
        correctAnswer: 2
      },
      {
        question: "Какво прави методът `preventDefault()` в JavaScript?",
        options: [
          "Спира изпълнението на текущата функция",
          "Предотвратява изпълнението на стандартното действие на събитието",
          "Премахва събитието от DOM",
          "Добавя ново действие към събитието"
        ],
        correctAnswer: 1
      },
      {
        question: "Кой HTML елемент се използва за въвеждане на текстово поле в форма?",
        options: [
          "<input type='text'>",
          "<textarea>",
          "<input type='textarea'>",
          "<form>"
        ],
        correctAnswer: 0
      },
      {
        question: "Какъв е начинът за добавяне на коментар в CSS?",
        options: [
          "// това е коментар",
          "/* това е коментар */",
          "# това е коментар",
          "<!-- Това е коментар -->"
        ],
        correctAnswer: 1
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