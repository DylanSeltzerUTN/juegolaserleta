const gridContainer = document.getElementById("grid");
const laserV = document.querySelector(".laser-vertical");
const laserH = document.querySelector(".laser-horizontal");

const colorMap = {
  1: "yellow",
  2: "green",
  3: "blue",
  4: "black",
};

// Configuración por nivel
const levelConfigs = {
  1:  { rows: 4, cols: 6,  speedV: 6, speedH: 9,   showHorizontal: false },
  2:  { rows: 4, cols: 6,  speedV: 5,   speedH: 8,   showHorizontal: false },
  3:  { rows: 4, cols: 6,  speedV: 4, speedH: 7,   showHorizontal: false  },
  4:  { rows: 4, cols: 7,  speedV: 2.5,   speedH: 6,   showHorizontal: false  },
  5:  { rows: 5, cols: 8,  speedV: 4.5, speedH: 5.5, showHorizontal: true  },
  6:  { rows: 5, cols: 9,  speedV: 4,   speedH: 5,   showHorizontal: true  },
  7:  { rows: 6, cols: 10, speedV: 1.5, speedH: 4.5, showHorizontal: false  },
  8:  { rows: 6, cols: 11, speedV: 3,   speedH: 4,   showHorizontal: true  },
  9:  { rows: 7, cols: 12, speedV: 2,   speedH: 3, showHorizontal: true  },
  10: { rows: 7, cols: 12, speedV: 2,   speedH: 1,   showHorizontal: true  },
};





let currentLevel = 1;
const maxLevel = 10;
const minLevel = 1;

function setLevel(level) {
  const config = levelConfigs[level];
    const { rows, cols, speedV, speedH, showHorizontal } = config;

  // Actualizar CSS grid
  document.documentElement.style.setProperty('--rows', rows);
  document.documentElement.style.setProperty('--cols', cols);

  const totalCells = rows * cols;
// Distribución de colores: verde, azul, amarillo según porcentaje, el resto para negro
const colorCounts = {
    1: Math.floor(totalCells * 0.1),  // verde
    2: Math.floor(totalCells * 0.1), // azul
    3: Math.floor(totalCells * 0.1),  // amarillo
    4: totalCells - (
        Math.floor(totalCells * 0.1) +
        Math.floor(totalCells * 0.1) +
        Math.floor(totalCells * 0.1)
    ) // el resto para negro
};

  // Animación vertical
    laserV.style.animation = `moveLaserVertical ${speedV}s linear infinite alternate`;

  // Animación horizontal
  if (showHorizontal) {
    laserH.style.display = "block";
    laserH.style.animation = `moveLaserHorizontal ${speedH}s linear infinite alternate`;
  } else {
    laserH.style.display = "none";
    laserH.style.animation = "none";
  }

  // Crear grilla
  gridContainer.innerHTML = "";
  const gridArray = [];

  for (const [color, count] of Object.entries(colorCounts)) {
    for (let i = 0; i < count; i++) {
      gridArray.push(Number(color));
    }
  }

  // Mezclar
  for (let i = gridArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gridArray[i], gridArray[j]] = [gridArray[j], gridArray[i]];
  }

  // Renderizar
  gridArray.forEach((value) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = colorMap[value];
    gridContainer.appendChild(cell);
  });

  console.log(`Nivel ${level} cargado`);
}

// Control con flechas
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && currentLevel < maxLevel) {
        currentLevel++;
        setLevel(currentLevel);
    } else if (event.key === "ArrowLeft" && currentLevel > minLevel) {
        currentLevel--;
        setLevel(currentLevel);
    }
});

// Cambiar nivel con click
gridContainer.addEventListener("click", () => {
    if (currentLevel < maxLevel) {
        currentLevel++;
        setLevel(currentLevel);
    } else {
        currentLevel = minLevel;
        setLevel(currentLevel);
    }
});

// Iniciar
setLevel(currentLevel);
