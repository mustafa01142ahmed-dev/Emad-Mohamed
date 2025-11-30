document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    const navBtns = document.querySelectorAll('.nav-btn');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const confettiCanvas = document.getElementById('confetti-canvas');

    // --- AUDIO SYSTEM (Web Audio API) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playSound(type) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'correct') {
            // Success sound (High pitch major chord arpeggio)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
            osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.4);
        } else if (type === 'wrong') {
            // Error sound (Low pitch buzz)
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        } else if (type === 'click') {
            // Click sound (Short blip)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        }
    }

    // --- CONFETTI SYSTEM ---
    let confettiCtx = confettiCanvas.getContext('2d');
    let confettiParticles = [];
    let confettiAnimationId = null;

    function resizeConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeConfetti);
    resizeConfetti();

    function createConfetti() {
        const colors = ['#6C5CE7', '#00CEC9', '#FD79A8', '#FDCB6E', '#55EFC4'];
        for (let i = 0; i < 100; i++) {
            confettiParticles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }
    }

    function updateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles.forEach((p, index) => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate(p.rotation * Math.PI / 180);
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            confettiCtx.restore();

            if (p.y > confettiCanvas.height) {
                confettiParticles.splice(index, 1);
            }
        });

        if (confettiParticles.length > 0) {
            confettiAnimationId = requestAnimationFrame(updateConfetti);
        } else {
            cancelAnimationFrame(confettiAnimationId);
        }
    }

    function startConfetti() {
        createConfetti();
        updateConfetti();
        // Add more bursts
        setTimeout(createConfetti, 500);
        setTimeout(createConfetti, 1000);
    }

    // --- APP LOGIC ---

    // Quiz State
    let quizState = {
        questions: [],
        userAnswers: [],
        currentIndex: 0,
        streak: 0
    };

    // Voice Setup
    let selectedVoice = null;
    function loadVoices() {
        const voices = window.speechSynthesis.getVoices();
        selectedVoice = voices.find(v => v.name.includes('Google US English')) ||
            voices.find(v => v.name.includes('Samantha')) ||
            voices.find(v => v.lang === 'en-US' && v.name.includes('Natural')) ||
            voices.find(v => v.lang === 'en-US');
    }
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    // Navigation Logic
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound('click');
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const section = btn.dataset.section;
            loadSection(section);

            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    menuToggle.addEventListener('click', () => {
        playSound('click');
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('active');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    });

    function loadSection(section) {
        contentArea.innerHTML = '';

        switch (section) {
            case 'home':
                pageTitle.textContent = 'مرحباً بك في عالم الإنجليزية!';
                contentArea.innerHTML = `
                    <div class="welcome-screen">
                        <div class="welcome-card">
                            <i class="fa-solid fa-star bounce"></i>
                            <h3>ابدأ رحلة التعلم</h3>
                            <p>اختر قسماً من القائمة الجانبية للبدء.</p>
                        </div>
                    </div>`;
                break;
            case 'phonics':
                pageTitle.textContent = 'الصوتيات (Phonics)';
                renderCategories(appData.phonics, 'phonics');
                break;
            case 'vocabulary':
                pageTitle.textContent = 'الكلمات (Vocabulary)';
                renderCategories(appData.vocabulary, 'vocabulary');
                break;
            case 'grammar':
                pageTitle.textContent = 'القواعد (Grammar)';
                renderGrammar(appData.grammar);
                break;
            case 'numbers':
                pageTitle.textContent = 'الأرقام (Numbers)';
                renderNumbers(appData.numbers);
                break;
            case 'quiz':
                pageTitle.textContent = 'اختبر معلوماتك';
                startQuiz();
                break;
        }
    }

    function renderCategories(data, type) {
        const grid = document.createElement('div');
        grid.className = 'grid-container';

        data.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <i class="fa-solid ${getIconForCategory(cat.id)}"></i>
                <h3>${cat.title}</h3>
            `;
            card.addEventListener('click', () => {
                playSound('click');
                if (type === 'phonics') renderPhonicsDetail(cat);
                else renderVocabDetail(cat);
            });
            grid.appendChild(card);
        });

        contentArea.appendChild(grid);
    }

    function getIconForCategory(id) {
        const icons = {
            'ea': 'fa-music', 'so': 'fa-dog', 'o': 'fa-moon', 'a': 'fa-car',
            'family': 'fa-users', 'animals': 'fa-paw', 'adjectives': 'fa-face-smile',
            'body': 'fa-child', 'places': 'fa-map-location-dot', 'colors': 'fa-palette'
        };
        return icons[id] || 'fa-star';
    }

    function renderPhonicsDetail(category) {
        pageTitle.textContent = category.title;
        renderFlashcards(category.words);
    }

    function renderVocabDetail(category) {
        pageTitle.textContent = category.title;
        renderFlashcards(category.words);
    }

    function renderFlashcards(words) {
        const grid = document.createElement('div');
        grid.className = 'grid-container';

        words.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <span class="word-en">${item.word || item.english}</span>
                        <button class="speak-btn"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                    <div class="card-back">
                        <span class="word-ar">${item.arabic}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.closest('.speak-btn')) {
                    playSound('click');
                    card.classList.toggle('flipped');
                }
            });

            const speakBtn = card.querySelector('.speak-btn');
            speakBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                speak(item.word || item.english);
            });

            grid.appendChild(card);
        });

        const backBtn = document.createElement('button');
        backBtn.className = 'nav-btn';
        backBtn.style.marginBottom = '20px';
        backBtn.innerHTML = '<i class="fa-solid fa-arrow-right"></i> رجوع';
        backBtn.onclick = () => {
            playSound('click');
            loadSection(appData.phonics.some(p => p.words === words) ? 'phonics' : 'vocabulary');
        };

        contentArea.innerHTML = '';
        contentArea.appendChild(backBtn);
        contentArea.appendChild(grid);
    }

    function renderGrammar(grammarData) {
        grammarData.forEach(item => {
            const div = document.createElement('div');
            div.className = 'grammar-item';

            let tableRows = item.content.map(row => `
                <tr>
                    <td>${row.english}</td>
                    <td>${row.arabic}</td>
                    <td><button class="speak-btn" onclick="speak('${row.english.replace(/'/g, "\\'")}')"><i class="fa-solid fa-volume-high"></i></button></td>
                </tr>
            `).join('');

            div.innerHTML = `
                <h3>${item.title}</h3>
                <table class="grammar-table">
                    ${tableRows}
                </table>
            `;
            contentArea.appendChild(div);
        });
        window.speak = speak;
    }

    function renderNumbers(numbersData) {
        const grid = document.createElement('div');
        grid.className = 'grid-container';

        numbersData.forEach(num => {
            const card = document.createElement('div');
            card.className = 'number-card';
            card.innerHTML = `
                <div class="digit">${num.digit}</div>
                <div class="word-en">${num.english}</div>
                <div class="word-ar">${num.arabic}</div>
                <button class="speak-btn" style="margin-top:10px"><i class="fa-solid fa-volume-high"></i></button>
            `;

            card.querySelector('.speak-btn').addEventListener('click', () => speak(num.english));
            grid.appendChild(card);
        });

        contentArea.appendChild(grid);
    }

    // --- QUIZ LOGIC ---

    function startQuiz() {
        let allWords = [];
        appData.vocabulary.forEach(cat => allWords.push(...cat.words));
        appData.phonics.forEach(cat => allWords.push(...cat.words));

        // Shuffle and pick 10 unique words
        allWords.sort(() => Math.random() - 0.5);
        const selectedWords = allWords.slice(0, 10);

        quizState.questions = [];
        selectedWords.forEach(wordObj => {
            const correct = wordObj.word || wordObj.english;

            let options = [wordObj.arabic];
            while (options.length < 4) {
                const r = allWords[Math.floor(Math.random() * allWords.length)];
                const ar = r.arabic;
                if (!options.includes(ar) && ar) options.push(ar);
            }
            options.sort(() => Math.random() - 0.5);

            quizState.questions.push({
                question: correct,
                options: options,
                correctAnswer: wordObj.arabic
            });
        });

        quizState.userAnswers = new Array(10).fill(null);
        quizState.currentIndex = 0;
        quizState.streak = 0; // Reset streak

        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        const q = quizState.questions[quizState.currentIndex];
        const currentAns = quizState.userAnswers[quizState.currentIndex];

        // Streak HTML
        const streakHTML = quizState.streak > 1
            ? `<div class="streak-badge bounce">🔥 ${quizState.streak} متتالي!</div>`
            : '';

        contentArea.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <span>السؤال ${quizState.currentIndex + 1} من 10</span>
                    ${streakHTML}
                    <span class="quiz-progress">${Math.round(((quizState.currentIndex) / 10) * 100)}%</span>
                </div>
                <h2 class="quiz-question">${q.question}</h2>
                <div class="quiz-options">
                    ${q.options.map((opt, idx) => `
                        <button class="quiz-opt ${currentAns === idx ? 'selected' : ''}" onclick="handleAnswer(${idx})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-controls">
                    <button class="quiz-btn btn-prev" onclick="prevQuestion()" ${quizState.currentIndex === 0 ? 'disabled style="opacity:0.5"' : ''}>السابق</button>
                    ${quizState.currentIndex === 9
                ? `<button class="quiz-btn btn-submit" onclick="showReviewScreen()">مراجعة وإرسال</button>`
                : `<button class="quiz-btn btn-next" onclick="nextQuestion()">التالي</button>`
            }
                </div>
            </div>
        `;

        window.handleAnswer = handleAnswer;
        window.prevQuestion = prevQuestion;
        window.nextQuestion = nextQuestion;
        window.showReviewScreen = showReviewScreen;
    }

    function handleAnswer(optionIndex) {
        // Prevent changing answer if already answered correctly to cheat streak (optional, but keeping simple)
        const isFirstAnswer = quizState.userAnswers[quizState.currentIndex] === null;
        quizState.userAnswers[quizState.currentIndex] = optionIndex;

        const q = quizState.questions[quizState.currentIndex];
        const isCorrect = q.options[optionIndex] === q.correctAnswer;

        if (isFirstAnswer) {
            if (isCorrect) {
                quizState.streak++;
                playSound('correct');
                if (quizState.streak > 1) {
                    // Small confetti burst for streak
                    createConfetti();
                    setTimeout(() => confettiParticles = [], 500); // Quick burst
                }
            } else {
                quizState.streak = 0;
                playSound('click'); // Just click sound for selection
            }
        } else {
            playSound('click');
        }

        renderQuizQuestion();

        if (quizState.currentIndex < 9) {
            setTimeout(() => {
                if (quizState.userAnswers[quizState.currentIndex] === optionIndex) {
                    nextQuestion();
                }
            }, 600);
        }
    }

    function prevQuestion() {
        playSound('click');
        if (quizState.currentIndex > 0) {
            quizState.currentIndex--;
            renderQuizQuestion();
        }
    }

    function nextQuestion() {
        playSound('click');
        if (quizState.currentIndex < 9) {
            quizState.currentIndex++;
            renderQuizQuestion();
        }
    }

    function showReviewScreen() {
        playSound('click');
        let reviewHTML = `
            <div class="quiz-container">
                <h2>مراجعة الإجابات</h2>
                <p>اضغط على رقم السؤال لتعديل الإجابة</p>
                <div class="review-list">
                    ${quizState.userAnswers.map((ans, idx) => `
                        <div class="review-item ${ans !== null ? 'answered' : ''}" onclick="jumpToQuestion(${idx})">
                            ${idx + 1}
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-controls" style="justify-content: center;">
                    <button class="quiz-btn btn-submit" onclick="submitQuiz()">اعتماد النتيجة النهائية</button>
                </div>
            </div>
        `;
        contentArea.innerHTML = reviewHTML;
        window.jumpToQuestion = (idx) => {
            playSound('click');
            quizState.currentIndex = idx;
            renderQuizQuestion();
        };
        window.submitQuiz = submitQuiz;
    }

    function submitQuiz() {
        let score = 0;
        quizState.questions.forEach((q, idx) => {
            const userAnsIdx = quizState.userAnswers[idx];
            if (userAnsIdx !== null && q.options[userAnsIdx] === q.correctAnswer) {
                score++;
            }
        });

        // Play result sound
        if (score >= 5) {
            playSound('correct');
            if (score >= 8) startConfetti(); // Celebration for high score
        } else {
            playSound('wrong');
        }

        contentArea.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-card">
                    <i class="fa-solid fa-trophy bounce" style="color:gold"></i>
                    <h3>نتيجتك هي</h3>
                    <h1 style="font-size: 4rem; color:var(--primary-color); margin: 20px 0;">${score} / 10</h1>
                    <div class="result-quote">
                        "الخطأ ليس نهاية ولكن بداية إنسان عظيم"
                    </div>
                    <button class="nav-btn active" onclick="startQuiz()" style="margin-top:20px; justify-content:center">
                        <i class="fa-solid fa-rotate-right"></i> إعادة الامتحان
                    </button>
                </div>
            </div>
        `;
        window.startQuiz = startQuiz;
    }

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }
});
