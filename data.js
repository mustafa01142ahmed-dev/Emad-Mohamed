const appData = {
    phonics: [
        {
            id: 'ea',
            title: 'ea Sound',
            words: [
                { word: "eat", arabic: "يأكل" }, { word: "meat", arabic: "لحم" }, { word: "ear", arabic: "أذن" },
                { word: "hear", arabic: "يسمع" }, { word: "sea", arabic: "بحر" }, { word: "seat", arabic: "مقعد" },
                { word: "read", arabic: "يقرأ" }, { word: "bean", arabic: "فول" }, { word: "Team", arabic: "فريق" },
                { word: "clean", arabic: "ينظف" }, { word: "great", arabic: "رائع" }, { word: "bear", arabic: "دب" },
                { word: "pear", arabic: "كمثرى" }, { word: "wear", arabic: "يرتدي" }
            ]
        },
        {
            id: 'so',
            title: 'so Sound',
            words: [
                { word: "son", arabic: "إبن" }, { word: "song", arabic: "أغنية" }, { word: "dog", arabic: "كلب" },
                { word: "box", arabic: "صندوق" }, { word: "fox", arabic: "ثعلب" }, { word: "boy", arabic: "ولد" },
                { word: "toy", arabic: "لعبة" }, { word: "not", arabic: "لا" }, { word: "hot", arabic: "حار" },
                { word: "cold", arabic: "بارد" }, { word: "look", arabic: "ينظر" }, { word: "book", arabic: "كتاب" },
                { word: "cook", arabic: "يطبخ" }, { word: "foot", arabic: "قدم" }
            ]
        },
        {
            id: 'o',
            title: 'o Sound',
            words: [
                { word: "food", arabic: "طعام" }, { word: "room", arabic: "حجرة" }, { word: "moon", arabic: "قمر" },
                { word: "door", arabic: "باب" }, { word: "poor", arabic: "فقير" }, { word: "good", arabic: "جيد" },
                { word: "wood", arabic: "خشب" }, { word: "on", arabic: "على" }, { word: "ox", arabic: "ثور" },
                { word: "go", arabic: "يذهب" }, { word: "do", arabic: "يفعل" }, { word: "to", arabic: "إلى" },
                { word: "no", arabic: "لا" }
            ]
        },
        {
            id: 'a',
            title: 'a Sound',
            words: [
                { word: "arm", arabic: "ذراع" }, { word: "art", arabic: "رسم" }, { word: "ant", arabic: "نمله" },
                { word: "and", arabic: "و" }, { word: "rat", arabic: "فأر" }, { word: "dad", arabic: "أب" },
                { word: "sad", arabic: "حزين" }, { word: "hat", arabic: "قبعه" }, { word: "fat", arabic: "سمين" },
                { word: "fan", arabic: "مروحه" }, { word: "man", arabic: "رجل" }, { word: "mat", arabic: "سجاده" },
                { word: "map", arabic: "خريطه" }, { word: "bad", arabic: "سيئ" }, { word: "bag", arabic: "حقيبه" },
                { word: "bat", arabic: "خفاش" }, { word: "van", arabic: "شاحنة" }, { word: "Jam", arabic: "مربى" },
                { word: "want", arabic: "يريد" }, { word: "cat", arabic: "قطه" }, { word: "car", arabic: "سياره" },
                { word: "cap", arabic: "كاب" }, { word: "can", arabic: "يستطيع" }, { word: "Sama", arabic: "سما" },
                { word: "Hana", arabic: "هنا" }, { word: "Rana", arabic: "رنا" }, { word: "farm", arabic: "مزرعه" },
                { "word": "park", "arabic": "حديقه" }, { "word": "hand", "arabic": "يد" }, { "word": "hard", "arabic": "صعب" },
                { "word": "sand", "arabic": "رمال" }, { "word": "salad", "arabic": "سلطه" }, { "word": "bank", "arabic": "بنك" },
                { "word": "banana", "arabic": "موزه" }, { "word": "panda", "arabic": "باندا" }, { "word": "star", "arabic": "نجمة" },
                { "word": "start", "arabic": "يبدأ" }, { "word": "smart", "arabic": "ذكى" }
            ]
        },
        {
            id: 'e',
            title: 'e Sound',
            words: [
                { word: "egg", arabic: "بيضه" }, { word: "Leg", arabic: "رجل" }, { word: "Let", arabic: "يسمح" },
                { word: "pen", arabic: "قلم" }, { word: "Ten", arabic: "عشرة" }, { word: "hen", arabic: "دجاجه" },
                { word: "red", arabic: "أحمر" }, { word: "bed", arabic: "سرير" }, { word: "vet", arabic: "بيطري" },
                { word: "wet", arabic: "مبتل" }, { word: "get", arabic: "يحصل علي" }
            ]
        },
        {
            id: 'ee',
            title: 'ee Sound',
            words: [
                { word: "see", arabic: "يرى" }, { word: "bee", arabic: "نحله" }, { word: "tree", arabic: "شجره" },
                { word: "green", arabic: "أخضر" }, { word: "meet", arabic: "يقابل" }, { word: "Feet", arabic: "اقدام" },
                { word: "feel", arabic: "يشعر" }, { word: "sleep", arabic: "ينام" }, { word: "need", arabic: "يحتاج" }
            ]
        },
        {
            id: 'u',
            title: 'u Sound',
            words: [
                { word: "un", arabic: "لا - غير" }, { word: "up", arabic: "أعلى" }, { word: "run", arabic: "يجري" },
                { word: "sun", arabic: "شمس" }, { word: "fun", arabic: "مرح" }, { word: "cup", arabic: "فنجان" },
                { word: "rug", arabic: "سجاده" }, { word: "cut", arabic: "يقطع" }, { word: "but", arabic: "لكن" },
                { word: "nut", arabic: "مكسرات" }, { word: "under", arabic: "تحت" }
            ]
        },
        {
            id: 'ou',
            title: 'ou Sound',
            words: [
                { word: "Found", arabic: "وجد" }, { word: "Pound", arabic: "جنيه" }, { word: "count", arabic: "يعد" },
                { word: "sound", arabic: "يبدو" }, { word: "house", arabic: "منزل" }, { word: "mouse", arabic: "فأر" }
            ]
        },
        {
            id: 'oa',
            title: 'oa Sound',
            words: [
                { word: "goat", arabic: "معزه" }, { word: "boat", arabic: "قارب" }, { word: "coat", arabic: "بالطو" },
                { word: "road", arabic: "طريق" }, { word: "toad", arabic: "ضفدع" }
            ]
        },
        {
            id: 'ai',
            title: 'ai Sound',
            words: [
                { word: "rain", arabic: "مطر" }, { word: "train", arabic: "قطار" }, { word: "paint", arabic: "يلون- يرسم" },
                { word: "brain", arabic: "مخ" }, { word: "grain", arabic: "حبوب" }
            ]
        },
        {
            id: 'ow',
            title: 'ow Sound',
            words: [
                { word: "cow", arabic: "بقره" }, { word: "now", arabic: "الأن" }, { word: "how", arabic: "كم - كيف" }
            ]
        },
        {
            id: 'oi',
            title: 'oi Sound',
            words: [
                { word: "oil", arabic: "زيت" }, { word: "soil", arabic: "تربه" }, { word: "boil", arabic: "يغلي" }
            ]
        },
        {
            id: 'i',
            title: 'i Sound',
            words: [
                { word: "in", arabic: "فى" }, { word: "is", arabic: "يكون" }, { word: "sit", arabic: "يجلس" },
                { word: "win", arabic: "يفوز" }, { word: "wind", arabic: "رياح" }, { word: "will", arabic: "سوف" },
                { word: "king", arabic: "ملك" }
            ]
        },
        {
            id: 'ue',
            title: 'ue Sound',
            words: [
                { word: "blue", arabic: "أزرق" }, { word: "true", arabic: "صح" }
            ]
        },
        {
            id: 'o_e',
            title: 'o..e Sound',
            words: [
                { word: "home", arabic: "منزل" }, { word: "nose", arabic: "أنف" }, { word: "bone", arabic: "عظمة" },
                { word: "stone", arabic: "حجر" }
            ]
        },
        {
            id: 'i_e',
            title: 'i.e Sound',
            words: [
                { word: "Like", arabic: "يحب" }, { word: "bike", arabic: "دراجه" }, { word: "Kite", arabic: "طائره" },
                { word: "mine", arabic: "ملكى" }, { word: "nine", arabic: "تسعة" }, { word: "fine", arabic: "بخير" },
                { word: "five", arabic: "خمسة" }, { word: "ride", arabic: "يركب" }
            ]
        },
        {
            id: 'a_e',
            title: 'a.e Sound',
            words: [
                { word: "make", arabic: "يصنع" }, { word: "bake", arabic: "يخبز" }, { word: "lake", arabic: "بحيرة" },
                { word: "take", arabic: "يأخذ" }, { word: "cake", arabic: "كيك" }, { word: "late", arabic: "متأخر" },
                { word: "plane", arabic: "طائرة" }, { word: "snake", arabic: "ثعبان" }
            ]
        },
        {
            id: 'sh',
            title: 'sh Sound',
            words: [
                { word: "she", arabic: "هى" }, { word: "Sheep", arabic: "خروف" }, { word: "shop", arabic: "محل" },
                { word: "Short", arabic: "قصير" }, { word: "Shark", arabic: "سمكة" }, { word: "share", arabic: "يشارك" },
                { word: "Fish", arabic: "سمكه" }, { word: "dish", arabic: "طبق" }, { word: "ship", arabic: "سفينه" },
                { word: "Shirt", arabic: "قميص" }, { word: "wash", arabic: "يغسل" }, { word: "shout", arabic: "يصرخ" }
            ]
        },
        {
            id: 'th',
            title: 'th Sound',
            words: [
                { word: "the", arabic: "ال" }, { word: "they", arabic: "هم" }, { word: "there", arabic: "يوجد" },
                { word: "this", arabic: "هذا" }, { word: "that", arabic: "هذة" }, { word: "these-those", arabic: "هؤلاء" },
                { word: "father", arabic: "أب" }, { word: "mother", arabic: "أم" }, { word: "brother", arabic: "أخ" },
                { word: "thin", arabic: "نحيف" }, { word: "think", arabic: "يفكر" }, { word: "thank", arabic: "يشكر" },
                { word: "three", arabic: "ثلاثه" }, { word: "mouth", arabic: "فم" }, { word: "tooth", arabic: "سنة" },
                { word: "teeth", arabic: "أسنان" }, { word: "thirsty", arabic: "عطشان" }
            ]
        },
        {
            id: 'ch',
            title: 'ch Sound',
            words: [
                { word: "chips", arabic: "شيبسي" }, { word: "cheese", arabic: "جبنة" }, { word: "chicken", arabic: "دجاجه" },
                { word: "child", arabic: "طفل" }, { word: "children", arabic: "أطفال" }, { word: "chair", arabic: "كرسى" },
                { word: "watch", arabic: "يشاهد" }, { word: "catch", arabic: "يمسك" }, { word: "beach", arabic: "شاطئ" },
                { word: "peach", arabic: "خوخة" }, { word: "teach", arabic: "يعلم" }, { word: "teacher", arabic: "معلم" }
            ]
        },
        {
            id: 'ph',
            title: 'ph Sound',
            words: [
                { word: "photo", arabic: "صوره" }, { word: "Phone", arabic: "تليفون" }, { word: "dolphin", arabic: "دولفين" },
                { word: "elephant", arabic: "فيل" }
            ]
        },
        {
            id: 'silent_letters',
            title: 'Silent Letters',
            words: [
                { word: "light", arabic: "ضوء (gh silent)" }, { word: "night", arabic: "ليل (gh silent)" },
                { word: "bought", arabic: "إشترى (gh silent)" }, { word: "eight", arabic: "ثمانيه (gh silent)" },
                { word: "knee", arabic: "ركبه (k silent)" }, { word: "know", arabic: "يعرف (k silent)" },
                { word: "climb", arabic: "يتسلق (b silent)" }, { word: "comb", arabic: "مشط (b silent)" },
                { word: "tomb", arabic: "قبر (b silent)" },
                { word: "What", arabic: "ما - ماذا (h silent)" }, { word: "Where", arabic: "أين (h silent)" },
                { word: "When", arabic: "متى (h silent)" }, { word: "why", arabic: "لماذا (h silent)" },
                { word: "which", arabic: "أي - أيهما (h silent)" }
            ]
        }
    ],
    vocabulary: [
        {
            id: 'family',
            title: 'Family',
            words: [
                { word: "family", arabic: "عائلة" }, { word: "Parents", arabic: "الوالدين" }, { word: "dad", arabic: "اب" },
                { word: "friend", arabic: "صديق" }, { word: "grandpa", arabic: "جد" }, { word: "mom", arabic: "أم" },
                { word: "father", arabic: "أب" }, { word: "grandma", arabic: "جدة" }, { word: "person", arabic: "شخص" },
                { word: "mother", arabic: "أم" }, { word: "uncle", arabic: "عم - خال" }, { word: "neighbour", arabic: "جار" },
                { word: "brother", arabic: "أخ" }, { word: "aunt", arabic: "عمة - خالة" }, { word: "child", arabic: "طفل" },
                { "word": "sister", "arabic": "أخت" }, { "word": "Cousin", "arabic": "ابن عم" }, { "word": "children", "arabic": "أطفال" },
                { "word": "son", "arabic": "أبن" }, { "word": "boy", "arabic": "ولد" }, { "word": "kids", "arabic": "أطفال" },
                { "word": "daughter", "arabic": "إبنة" }, { "word": "girl", "arabic": "بنت" }, { "word": "people", "arabic": "ناس" }
            ]
        },
        {
            id: 'animals',
            title: 'Animals',
            words: [
                { word: "cow", arabic: "بقرة" }, { word: "goat", arabic: "معزة" }, { word: "horse", arabic: "حصان" },
                { word: "elephant", arabic: "فيل" }, { word: "camel", arabic: "جمل" }, { word: "lion", arabic: "أسد" },
                { word: "panda", arabic: "باندا" }, { word: "giraffe", arabic: "زرافة" }, { word: "monkey", arabic: "قرد" },
                { word: "bear", arabic: "دب" }, { word: "tiger", arabic: "نمر" }, { word: "donkey", arabic: "حمار" },
                { word: "snake", arabic: "ثعبان" }, { word: "mouse", arabic: "فار" }, { word: "fish", arabic: "سمكة" },
                { word: "shark", arabic: "سمكة قرش" }, { word: "dolphin", arabic: "دولفين" }, { word: "crocodile", arabic: "تمساح" },
                { word: "whale", arabic: "حوت" }, { word: "bird", arabic: "طائر" }, { word: "duck", arabic: "بطة" },
                { word: "hen", arabic: "دجاجة" }, { word: "eagle", arabic: "نسر" }, { word: "parrot", arabic: "بغبغان" },
                { word: "insect", arabic: "حشرة" }, { word: "animal", arabic: "حيوان" }, { word: "deer", arabic: "غزال" },
                { word: "hippo", arabic: "فرس النهر" }
            ]
        },
        {
            id: 'adjectives',
            title: 'Adjectives',
            words: [
                { word: "sad", arabic: "حزين" }, { word: "happy", arabic: "سعيد" }, { word: "fat", arabic: "سمين" },
                { word: "thin", arabic: "نحيف" }, { word: "tall", arabic: "طويل" }, { word: "short", arabic: "قصير" },
                { word: "big", arabic: "كبير" }, { word: "small", arabic: "صغير" }, { word: "fast", arabic: "سريع" },
                { word: "slow", arabic: "بطئ" }, { word: "smart", arabic: "ذكي" }, { word: "new", arabic: "جديد" },
                { word: "old", arabic: "قديم" }, { word: "young", arabic: "صغير" }, { word: "hot", arabic: "حار" },
                { word: "cold", arabic: "بارد" }, { word: "good", arabic: "جيد" }, { word: "bad", arabic: "سيئ" },
                { word: "beautiful", arabic: "جميل" }, { word: "ugly", arabic: "قبيح" }, { word: "busy", arabic: "مشغول" },
                { word: "free", arabic: "حر" }, { word: "easy", arabic: "سهل" }, { word: "hard", arabic: "صعب" }
            ]
        },
        {
            id: 'body',
            title: 'Body Parts',
            words: [
                { word: "body", arabic: "جسم" }, { word: "face", arabic: "وجه" }, { word: "head", arabic: "رأس" },
                { word: "mouth", arabic: "فم" }, { word: "nose", arabic: "أنف" }, { word: "eye", arabic: "عين" },
                { word: "ear", arabic: "أذن" }, { word: "hair", arabic: "شعر" }, { word: "hand", arabic: "يد" },
                { word: "arm", arabic: "ذراع" }, { word: "leg", arabic: "رجل" }, { word: "foot", arabic: "قدم" },
                { word: "heart", arabic: "قلب" }, { word: "blood", arabic: "دم" }, { word: "back", arabic: "ظهر" }
            ]
        },
        {
            id: 'places',
            title: 'Places',
            words: [
                { word: "school", arabic: "مدرسة" }, { word: "home", arabic: "منزل" }, { word: "garden", arabic: "حديقة" },
                { word: "shop", arabic: "محل" }, { word: "market", arabic: "سوق" }, { word: "hospital", arabic: "مستشفى" },
                { word: "club", arabic: "نادى" }, { word: "restaurant", arabic: "مطعم" }, { word: "sea", arabic: "بحر" },
                { word: "beach", arabic: "شاطئ" }, { word: "zoo", arabic: "حديقة حيوان" }
            ]
        },
        {
            id: 'colors',
            title: 'Colors',
            words: [
                { word: "red", arabic: "أحمر" }, { word: "black", arabic: "أسود" }, { word: "white", arabic: "أبيض" },
                { word: "blue", arabic: "أزرق" }, { word: "green", arabic: "أخضر" }, { word: "yellow", arabic: "أصفر" },
                { word: "brown", arabic: "بنى" }, { word: "pink", arabic: "وردى" }, { word: "gray", arabic: "رمادى" }
            ]
        }
    ],
    grammar: [
        {
            id: 'pronouns',
            title: 'Pronouns',
            content: [
                { english: "I", arabic: "أنا" }, { english: "He", arabic: "هو" }, { english: "She", arabic: "هي" },
                { english: "It", arabic: "هو/هي (غير العاقل)" }, { english: "We", arabic: "نحن" },
                { english: "You", arabic: "أنت/أنتم" }, { english: "They", arabic: "هم" }
            ]
        },
        {
            id: 'verb_to_be',
            title: 'Verb to Be',
            content: [
                { english: "I am", arabic: "أنا اكون" }, { english: "He is", arabic: "هو يكون" },
                { english: "She is", arabic: "هي تكون" }, { english: "It is", arabic: "هو يكون" },
                { english: "We are", arabic: "نحن نكون" }, { english: "You are", arabic: "انت تكون" },
                { english: "They are", arabic: "هم يكونوا" }
            ]
        },
        {
            id: 'can',
            title: 'Can / Can\'t',
            content: [
                { english: "I can run", arabic: "أنا أستطيع الجري" }, { english: "I can't fly", arabic: "أنا لا أستطيع الطيران" },
                { english: "Can he swim?", arabic: "هل يستطيع السباحة؟" }, { english: "Yes, he can", arabic: "نعم" },
                { english: "No, he can't", arabic: "لا" }
            ]
        },
        {
            id: 'have_has',
            title: 'Have / Has',
            content: [
                { english: "I have a car", arabic: "أنا عندي سيارة" }, { english: "He has a book", arabic: "هو لديه كتاب" },
                { english: "She has long hair", arabic: "هي لديها شعر طويل" }, { english: "We don't have money", arabic: "ليس لدينا مال" }
            ]
        },
        {
            id: 'question_words',
            title: 'Question Words',
            content: [
                { english: "What", arabic: "ما/ماذا" }, { english: "Where", arabic: "أين" }, { english: "When", arabic: "متى" },
                { english: "Who", arabic: "من" }, { english: "Why", arabic: "لماذا" }, { english: "How", arabic: "كيف" }
            ]
        }
    ],
    numbers: [
        { digit: "1", english: "one", arabic: "واحد" }, { digit: "2", english: "two", arabic: "أثنين" },
        { digit: "3", english: "three", arabic: "ثلاثة" }, { digit: "4", english: "four", arabic: "أربعة" },
        { digit: "5", english: "five", arabic: "خمسة" }, { digit: "6", english: "six", arabic: "ستة" },
        { digit: "7", english: "seven", arabic: "سبعة" }, { digit: "8", english: "eight", arabic: "ثمانية" },
        { digit: "9", english: "nine", arabic: "تسعة" }, { digit: "10", english: "ten", arabic: "عشرة" },
        { digit: "11", english: "eleven", arabic: "11" }, { digit: "12", english: "twelve", arabic: "12" },
        { digit: "20", english: "twenty", arabic: "20" }, { digit: "30", english: "thirty", arabic: "30" },
        { digit: "40", english: "forty", arabic: "40" }, { digit: "50", english: "fifty", arabic: "50" },
        { digit: "100", english: "hundred", arabic: "100" }
    ]
};
