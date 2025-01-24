const blob = document.getElementById('blob');
const codeDisplay = document.getElementById('code');
const sliders = {
  tl: document.getElementById('tl'),
  tr: document.getElementById('tr'),
  br: document.getElementById('br'),
  bl: document.getElementById('bl'),
};

function updateBorderRadius() {
  console.log('Updating border radius...');
  const topLeft = sliders.tl.value;
  const topRight = sliders.tr.value;
  const bottomRight = sliders.br.value;
  const bottomLeft = sliders.bl.value;

  const borderRadius = `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`;
  blob.style.borderRadius = borderRadius;
  codeDisplay.textContent = `border-radius: ${borderRadius};`;
}

Object.values(sliders).forEach((slider) => {
  slider.addEventListener('input', updateBorderRadius);
});

updateBorderRadius(); // Inicializa o valor inicial
