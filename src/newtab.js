// Kabir Doha New Tab Extension
// Main JavaScript file for handling doha display and interactions

class KabirDohaApp {
    constructor() {
        this.currentDohaIndex = 0;
        this.dohas = [];
        this.init();
    }

    async init() {
        try {
            await this.loadDohas();
            this.setupEventListeners();
            this.displayRandomDoha();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError();
        }
    }

    async loadDohas() {
        // Load all doha files from the dohas folder
        const dohaFiles = await this.getDohaFiles();
        
        for (const file of dohaFiles) {
            try {
                const response = await fetch(`../dohas/${file}`);
                const dohaData = await response.json();
                this.dohas.push(dohaData);
            } catch (error) {
                console.warn(`Could not load ${file}:`, error);
            }
        }

        if (this.dohas.length === 0) {
            throw new Error('No dohas could be loaded');
        }
    }

    async getDohaFiles() {
        // For now, we'll return a predefined list of doha files
        // In a real implementation, you might want to dynamically discover files
        return [
            'doha_0.json',
            'doha_1.json',
            'doha_2.json',
            'doha_3.json',
            'doha_4.json',
            'doha_5.json',
            'doha_6.json',
            'doha_7.json',
            'doha_8.json',
            'doha_9.json'
        ];
    }

    setupEventListeners() {
        const newDohaBtn = document.getElementById('new-doha-btn');

        if (newDohaBtn) {
            newDohaBtn.addEventListener('click', () => this.displayRandomDoha());
        }

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.displayRandomDoha();
            }
        });
    }

    displayRandomDoha() {
        if (this.dohas.length === 0) return;

        // Get a random doha index
        this.currentDohaIndex = Math.floor(Math.random() * this.dohas.length);
        const doha = this.dohas[this.currentDohaIndex];

        // Update the display
        this.updateDisplay(doha);
    }

    updateDisplay(doha) {
        const hindiElement = document.getElementById('doha-hindi');
        const transliterationElement = document.getElementById('doha-transliteration');
        const meaningElement = document.getElementById('meaning-text');

        if (hindiElement) {
            hindiElement.textContent = doha.hindi;
            hindiElement.classList.add('fade-in');
        }

        if (transliterationElement) {
            transliterationElement.textContent = doha.english;
            transliterationElement.classList.add('fade-in');
        }

        if (meaningElement) {
            meaningElement.textContent = doha.translation;
            meaningElement.classList.add('fade-in');
        }

        // Remove fade-in class after animation
        setTimeout(() => {
            [hindiElement, transliterationElement, meaningElement].forEach(el => {
                if (el) el.classList.remove('fade-in');
            });
        }, 800);
    }


    showError() {
        const hindiElement = document.getElementById('doha-hindi');
        const transliterationElement = document.getElementById('doha-transliteration');
        const meaningElement = document.getElementById('meaning-text');

        if (hindiElement) {
            hindiElement.textContent = 'दोहा लोड नहीं हो सका';
        }
        if (transliterationElement) {
            transliterationElement.textContent = 'Could not load doha';
        }
        if (meaningElement) {
            meaningElement.textContent = 'There was an error loading the poetry. Please refresh the page or check your internet connection.';
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KabirDohaApp();
});

