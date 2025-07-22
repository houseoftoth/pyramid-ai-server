<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>House of TOTH - PyramidBuilder Quantum Index</title>
  <style>
    body {
      background: #000;
      color: #0ff;
      font-family: 'Courier New', Courier, monospace;
      margin: 0;
      overflow-x: hidden;
    }
    h1 {
      text-align: center;
      padding-top: 20px;
      color: #FFD700;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(13, 1fr);
      grid-template-rows: repeat(13, 50px);
      gap: 2px;
      width: 90vw;
      margin: 40px auto;
    }
    .toggle {
      border: 1px solid #0ff;
      background: #111;
      text-align: center;
      cursor: pointer;
      transition: 0.3s;
    }
    .toggle:hover {
      background: #0ff;
      color: #000;
    }
    .output-box {
      margin-top: 20px;
      background: #111;
      padding: 20px;
      border-top: 2px solid #0ff;
      color: #fff;
      font-size: 0.9rem;
      max-height: 300px;
      overflow-y: scroll;
    }
    .symbol-spawn {
      position: absolute;
      color: #FFD700;
      font-size: 24px;
      pointer-events: none;
      animation: fadeout 3s forwards;
    }
    @keyframes fadeout {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-50px); }
    }
    #bg-audio { display: none; }
  </style>
</head>
<body>
  <iframe id="bg-audio" src="https://www.youtube.com/embed/TnsF_mIXBzw?autoplay=1&loop=1&playlist=TnsF_mIXBzw&controls=0&mute=0" title="Background Song" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

  <h1>HOUSE OF TOTH: PYRAMIDBUILDER</h1>
  <div class="grid-container" id="grid"></div>
  <div class="output-box" id="output">
    <p>Click toggles to spawn quantum knowledge and sigils. Indexed terms powered by Agents 1-3.</p>
  </div>

  <script>
    const symbols = ['□', '●', '∞', '☯', '⚛', '✡', '△', '★'];
    const termsLinks = {
      "dielectric-diamagnetic ball": { url: null, note: "Related to 'Dielectric' and 'Diamagnetism'." },
      "inversion symmetry": { url: "https://en.wikipedia.org/wiki/Parity_(physics)", note: "Covered under 'Parity (physics)'." },
      "Maxwell-Chern-Simons circle": { url: null, note: "Likely related to 'Chern-Simons theory'." },
      "parallel lines": { url: "https://en.wikipedia.org/wiki/Parallel_(geometry)", note: "Covered under 'Parallel (geometry)'." },
      "parallel dielectric slabs": { url: null, note: "Dielectric configurations." },
      "parallel plates": { url: "https://en.wikipedia.org/wiki/Capacitor", note: "Capacitor layout." },
      "high temperature": { url: "https://en.wikipedia.org/wiki/High-temperature_superconductivity", note: "HT superconductors." },
      "low temperature": { url: "https://en.wikipedia.org/wiki/Low-temperature_physics", note: "Low-temp behavior." },
      "sphere": { url: "https://en.wikipedia.org/wiki/Sphere", note: "Geometric sphere." },
      "two dimensions": { url: "https://en.wikipedia.org/wiki/Two-dimensional_space", note: "2D space." },
      "unequal temperatures": { url: null, note: "Thermodynamic gradients." },
      "Tensor density": { url: "https://en.wikipedia.org/wiki/Tensor_density", note: "Mathematical object." },
      "Waveguide theory": { url: "https://en.wikipedia.org/wiki/Waveguide", note: "Signal confinement." }
    };

    const termKeys = Object.keys(termsLinks);
    const grid = document.getElementById('grid');

    let clickCount = 0;
    let lastClickTime = 0;
    const maxClicks = 10;
    const cooldownTime = 5000;

    for (let i = 0; i < 169; i++) {
      const cell = document.createElement('div');
      cell.className = 'toggle';
      cell.innerText = '+';

      cell.onclick = async () => {
        const now = Date.now();
        if (now - lastClickTime < cooldownTime) {
          alert("⏱️ Wait 5 seconds between clicks.");
          return;
        }

        if (clickCount >= maxClicks) {
          alert("🔒 Max activations reached. Try again later.");
          return;
        }

        clickCount++;
        lastClickTime = now;

        const output = document.getElementById('output');
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomTerm = termKeys[Math.floor(Math.random() * termKeys.length)];
        const termObj = termsLinks[randomTerm];
        const agentNum = Math.floor(Math.random() * 3) + 1;

        const span = document.createElement('span');
        span.className = 'symbol-spawn';
        span.style.left = Math.random() * window.innerWidth + 'px';
        span.style.top = Math.random() * window.innerHeight + 'px';
        span.innerText = randomSymbol;
        document.body.appendChild(span);

        try {
          const aiRes = await fetch('https://YOUR-RENDER-URL.onrender.com/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agent: agentNum, term: randomTerm, symbol: randomSymbol })
          });

          const data = await aiRes.json();
          const lore = data.reply || 'The oracle remained silent.';
          const linkHTML = termObj.url ? `<a href="${termObj.url}" target="_blank">${randomTerm}</a>` : `<span>${randomTerm}</span>`;

          output.innerHTML += `<p><strong>Agent ${agentNum}:</strong> ${linkHTML} via ${randomSymbol}<br/><em>${termObj.note}</em><br/><em>${lore}</em></p>`;
          output.scrollTop = output.scrollHeight;
        } catch (err) {
          console.error(err);
          output.innerHTML += `<p>❌ AI connection failed.</p>`;
        }
      };

      grid.appendChild(cell);
    }
  </script>
</body>
</html>
