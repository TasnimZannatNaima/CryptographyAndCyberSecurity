# 🔐 CipherVault - Classical Cryptography Lab

[![GitHub Pages](https://img.shields.io/badge/Live-Demo-brightgreen)](https://tasnimzannatnaima.github.io/CryptographyAndCyberSecurity/ciphervault/)
[![Made with](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-blue)](https://github.com/TasnimZannatNaima)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 📖 Overview

**CipherVault** is an interactive web-based laboratory for learning and experimenting with **classical cryptography ciphers**. It provides a hands-on environment to understand the mathematical foundations of historical encryption techniques.

### ✨ Features

- 🔤 **Monoalphabetic Cipher** - Keyword-based substitution with visual alphabet mapping
- 🔷 **Playfair Cipher** - Digraph encryption using 5×5 keyword grid
- 🧮 **Hill Cipher** - Matrix-based encryption (2×2) with modular arithmetic
- 📊 **Step-by-step logs** - See exactly how each cipher transforms your text
- 🎲 **Random key generation** - Test with random valid keys
- 📱 **Responsive design** - Works on desktop, tablet, and mobile

## 🚀 Live Demo

🔗 **Try it now:** [CipherVault Live](https://tasnimzannatnaima.github.io/CryptographyAndCyberSecurity/ciphervault/)

## 🎯 How It Works

### 1. Monoalphabetic Cipher
- Enter a keyword (e.g., "MONARCHY")
- Generates a complete 26-letter substitution alphabet
- Encrypt/decrypt with visual mapping display

### 2. Playfair Cipher
- Builds a 5×5 grid from your keyword (I/J merged)
- Encrypts digraphs using 3 rules:
  - Same row → shift right
  - Same column → shift down
  - Rectangle → swap corners

### 3. Hill Cipher
- Uses 2×2 matrix multiplication (mod 26)
- Requires invertible matrix (determinant coprime to 26)
- Random valid key generator included

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5      | Structure & semantics |
| CSS3       | Styling, animations, responsive design |
| JavaScript | Cipher algorithms, DOM manipulation |
| Google Fonts | Space Grotesk & Space Mono |

## 📂 Project Structure
CryptographyAndCyberSecurity/
├── ciphervault/
│ ├── index.html # Main application
│ ├── style.css # Styling & animations
  └── script.js # Cipher algorithms
  └──README.md


---

## 🔬 Mathematical Concepts

| Cipher | Mathematics | Key Space |
|--------|-------------|-----------|
| Monoalphabetic | Permutation | 26! ≈ 2^88 |
| Playfair | Digraph mapping | 25! ≈ 2^83 |
| Hill (2×2) | Matrix mod 26 | ~25^4 × φ(26) |

---

## 🧪 Usage Example

### Monoalphabetic
Input: HELLO WORLD
Key: MONARCHYBDFEGIJKLPQSTUVWXZ
Output: PKCCJ QMJKC

text

### Playfair
Input: HELLO WORLD
Keyword: MONARCHY
Output: ECMPM GDRMP

text

### Hill Cipher
Input: HELLO
Matrix: [[3,3],[2,5]]
Output: QNEKZ

text

---

## 🚦 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/TasnimZannatNaima/CryptographyAndCyberSecurity.git

# Navigate to project
cd CryptographyAndCyberSecurity/ciphervault

# Open in browser
open index.html   # or double-click the file
🔒 Security Note
⚠️ Educational Purpose Only - Classical ciphers are not secure for modern cryptography. They are vulnerable to frequency analysis and known-plaintext attacks. This tool is for learning historical encryption methods only.

📚 Learning Resources
Cryptography 101

Playfair Cipher Explained

Hill Cipher Tutorial

👩‍💻 Author
Tasnim Zannat Naima

GitHub: @TasnimZannatNaima

Project: CryptographyAndCyberSecurity

🙏 Acknowledgments
Inspired by classical cryptography texts

Built with modern web technologies

Special thanks to open-source community

📄 License
MIT License - Free to use, modify, and distribute for educational purposes.
