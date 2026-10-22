const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const defaults = {
  exposure: 0,
  contrast: 1.15,
  temperature: -0.15,
  tint: 0.02,
  highlights: -0.15,
  shadows: 0.12,
  saturation: 0.95,
  sharpness: 1.20,
  grain: 0.10,
  vignette: 0.18,
  yellowCastReduction: 0.60
};

const presets = [
  {
    id: 'signature_midnight_road',
    name: 'Midnight Road',
    subtitle: 'Signature Night Aesthetic',
    category: 'Signature',
    signature: true,
    settings: {
      exposure: 0.02, contrast: 1.22, temperature: -0.28,
      tint: 0.04, highlights: -0.25, shadows: 0.15,
      saturation: 0.92, sharpness: 1.35, grain: 0.12,
      vignette: 0.22, yellowCastReduction: 0.75
    }
  },
  {
    id: 'dslr_truetone',
    name: 'DSLR TrueTone',
    subtitle: 'Clean Pinterest / IG Aesthetic',
    category: 'Realistic',
    settings: {
      exposure: 0, contrast: 1.10, temperature: -0.05,
      tint: 0, highlights: -0.10, shadows: 0.08,
      saturation: 0.98, sharpness: 1.25, grain: 0.06,
      vignette: 0.10, yellowCastReduction: 0.35
    }
  },
  {
    id: 'golden_hour_natural',
    name: 'Golden Natural',
    subtitle: 'Soft Daylight & Golden Hour',
    category: 'Daylight',
    settings: {
      exposure: 0.05, contrast: 1.12, temperature: 0.22,
      tint: -0.02, highlights: -0.18, shadows: 0.10,
      saturation: 1.05, sharpness: 1.15, grain: 0.05,
      vignette: 0.12, yellowCastReduction: 0
    }
  },
  {
    id: 'cinematic_teal_shadow',
    name: 'Cinematic Night',
    subtitle: 'Deep Shadows & Cool Depth',
    category: 'Cinematic',
    settings: {
      exposure: -0.05, contrast: 1.28, temperature: -0.35,
      tint: 0.06, highlights: -0.30, shadows: 0.18,
      saturation: 0.90, sharpness: 1.30, grain: 0.15,
      vignette: 0.26, yellowCastReduction: 0.80
    }
  },
  {
    id: 'moody_urban_neon',
    name: 'Urban Street',
    subtitle: 'Balanced Neon & Lamp Glow',
    category: 'Night',
    settings: {
      exposure: 0, contrast: 1.25, temperature: -0.18,
      tint: 0.08, highlights: -0.22, shadows: 0.14,
      saturation: 1.02, sharpness: 1.28, grain: 0.12,
      vignette: 0.20, yellowCastReduction: 0.65
    }
  },
  {
    id: 'analog_35mm_clean',
    name: '35mm Minimal',
    subtitle: 'Organic Micro-Grain & Detail',
    category: 'Analog',
    settings: {
      exposure: 0.04, contrast: 1.08, temperature: -0.08,
      tint: 0.02, highlights: -0.12, shadows: 0.12,
      saturation: 0.94, sharpness: 1.18, grain: 0.22,
      vignette: 0.15, yellowCastReduction: 0.40
    }
  }
];

const controls = [
  {
    key: 'yellowCastReduction',
    label: 'Yellow Cast Reduction',
    min: 0, max: 1, step: 0.01, tab: 'color',
    desc: 'Counteracts yellow/orange streetlamp casts.'
  },
  {
    key: 'temperature',
    label: 'Color Temperature',
    min: -1, max: 1, step: 0.01, tab: 'color',
    desc: 'Cool neutral night tones ↔ warm daylight.'
  },
  {
    key: 'tint',
    label: 'Tint',
    min: -1, max: 1, step: 0.01, tab: 'color',
    desc: 'Green ↔ magenta color compensation.'
  },
  {
    key: 'saturation',
    label: 'Saturation',
    min: 0, max: 2, step: 0.01, tab: 'color',
    desc: 'True-to-life color intensity.'
  },
  {
    key: 'contrast',
    label: 'Contrast',
    min: 0.5, max: 2, step: 0.01, tab: 'light',
    desc: 'Balanced depth and tonal separation.'
  },
  {
    key: 'highlights',
    label: 'Highlights',
    min: -1, max: 1, step: 0.01, tab: 'light',
    desc: 'Recover bright lamps and blown highlights.'
  },
  {
    key: 'shadows',
    label: 'Shadows',
    min: -1, max: 1, step: 0.01, tab: 'light',
    desc: 'Reveal darker scene detail.'
  },
  {
    key: 'exposure',
    label: 'Exposure',
    min: -1, max: 1, step: 0.01, tab: 'light',
    desc: 'Overall image brightness.'
  },
  {
    key: 'sharpness',
    label: 'Sharpness',
    min: 0, max: 2, step: 0.01, tab: 'detail',
    desc: 'Enhance edges and fine detail.'
  },
  {
    key: 'grain',
    label: 'Micro-Grain',
    min: 0, max: 1, step: 0.01, tab: 'detail',
    desc: 'Subtle organic sensor texture.'
  },
  {
    key: 'vignette',
    label: 'Vignette',
    min: 0, max: 1, step: 0.01, tab: 'detail',
    desc: 'Gentle cinematic edge falloff.'
  }
];

const signaturePrompt = `Enhance my uploaded photo into a premium, ultra-realistic aesthetic photograph.

IMPORTANT: Preserve the original photo, real face and identity, skin tone, age, body proportions, pose, clothing, objects, background, surroundings, and composition exactly as they are.

Apply my signature aesthetic editing style:
• Improve lighting, exposure, contrast, sharpness, and fine details.
• Use natural, professional DSLR-style color grading.
• Create balanced highlights, rich but realistic shadows, and natural textures.
• Keep colors clean, balanced, and true to life.
• Reduce excessive yellow or orange color casts.
• Use neutral-to-cool tones for night scenes where appropriate.
• Use soft, natural tones for daylight and golden-hour photos.
• Add subtle cinematic depth while maintaining a realistic smartphone-camera look.
• Improve clarity and overall image quality without making the photo look artificial.
• Keep the original atmosphere and mood of the scene.

STRICT RULES:
Do not change the real face or identity. Do not alter facial features, skin tone, age, body shape, pose, or clothes. Do not replace or modify the background. Do not add or remove objects. No fake bokeh, artificial HDR, excessive smoothing, oversaturation, heavy filters, or AI-generated appearance. No unnecessary cinematic effects or exaggerated color grading. Keep the original composition unchanged.

Final result: A natural, premium Instagram/Pinterest aesthetic photo with subtle professional enhancement, realistic details, balanced colors, and a photorealistic finish.`;

let settings = { ...presets[0].settings };
let selected = presets[0].id;
let kind = 'video';
let file = null;
let url = null;
let originalImage = null;
let compareHeld = false;
let originalVideoUrl = null;

$('#promptText').value = signaturePrompt;

function renderPresets() {
  $('#presets').innerHTML = presets.map(p =>
    `<button class="preset ${p.id === selected ? 'active' : ''}" data-id="${p.id}">
      <span class="cat ${p.signature ? 'signature' : ''}">${p.category}</span>
      <strong>${p.name}</strong>
      <small>${p.subtitle}</small>
    </button>`
  ).join('');

  $$('[data-id]').forEach(b => {
    b.onclick = () => {
      selected = b.dataset.id;
      settings = { ...presets.find(p => p.id === selected).settings };
      renderPresets();
      renderControls();
      applyPreview();
    };
  });
}

function renderControls() {
  const tab = $('.tabs button.active').dataset.tab;

  $('#adjustments').innerHTML = controls
    .filter(c => c.tab === tab)
    .map(c => `
      <div class="control">
        <div class="controlHead">
          <span>${c.label}</span>
          <output id="out-${c.key}">${settings[c.key].toFixed(2)}</output>
        </div>
        <p>${c.desc}</p>
        <input type="range"
          min="${c.min}" max="${c.max}" step="${c.step}"
          value="${settings[c.key]}"
          data-key="${c.key}" aria-label="${c.label}">
      </div>
    `).join('');

  $$('#adjustments input').forEach(i => {
    i.oninput = () => {
      settings[i.dataset.key] = Number(i.value);
      $('#out-' + i.dataset.key).value = Number(i.value).toFixed(2);
      applyPreview();
    };
  });
}

function matrix(s) {
  const expScale = 1 + s.exposure * 0.8;
  const expOffset = s.exposure * 30;
  const contrast = s.contrast;
  const contrastOffset = (-0.5 * contrast + 0.5) * 255;
  const temp = s.temperature;

  const rTemp = temp < 0 ? 1 + temp * 0.35 : 1 + temp * 0.28;
  const gTemp = 1 + temp * 0.05;
  const bTemp = temp < 0 ? 1 - temp * 0.45 : 1 - temp * 0.30;

  const t = s.tint;
  const rTint = 1 + t * 0.15;
  const gTint = 1 - t * 0.25;
  const bTint = 1 + t * 0.15;

  const y = s.yellowCastReduction;
  const rYellow = 1 - y * 0.12;
  const gYellow = 1 - y * 0.08;
  const bYellow = 1 + y * 0.15;

  const highlight = s.highlights * 25;
  const shadow = s.shadows * 28;

  const rs = Math.max(0.1, contrast * expScale * rTemp * rTint * rYellow);
  const gs = Math.max(0.1, contrast * expScale * gTemp * gTint * gYellow);
  const bs = Math.max(0.1, contrast * expScale * bTemp * bTint * bYellow);

  const offset = contrastOffset + expOffset + shadow + highlight;
  const sat = s.saturation;
  const inv = 1 - sat;

  const lr = 0.2126;
  const lg = 0.7152;
  const lb = 0.0722;

  return [
    [(inv * lr + sat) * rs, inv * lg * gs, inv * lb * bs, offset],
    [inv * lr * rs, (inv * lg + sat) * gs, inv * lb * bs, offset],
    [inv * lr * rs, inv * lg * gs, (inv * lb + sat) * bs, offset + y * 8]
  ];
}

function clamp(v) {
  return Math.max(0, Math.min(255, Math.round(v)));
}

function applyMatrixToCanvas(srcCanvas, s, withDetails = true) {
  const w = srcCanvas.width;
  const h = srcCanvas.height;
  const ctx = srcCanvas.getContext('2d', { willReadFrequently: true });
  const im = ctx.getImageData(0, 0, w, h);
  const d = im.data;
  const m = matrix(s);
  let seed = 77;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];

    d[i] = clamp(m[0][0] * r + m[0][1] * g + m[0][2] * b + m[0][3]);
    d[i + 1] = clamp(m[1][0] * r + m[1][1] * g + m[1][2] * b + m[1][3]);
    d[i + 2] = clamp(m[2][0] * r + m[2][1] * g + m[2][2] * b + m[2][3]);

    if (withDetails && s.grain > 0) {
      seed = (seed * 16807) % 2147483647;
      const n = ((seed / 2147483647) - 0.5) * s.grain * 22;
      d[i] = clamp(d[i] + n);
      d[i + 1] = clamp(d[i + 1] + n);
      d[i + 2] = clamp(d[i + 2] + n);
    }
  }

  ctx.putImageData(im, 0, 0);

  if (withDetails && s.vignette > 0) {
    const g = ctx.createRadialGradient(
      w / 2, h / 2, Math.min(w, h) * 0.2,
      w / 2, h / 2, Math.max(w, h) * 0.72
    );
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, `rgba(0,0,0,${s.vignette * 0.58})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  return srcCanvas;
}

function previewFilter() {
  const s = settings;
  return `brightness(${100 + s.exposure * 25 + s.shadows * 7 + s.highlights * 2}%)
    contrast(${100 + (s.contrast - 1) * 70}%)
    saturate(${s.saturation * 100}%)
    hue-rotate(${s.temperature * -8 + s.tint * 4}deg)`;
}

function applyPreview() {
  const el = kind === 'photo' ? $('#photoPreview') : $('#videoPreview');

  if (file && !compareHeld) el.style.filter = previewFilter();

  $('#export').disabled = !file;

  $('#exportDescription').textContent = !file
    ? 'Select media to enable export.'
    : kind === 'photo'
      ? 'Export a processed JPEG photo.'
      : 'Export up to 15 seconds as a browser-supported WebM video.';

  updateComparison();
}

function updateComparison() {
  const layer = $('#compareLayer');
  const line = $('#compareLine');
  const split = Number($('#split').value);

  if (!file || kind !== 'photo' || !originalImage) {
    layer.hidden = true;
    line.hidden = true;
    return;
  }

  layer.hidden = false;
  line.hidden = false;
  layer.style.width = split + '%';
  line.style.left = split + '%';
  $('#originalCompare').src = originalImage.src;
}

function loadMedia(f) {
  if (!f) return;

  if (!f.type.startsWith('image/') && !f.type.startsWith('video/')) {
    return toast('Choose an image or video file.');
  }

  if (url) URL.revokeObjectURL(url);

  file = f;
  url = URL.createObjectURL(f);
  kind = f.type.startsWith('image/') ? 'photo' : 'video';

  $('#empty').hidden = true;
  $('#photoPreview').hidden = kind !== 'photo';
  $('#videoPreview').hidden = kind !== 'video';
  $('#compareLayer').hidden = true;
  $('#compareLine').hidden = true;

  if (kind === 'photo') {
    const im = $('#photoPreview');

    im.onload = () => {
      originalImage = new Image();
      originalImage.onload = () => applyPreview();
      originalImage.src = url;
      applyPreview();
    };

    im.src = url;
    $('#mediaType').textContent = 'PHOTO MODE';
    $('#fileInfo').textContent =
      `${(f.size / 1048576).toFixed(2)} MB · ${f.type.split('/').pop().toUpperCase()}`;
  } else {
    originalImage = null;
    const v = $('#videoPreview');
    v.src = url;

    v.onloadedmetadata = () => {
      applyPreview();
      $('#fileInfo').textContent =
        `${v.videoWidth} × ${v.videoHeight} · ${Math.round(v.duration)} sec · ${(f.size / 1048576).toFixed(2)} MB`;
    };

    $('#mediaType').textContent = 'VIDEO MODE';
    $('#fileInfo').textContent = `${(f.size / 1048576).toFixed(2)} MB · VIDEO`;
    applyPreview();
  }

  $('#fileName').textContent = f.name;
  $('#export').disabled = false;
  toast((kind === 'photo' ? 'Photo' : 'Video') + ' loaded. Signature aesthetic applied.');
}

$('#pickPhoto').onclick = () => $('#photoFile').click();
$('#pickVideo').onclick = () => $('#videoFile').click();

$('#chooseMedia').onclick = () => {
  if (kind === 'video') $('#videoFile').click();
  else $('#photoFile').click();
};

$('#replaceMedia').onclick = () => {
  if (kind === 'photo') $('#photoFile').click();
  else $('#videoFile').click();
};

$('#photoFile').onchange = e => loadMedia(e.target.files[0]);
$('#videoFile').onchange = e => loadMedia(e.target.files[0]);

$$('[data-tab]').forEach(b => {
  b.onclick = () => {
    $$('[data-tab]').forEach(x => x.classList.toggle('active', x === b));
    renderControls();
  };
});

$('#resetSliders').onclick = () => {
  settings = { ...presets.find(p => p.id === selected).settings };
  renderControls();
  applyPreview();
};

$('#resetPreset').onclick = () => {
  selected = presets[0].id;
  settings = { ...presets[0].settings };
  renderPresets();
  renderControls();
  applyPreview();
};

$('#split').oninput = updateComparison;

$('#compareHold').onpointerdown = () => {
  if (!file) return;
  compareHeld = true;
  (kind === 'photo' ? $('#photoPreview') : $('#videoPreview')).style.filter = 'none';

  if (kind === 'photo') {
    $('#compareLayer').hidden = true;
    $('#compareLine').hidden = true;
  }
};

function endHold() {
  if (!compareHeld) return;
  compareHeld = false;
  applyPreview();
}

$('#compareHold').onpointerup = endHold;
$('#compareHold').onpointerleave = endHold;
$('#compareHold').onpointercancel = endHold;

$('#promptOpen').onclick = () => $('#promptModal').hidden = false;
$('#promptClose').onclick = () => $('#promptModal').hidden = true;

$('#promptModal').onclick = e => {
  if (e.target.id === 'promptModal') e.currentTarget.hidden = true;
};

$('#copyPrompt').onclick = async () => {
  try {
    await navigator.clipboard.writeText(signaturePrompt);
  } catch (e) {
    $('#promptText').select();
    document.execCommand('copy');
  }
  toast('Signature prompt copied.');
};

function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

function toast(msg) {
  $('#toast').textContent = msg;
  $('#toast').classList.add('show');
  clearTimeout(window.tt);
  window.tt = setTimeout(() => $('#toast').classList.remove('show'), 2400);
}
