# Kabir Doha Chrome Extension

A beautiful Google Chrome Extension that displays inspiring Kabir dohas (2-line poetry) with meanings on every new tab.

## ✨ Features

- **Beautiful Interface**: Clean, modern design with gradient backgrounds and smooth animations
- **Random Dohas**: Displays a different Kabir doha on each new tab
- **Multilingual Support**: Hindi text with English transliteration and translation
- **Simple & Clean**: Just the essentials - doha display and refresh button
- **Keyboard Shortcuts**: Press Space or Enter for a new doha
- **Responsive Design**: Works perfectly on desktop and mobile
- **Extensible**: Easy to add more dohas by adding JSON files

## 🚀 Quick Start

### Prerequisites

- Google Chrome browser
- Conda (for development environment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd kabir-chrome-extension
   ```

2. **Set up development environment:**
   ```bash
   conda env create -f environment.yml
   conda activate kabir-extension
   ```

3. **Test the extension:**
   ```bash
   python test_extension.py
   ```

4. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select this directory
   - Open a new tab to see the extension in action!
   - Click "New Doha" or press Space/Enter to get different dohas

## 🎯 How to Use

1. **Open a new tab** - The extension automatically displays a random Kabir doha
2. **Get a new doha** - Click the "New Doha" button or press Space/Enter
3. **Read and reflect** - Each doha includes:
   - Hindi text (original)
   - English transliteration (pronunciation guide)
   - English translation and meaning
4. **Enjoy the wisdom** - Let Kabir's timeless teachings inspire your day

## 📁 Project Structure

```
kabir-chrome-extension/
├── manifest.json          # Extension configuration
├── src/
│   ├── newtab.html       # New tab page HTML
│   ├── newtab.css        # Styling
│   └── newtab.js         # JavaScript logic
├── dohas/                # Doha data files (JSON format)
├── icons/                # Extension icons
├── environment.yml       # Conda environment
├── requirements.txt      # Python dependencies
├── test_extension.py     # Test script
├── DEPLOY.md            # Deployment guide
└── README.md
```

## 📚 Adding New Dohas

To add new Kabir dohas, create a new JSON file in the `dohas/` folder:

```json
{
  "hindi": "Your Hindi doha here",
  "english": "English transliteration here", 
  "translation": "English translation here"
}
```

Name the file `doha_N.json` where N is the next number in sequence (e.g., `doha_10.json`, `doha_11.json`, etc.).

The extension will automatically load all doha files when it starts.

## 📖 Included Dohas

The extension comes with a curated collection of beautiful Kabir dohas, each containing:
- Original Hindi text
- English transliteration for pronunciation
- English translation and meaning

New dohas are added regularly to keep the experience fresh and inspiring.

## 🚀 Deployment

For complete deployment instructions, see [DEPLOY.md](DEPLOY.md).

## 🛠️ Development

### Testing
```bash
# Run the test script to verify all components
python test_extension.py
```

### Creating Icons
```bash
# Generate new icons (requires Pillow)
cd icons
python generate_icons.py
```

### Environment Setup
```bash
# Create and activate the conda environment
conda env create -f environment.yml
conda activate kabir-extension

# Or install dependencies manually
pip install -r requirements.txt
```

### Adding New Dohas
1. Create a new JSON file in `dohas/` folder
2. Follow the format shown in existing doha files
3. Test with `python test_extension.py`
4. Reload the extension in Chrome to see changes

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

*"The soul is neither Hindu nor Muslim" - Kabir*
