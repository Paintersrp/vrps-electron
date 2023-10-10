document.getElementById('generate-button').addEventListener('click', () => {
  const text = document.getElementById('barcode-input').value;
  const entries = text.split('\n');

  const barcodeOutput = document.getElementById('barcode-output');
  barcodeOutput.innerHTML = '';

  const scale = parseFloat(document.getElementById('barcode-scale').value);
  const barcodeType = document.getElementById('barcode-type').value;
  const itemMargin = document.getElementById('barcode-item-margin').value + 'px';
  console.log(itemMargin);

  entries.forEach((entry, index) => {
    const trimmedEntry = entry.trim(); // Remove leading and trailing whitespace
    if (trimmedEntry === '') return; // Skip empty lines

    const wrapper = document.createElement('div');
    wrapper.style.margin = `0 auto ${itemMargin} auto`; // Apply margin to the wrapper
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = `barcode-${index}`;
    svg.classList.add('barcode-generator-item');

    wrapper.appendChild(svg);
    barcodeOutput.appendChild(wrapper);

    JsBarcode(`#barcode-${index}`, trimmedEntry, {
      format: barcodeType,
      width: 2 * scale,
      height: 100 * scale,
      displayValue: true,
    });
  });
});

let autoscrollEnabled = false;
let animationFrame;
let scrollAccumulator = 0;

const scrollSpeedInput = document.getElementById('scroll-speed');
const toggleAutoscrollBtn = document.getElementById('toggle-autoscroll');

function smoothScroll() {
  if (autoscrollEnabled) {
    const speed = parseFloat(scrollSpeedInput.value);
    scrollAccumulator += speed * 0.5;

    while (scrollAccumulator >= 1) {
      window.scrollBy(0, 1);
      scrollAccumulator -= 1;
    }

    animationFrame = requestAnimationFrame(smoothScroll);
  }
}

toggleAutoscrollBtn.addEventListener('click', () => {
  autoscrollEnabled = !autoscrollEnabled;
  togglePlayPauseIcon();
  if (autoscrollEnabled) {
    animationFrame = requestAnimationFrame(smoothScroll);
  } else {
    cancelAnimationFrame(animationFrame);
  }
});

function togglePlayPauseIcon() {
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');

  if (autoscrollEnabled) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
  } else {
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
  }
}

document.getElementById('scroll-speed').addEventListener('input', (event) => {
  if (autoscrollEnabled) {
    clearInterval(autoscrollInterval); // Clear the existing interval
    const interval = parseInt(event.target.value, 10);
    autoscrollInterval = setInterval(() => {
      window.scrollBy(0, 5); // Increase the distance to make it faster
    }, interval);
  }
});

function toggleBackToTopButton() {
  const scrollPosition = window.scrollY;
  const button = document.getElementById('back-to-top');

  if (scrollPosition > 300) {
    // Show button after scrolling 300px
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}

// Back-to-top button click event
document.getElementById('back-to-top').addEventListener('click', () => {
  autoscrollEnabled = false;
  togglePlayPauseIcon();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Listen for scroll events to toggle the back-to-top button
window.addEventListener('scroll', toggleBackToTopButton);

document.getElementById('toggle-config').addEventListener('click', function () {
  const configSection = document.getElementById('config-section');
  if (configSection.classList.contains('collapsed')) {
    this.innerHTML = 'Minimize Config';
    configSection.classList.remove('collapsed');
  } else {
    this.innerHTML = 'Maximize Config';
    configSection.classList.add('collapsed');
  }
});

const barcodeTypes = [
  { value: 'CODE128', text: 'CODE128' },
  { value: 'CODE39', text: 'CODE39' },
  { value: 'EAN2', text: 'EAN2' },
  { value: 'EAN5', text: 'EAN-5' },
  { value: 'EAN8', text: 'EAN-8' },
  { value: 'EAN13', text: 'EAN-13' },
  { value: 'UPC', text: 'UPC' },
  { value: 'ITF', text: 'ITF' },
  { value: 'MSI', text: 'MSI' },
  { value: 'pharmacode', text: 'Pharmacode' },
];

const selectElement = document.getElementById('barcode-type');

barcodeTypes.forEach((type) => {
  const optionElement = document.createElement('option');
  optionElement.value = type.value;
  optionElement.textContent = type.text;
  if (type.value === 'CODE128') {
    optionElement.selected = true;
  }
  selectElement.appendChild(optionElement);
});
