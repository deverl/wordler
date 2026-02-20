// Common 5-letter word list (Wordle uses a subset of common words)
let WORD_LIST = [
    "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again",
    "agent", "agree", "ahead", "alarm", "album", "alert", "align", "alike", "alive", "allow",
    "alone", "along", "alter", "amber", "amend", "among", "ample", "amuse", "angel", "anger",
    "angle", "angry", "apart", "apple", "apply", "arena", "argue", "arise", "armor", "array",
    "arrow", "aside", "asset", "avoid", "awake", "award", "aware", "badly", "baker", "bases",
    "basic", "basis", "beach", "began", "begin", "begun", "being", "below", "bench", "billy",
    "birth", "black", "blade", "blame", "blank", "blast", "bleed", "bless", "blind", "block",
    "blood", "bloom", "blown", "board", "boast", "boost", "booth", "bound", "brain", "brand",
    "brass", "brave", "bread", "break", "breed", "brief", "bring", "broad", "broke", "brown",
    "build", "built", "burst", "buyer", "cable", "calif", "carry", "catch", "cause", "chain",
    "chair", "chaos", "charm", "chart", "chase", "cheap", "check", "chest", "chief", "child",
    "china", "chose", "civil", "claim", "class", "clean", "clear", "click", "climb", "clock",
    "close", "coach", "coast", "could", "count", "court", "cover", "crack", "craft", "crash",
    "crazy", "cream", "crime", "cross", "crowd", "crown", "crude", "curve", "cycle", "daily",
    "dance", "dated", "dealt", "death", "debut", "delay", "delta", "dense", "depth", "doing",
    "doubt", "dozen", "draft", "drama", "drank", "drawn", "dream", "dress", "drift", "drill",
    "drink", "drive", "drove", "dying", "eager", "early", "earth", "eight", "elite", "empty",
    "enemy", "enjoy", "enter", "entry", "equal", "error", "event", "every", "exact", "exist",
    "extra", "faith", "false", "fault", "fiber", "field", "fifth", "fifty", "fight", "final",
    "first", "fixed", "flash", "fleet", "flesh", "float", "flood", "floor", "fluid", "focus",
    "force", "forth", "forty", "forum", "found", "frame", "frank", "fraud", "fresh", "front",
    "fruit", "fully", "funny", "giant", "given", "glass", "globe", "going", "grace", "grade",
    "grand", "grant", "grass", "grave", "great", "green", "gross", "group", "grown", "guard",
    "guess", "guest", "guide", "happy", "harry", "heart", "heavy", "hence", "henry", "horse",
    "hotel", "house", "human", "ideal", "image", "imply", "index", "inner", "input", "issue",
    "japan", "jimmy", "joint", "jones", "judge", "known", "label", "large", "laser", "later",
    "laugh", "layer", "learn", "lease", "least", "leave", "legal", "lemon", "level", "lewis",
    "light", "limit", "links", "lives", "local", "logic", "loose", "lower", "lucky", "lunch",
    "lying", "magic", "major", "maker", "march", "maria", "match", "maybe", "mayor", "meant",
    "media", "metal", "might", "minor", "minus", "mixed", "model", "money", "month", "moral",
    "motor", "mount", "mouse", "mouth", "movie", "music", "needs", "never", "newly", "night",
    "noise", "north", "noted", "novel", "nurse", "occur", "ocean", "offer", "often", "order",
    "other", "ought", "paint", "panel", "paper", "party", "peace", "peter", "phase", "phone",
    "photo", "piece", "pilot", "pitch", "place", "plain", "plane", "plant", "plate", "point",
    "pound", "power", "press", "price", "pride", "prime", "print", "prior", "prize", "proof",
    "proud", "prove", "queen", "quick", "quiet", "quite", "radio", "raise", "range", "rapid",
    "ratio", "reach", "ready", "refer", "reign", "relax", "reply", "right", "rival", "river",
    "robin", "roger", "roman", "rough", "round", "route", "royal", "rural", "scale", "scene",
    "scope", "score", "sense", "serve", "seven", "shall", "shape", "share", "sharp", "sheet",
    "shelf", "shell", "shift", "shine", "shirt", "shock", "shoot", "short", "shown", "sight",
    "since", "sixth", "sixty", "sized", "skill", "sleep", "slide", "small", "smart", "smile",
    "smith", "smoke", "solid", "solve", "sorry", "sound", "south", "space", "spare", "speak",
    "speed", "spend", "spent", "split", "spoke", "sport", "staff", "stage", "stake", "stand",
    "start", "state", "steam", "steel", "stick", "still", "stock", "stone", "stood", "store",
    "storm", "story", "strip", "stuck", "study", "stuff", "style", "sugar", "suite", "super",
    "sweet", "table", "taken", "taste", "taxes", "teach", "terry", "texas", "thank", "theft",
    "their", "theme", "there", "these", "thick", "thing", "think", "third", "those", "three",
    "threw", "throw", "tight", "times", "title", "today", "topic", "total", "touch", "tough",
    "tower", "track", "trade", "train", "treat", "trend", "trial", "tribe", "trick", "tried",
    "tries", "troop", "truck", "truly", "trunk", "trust", "truth", "twice", "under", "undue",
    "union", "unity", "until", "upper", "urban", "usage", "usual", "valid", "value", "video",
    "virus", "visit", "vital", "vocal", "voice", "waste", "watch", "water", "wheel", "where",
    "which", "while", "white", "whole", "whose", "woman", "women", "world", "worry", "worse",
    "worst", "worth", "would", "wound", "write", "wrong", "wrote", "young", "youth", "zones"
];

const DEFAULT_WORD_LIST = [...WORD_LIST]; // Keep a copy of the default list
let negativeRowCount = 0;

function updateFileStatus(message, isError = false) {
    const status = document.getElementById('file-status');
    status.textContent = message;
    status.style.color = isError ? '#ef4444' : '#10b981';
}

// Automatically load words5.txt from the server
async function loadWordsFromServer() {
    try {
        const response = await fetch('data/words5.txt');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const words = text.split('\n')
            .map(word => word.trim().toLowerCase())
            .filter(word => word.length === 5 && /^[a-z]+$/.test(word));

        if (words.length === 0) {
            throw new Error('No valid 5-letter words found in words5.txt');
        }

        WORD_LIST = words;
        updateFileStatus(`Loaded ${words.length} words from words5.txt`);

    } catch (error) {
        console.error('Error loading words5.txt:', error);
        updateFileStatus(`Could not load words5.txt - using default word list (${DEFAULT_WORD_LIST.length} words)`, true);
        WORD_LIST = [...DEFAULT_WORD_LIST];
    }
}

// Load words when page loads
window.addEventListener('DOMContentLoaded', loadWordsFromServer);

// Collect letters that are known to be in the word (from known, include, and wrong positions)
function getIncludedLetters() {
    const letters = new Set();

    // Known letters (correct position)
    document.querySelectorAll('#known-boxes .letter-box').forEach(box => {
        const v = box.value.toLowerCase();
        if (v && v.match(/[a-z]/)) letters.add(v);
    });

    // Include letters (wrong position)
    document.querySelectorAll('#include-boxes .letter-box').forEach(box => {
        const v = box.value.toLowerCase();
        if (v && v.match(/[a-z]/)) letters.add(v);
    });

    // Wrong positions (each row lists letters that can't be in those spots)
    document.querySelectorAll('.negative-row .letter-box').forEach(box => {
        const v = box.value.toLowerCase();
        if (v && v.match(/[a-z]/)) letters.add(v);
    });

    return letters;
}

// Validate exclude input: remove any letters that appear in known/include/wrong positions
function validateExcludeInput() {
    const excludeInput = document.getElementById('exclude-input');
    const includedLetters = getIncludedLetters();
    const value = excludeInput.value.toLowerCase();
    const filtered = value.split('').filter(c => {
        if (!c.match(/[a-z]/)) return true; // keep non-letters (will strip later, but allow typing)
        return !includedLetters.has(c);
    }).join('');
    if (filtered !== value) {
        excludeInput.value = filtered;
    }
}

// Attach validation to exclude input
document.addEventListener('DOMContentLoaded', () => {
    const excludeInput = document.getElementById('exclude-input');
    if (excludeInput) {
        excludeInput.addEventListener('input', validateExcludeInput);
        excludeInput.addEventListener('paste', () => setTimeout(validateExcludeInput, 0));
    }
});

// When known/include/wrong fields change, re-validate exclude (removes letters that are now in those fields)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('input', (e) => {
            if (e.target.matches('#known-boxes .letter-box, #include-boxes .letter-box, .negative-row .letter-box')) {
                validateExcludeInput();
            }
        });
    }
});

// Auto-focus next box
document.querySelectorAll('.letter-box').forEach((box, index, boxes) => {
    box.addEventListener('input', function(e) {
        this.value = this.value.toUpperCase();
        if (this.value && index < boxes.length - 1) {
            const parent = this.parentElement;
            const nextBox = parent.querySelectorAll('.letter-box')[index + 1];
            if (nextBox) nextBox.focus();
        }
    });

    box.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value && index > 0) {
            const parent = this.parentElement;
            const prevBox = parent.querySelectorAll('.letter-box')[index - 1];
            if (prevBox) prevBox.focus();
        }
    });
});

function addNegativeRow() {
    const container = document.getElementById('negative-patterns');
    const row = document.createElement('div');
    row.className = 'negative-row';
    row.id = `neg-row-${negativeRowCount}`;

    row.innerHTML = `
        <input type="text" class="letter-box" maxlength="1" data-neg-pos="0">
        <input type="text" class="letter-box" maxlength="1" data-neg-pos="1">
        <input type="text" class="letter-box" maxlength="1" data-neg-pos="2">
        <input type="text" class="letter-box" maxlength="1" data-neg-pos="3">
        <input type="text" class="letter-box" maxlength="1" data-neg-pos="4">
        <button class="btn-remove" onclick="removeNegativeRow(${negativeRowCount})">×</button>
    `;

    container.appendChild(row);

    // Add auto-focus functionality to new boxes
    const boxes = row.querySelectorAll('.letter-box');
    boxes.forEach((box, index) => {
        box.addEventListener('input', function(e) {
            this.value = this.value.toUpperCase();
            if (this.value && index < boxes.length - 1) {
                boxes[index + 1].focus();
            }
        });

        box.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                boxes[index - 1].focus();
            }
        });
    });

    negativeRowCount++;
}

function removeNegativeRow(id) {
    const row = document.getElementById(`neg-row-${id}`);
    if (row) row.remove();
}

function solveWordle() {
    // Get known pattern
    const knownBoxes = document.querySelectorAll('#known-boxes .letter-box');
    let knownPattern = '';
    knownBoxes.forEach(box => {
        knownPattern += box.value ? box.value.toLowerCase() : '.';
    });

    // Get include letters
    const includeBoxes = document.querySelectorAll('#include-boxes .letter-box');
    const includeLetters = Array.from(includeBoxes)
        .map(box => box.value.toLowerCase())
        .filter(v => v);

    // Get exclude letters
    const excludeInput = document.getElementById('exclude-input').value.toLowerCase();
    const excludeLetters = excludeInput.split('').filter(c => c.match(/[a-z]/));

    // Get negative patterns
    const negativePatterns = [];
    document.querySelectorAll('.negative-row').forEach(row => {
        const boxes = row.querySelectorAll('.letter-box');
        const pattern = Array.from(boxes).map(box => box.value.toLowerCase() || '.').join('');
        if (pattern !== '.....') {
            negativePatterns.push(pattern);
        }
    });

    // Filter words
    let results = WORD_LIST.filter(word => {
        // Check known pattern
        for (let i = 0; i < 5; i++) {
            if (knownPattern[i] !== '.' && knownPattern[i] !== word[i]) {
                return false;
            }
        }

        // Check include letters
        for (let letter of includeLetters) {
            if (!word.includes(letter)) {
                return false;
            }
        }

        // Check exclude letters
        for (let letter of excludeLetters) {
            if (word.includes(letter)) {
                return false;
            }
        }

        // Check negative patterns
        for (let pattern of negativePatterns) {
            for (let i = 0; i < 5; i++) {
                if (pattern[i] !== '.' && pattern[i] === word[i]) {
                    return false;
                }
            }
        }

        return true;
    });

    // Display results
    displayResults(results);
}

function displayResults(words) {
    const resultsDiv = document.getElementById('results');
    const countSpan = document.getElementById('result-count');
    const wordListDiv = document.getElementById('word-list');

    countSpan.textContent = words.length;
    wordListDiv.innerHTML = '';

    if (words.length === 0) {
        wordListDiv.innerHTML = '<div class="no-results">No matching words found</div>';
    } else {
        words.forEach(word => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordListDiv.appendChild(wordItem);
        });
    }

    resultsDiv.classList.remove('hidden');
}

// Add initial negative row
addNegativeRow();
