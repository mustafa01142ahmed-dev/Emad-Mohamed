document.addEventListener('DOMContentLoaded', () => {
    const GEMINI_API_KEY = 'AIzaSyCCRjf5aeBdPd6tmuezyMqc-P0BMbthhVw';
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    const navBtns = document.querySelectorAll('.nav-btn');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const confettiCanvas = document.getElementById('confetti-canvas');

    // --- AUDIO SYSTEM (Web Audio API) ---
    let audioCtx;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.warn("Web Audio API not supported");
    }

    function playSound(type) {
        if (!audioCtx) return;
        try {
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
        } catch (err) {
            console.error("Audio Error:", err);
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

            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });

    const toggleMenu = (e) => {
        e.stopPropagation();
        e.preventDefault(); // Prevent ghost clicks
        playSound('click');
        if (window.innerWidth <= 1024) {
            sidebar.classList.toggle('active');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('touchstart', toggleMenu, { passive: false });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            e.target !== menuToggle) {
            sidebar.classList.remove('active');
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
                renderQuizLevelSelection();
                break;
            case 'ai-tutor':
                pageTitle.textContent = 'المعلم الذكي (AI Tutor)';
                renderAITutor();
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

    function renderQuizLevelSelection() {
        contentArea.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-card">
                    <i class="fa-solid fa-layer-group bounce" style="color:var(--secondary-color)"></i>
                    <h3>اختر مستوى الامتحان</h3>
                    <p>حدد الصعوبة المناسبة لك للبدء</p>
                    
                    <div class="grid-container" style="grid-template-columns: 1fr; gap: 15px; margin-top: 20px;">
                        <button class="nav-btn" onclick="startQuiz('easy')" style="justify-content: center; background: #00b894; color: white;">
                            <i class="fa-solid fa-star"></i> سهل (3-4 حروف)
                        </button>
                        <button class="nav-btn" onclick="startQuiz('medium')" style="justify-content: center; background: #fdcb6e; color: black;">
                            <i class="fa-solid fa-star-half-stroke"></i> متوسط (5-6 حروف)
                        </button>
                        <button class="nav-btn" onclick="startQuiz('hard')" style="justify-content: center; background: #ff7675; color: white;">
                            <i class="fa-solid fa-fire"></i> صعب (7-10 حروف)
                        </button>
                    </div>
                </div>
            </div>
        `;
        window.startQuiz = startQuiz;
    }

    function startQuiz(level = 'easy') {
        let allWords = [];
        appData.vocabulary.forEach(cat => allWords.push(...cat.words));
        appData.phonics.forEach(cat => allWords.push(...cat.words));

        // Filter based on level
        let filteredWords = allWords.filter(item => {
            const word = item.word || item.english;
            const len = word.replace(/[^a-zA-Z]/g, '').length; // Count only letters

            if (level === 'easy') return len <= 4;
            if (level === 'medium') return len >= 5 && len <= 6;
            if (level === 'hard') return len >= 7;
            return true;
        });

        // Fallback if not enough words
        if (filteredWords.length < 10) {
            // If hard level has few words, mix with medium
            if (level === 'hard') {
                const mediumWords = allWords.filter(item => {
                    const len = (item.word || item.english).replace(/[^a-zA-Z]/g, '').length;
                    return len >= 5;
                });
                filteredWords = mediumWords;
            } else {
                filteredWords = allWords; // Fallback to all
            }
        }

        // Shuffle and pick 10 unique words
        filteredWords.sort(() => Math.random() - 0.5);
        const selectedWords = filteredWords.slice(0, 10);

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
                    
                    <div style="width: 250px; margin: 20px auto;">
                        <canvas id="resultChart"></canvas>
                    </div>

                    <div class="result-quote">
                        "الخطأ ليس نهاية ولكن بداية إنسان عظيم"
                    </div>
                    <button class="nav-btn active" onclick="startQuiz()" style="margin-top:20px; justify-content:center">
                        <i class="fa-solid fa-rotate-right"></i> إعادة الامتحان
                    </button>
                </div>
            </div>
        `;

        // Render Chart
        setTimeout(() => {
            const ctx = document.getElementById('resultChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['إجابات صحيحة', 'إجابات خاطئة'],
                    datasets: [{
                        data: [score, 10 - score],
                        backgroundColor: ['#00b894', '#ff7675'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: { family: 'Tajawal' }
                            }
                        }
                    }
                }
            });
        }, 100);

        window.startQuiz = startQuiz;
    }

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.rate = 0.7;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }

    // --- AI TUTOR LOGIC ---
    function renderAITutor() {
        contentArea.innerHTML = `
            <div class="chat-container">
                <div class="chat-header">
                    <i class="fa-solid fa-robot"></i>
                    <span>المعلم الذكي</span>
                </div>
                <div class="chat-box" id="chat-box">
                    <div class="chat-message ai">
                        مرحباً! أنا معلمك الذكي للغة الإنجليزية. كيف يمكنني مساعدتك اليوم؟
                        <br>
                        Hello! I am your AI English Tutor. How can I help you today?
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" class="chat-input" placeholder="اكتب رسالتك هنا... (Type your message here)">
                    <button id="chat-send-btn" class="chat-send-btn"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        `;

        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('chat-send-btn');
        const chatBox = document.getElementById('chat-box');

        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add User Message
            appendMessage(message, 'user');
            chatInput.value = '';

            // Show Typing Indicator
            const typingId = showTypingIndicator();

            // Call API
            sendToGemini(message).then(response => {
                removeTypingIndicator(typingId);
                appendMessage(response, 'ai');
            }).catch(err => {
                removeTypingIndicator(typingId);
                appendMessage("عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.", 'ai');
                console.error(err);
            });
        }

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function appendMessage(text, sender) {
        const chatBox = document.getElementById('chat-box');
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        // Convert newlines to breaks for AI response
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTypingIndicator() {
        const chatBox = document.getElementById('chat-box');
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = id;
        div.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    async function sendToGemini(message) {
        // Using user-specified model
        let modelName = 'gemini-2.5-flash';
        let url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

        const payload = {
            contents: [{
                parts: [{
                    text: `You are a helpful, friendly English language tutor. User message: ${message}`
                }]
            }]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.error) {
                // If model not found, try to list available models to debug
                if (data.error.code === 404) {
                    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
                    const listResp = await fetch(listUrl);
                    const listData = await listResp.json();

                    if (listData.models) {
                        const availableModels = listData.models.map(m => m.name.replace('models/', '')).join('<br>');
                        return `عذراً، الموديل ${modelName} غير متاح. <br> الموديلات المتاحة لمفتاحك هي:<br>${availableModels}<br><br>يرجى إخبار المطور بذلك.`;
                    } else {
                        return `Error 404: Model not found, and could not list models. ${data.error.message}`;
                    }
                }
                return `Error: ${data.error.message}`;
            }

            if (data.candidates && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            }
            return "No response content.";

        } catch (error) {
            console.error("Gemini API Error:", error);
            return `Connection Error: ${error.message}`;
        }
    }
});
