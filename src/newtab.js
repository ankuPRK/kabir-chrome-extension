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
        // Load the manifest file that lists all doha files
        try {
            const manifestResponse = await fetch('../dohas/manifest.json');
            if (!manifestResponse.ok) {
                throw new Error('Could not load doha manifest');
            }
            const manifest = await manifestResponse.json();
            const dohaFiles = manifest.dohaFiles || [];

            // Load each doha file from the manifest
            // Each file will be associated with its index in the array
            for (let index = 0; index < dohaFiles.length; index++) {
                const fileName = dohaFiles[index];
                try {
                    const response = await fetch(`../dohas/${fileName}`);
                    if (response.ok) {
                        const dohaData = await response.json();
                        // Store the doha with its associated index
                        this.dohas.push(dohaData);
                    } else {
                        console.warn(`Could not load ${fileName}: HTTP ${response.status}`);
                    }
                } catch (error) {
                    console.warn(`Could not load ${fileName}:`, error);
                }
            }

            if (this.dohas.length === 0) {
                throw new Error('No dohas could be loaded');
            }
            
            console.log(`Loaded ${this.dohas.length} dohas from manifest`);
        } catch (error) {
            console.error('Error loading dohas:', error);
            throw error;
        }
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

        // Get a random doha index (using Math.floor for even distribution)
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

