import React, { useState } from "react";
import "./style.css";
import characterImages from "./characterImages"; // assumes a separate file for image URLs

function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [scene, setScene] = useState("");
  const [error, setError] = useState("");

  const characters = [
    "Joey Tribbiani (Friends)",
    "Chandler Bing (Friends)",
    "Monica Geller (Friends)",
    "Ross Geller (Friends)",
    "Rachel Green (Friends)",
    "Phoebe Buffay (Friends)",
    "Sheldon Cooper (TBBT)",
    "Leonard Hofstadter (TBBT)",
    "Howard Wolowitz (TBBT)",
    "Raj Koothrappali (TBBT)",
    "Penny (TBBT)",
    "Barney Stinson (HIMYM)",
    "Ted Mosby (HIMYM)",
    "Robin Scherbatsky (HIMYM)",
    "Marshall Eriksen (HIMYM)",
    "Lily Aldrin (HIMYM)",
    "Jim Halpert (The Office)",
    "Michael Scott (The Office)",
    "Dwight Schrute (The Office)",
    "Pam Beesly (The Office)",
    "Andy Bernard (The Office)",
    "Phil Dunphy (Modern Family)",
    "Claire Dunphy (Modern Family)",
    "Gloria Pritchett (Modern Family)",
    "Jay Pritchett (Modern Family)",
    "Mitchell Pritchett (Modern Family)",
    "Cameron Tucker (Modern Family)",
  ];

  const toggleCharacter = (character) => {
    setSelectedCharacters((prev) =>
      prev.includes(character)
        ? prev.filter((c) => c !== character)
        : [...prev, character]
    );
  };

  const generateScene = async () => {
    if (selectedCharacters.length < 2) {
      setError("Please select at least 2 characters!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/scene", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characters: selectedCharacters }),
      });

      const data = await response.json();
      if (data.scene) {
        setScene(data.scene);
        setError("");
      } else {
        setError("Failed to generate scene.");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setError("Server not reachable.");
    }
  };

  return (
    <div className="app-container">
      <h1>🎬 Sitcom Crossover Generator</h1>
      <p>Select your characters to create a hilarious crossover scene:</p>

      <div className="character-grid">
        {characters.map((character) => (
          <div
            key={character}
            className={`character-card ${
              selectedCharacters.includes(character) ? "selected" : ""
            }`}
            onClick={() => toggleCharacter(character)}
          >
            <img
              src={characterImages[character]}
              alt={character}
              className="character-img"
            />
            <span className="character-name">{character}</span>
          </div>
        ))}
      </div>

      <button className="generate-btn" onClick={generateScene}>
        Generate Scene
      </button>

      {error && <p className="error">{error}</p>}
      {scene && <div className="scene-box">{scene}</div>}
    </div>
  );
}

export default App;
