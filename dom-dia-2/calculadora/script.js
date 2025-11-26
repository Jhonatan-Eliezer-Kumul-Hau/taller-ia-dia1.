/*
Instrucciones rápidas: abrir index.html en un navegador.
Soporta teclado numérico y teclado principal.
Teclas: 0-9, ., +, -, *, /, Enter(=), Backspace (borrar), Escape (C).
*/

document.addEventListener('DOMContentLoaded', () => {
  const displayExp = document.getElementById('display-expression');
  const displayRes = document.getElementById('display-result');
  const buttons = document.querySelectorAll('.btn');

  let expr = '';

  function updateDisplays() {
    displayExp.textContent = expr || '0';
    // result stays until evaluation; keep aria-live updated separately when result changes
  }

  function safeEvaluate(input) {
    // Normalizar signos visuales si los hubiera
    const normalized = input.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    // Sólo permitir caracteres seguros: dígitos, operadores, paréntesis y punto y espacios
    if (!/^[0-9+\-*/().\s]+$/.test(normalized)) return { ok: false, error: 'Entrada inválida' };
    try {
      // eslint-disable-next-line no-new-func
      const result = Function('"use strict"; return (' + normalized + ')')();
      if (typeof result === 'number' && !isFinite(result)) return { ok: false, error: 'Resultado no válido' };
      return { ok: true, value: result };
    } catch (e) {
      return { ok: false, error: 'Error de evaluación' };
    }
  }

  function evaluate() {
    if (!expr) return;
    const res = safeEvaluate(expr);
    if (res.ok) {
      displayRes.textContent = String(res.value);
    } else {
      displayRes.textContent = res.error;
    }
  }

  function toggleSign() {
    // Invierte el signo del último número en la expresión
    if (!expr) { expr = '-'; updateDisplays(); return; }
    expr = expr.replace(/(-?\d+(?:\.\d+)?)$/ , (m) => (m.startsWith('-') ? m.slice(1) : '-' + m));
    updateDisplays();
  }

  function handleInput(v) {
    if (v === 'C') { expr = ''; displayRes.textContent = '0'; updateDisplays(); return; }
    if (v === 'BS') { expr = expr.slice(0, -1); updateDisplays(); return; }
    if (v === '=') { evaluate(); return; }
    if (v === '±') { toggleSign(); return; }
    // Evitar entradas inválidas directas: por ejemplo dos operadores seguidos (permitir paréntesis y signo negativo)
    const last = expr.slice(-1);
    if (/^[+\-/.]$/.test(last) && /^[+\-/.]$/.test(v)) {
      // reemplaza operador anterior por el nuevo (salvo punto)
      if (v === '.') { expr += v; updateDisplays(); return; }
      expr = expr.slice(0, -1) + v;
      updateDisplays();
      return;
    }
    expr += v;
    updateDisplays();
  }

  buttons.forEach(btn => btn.addEventListener('click', () => handleInput(btn.dataset.value)));

  // Manejo de teclado (principal y numpad)
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    // Dígitos
    if (/^[0-9]$/.test(key)) { handleInput(key); e.preventDefault(); return; }
    if (key === '.' || key === ',') { handleInput('.'); e.preventDefault(); return; }
    if (['+','-','*','/','(',')'].includes(key)) { handleInput(key); e.preventDefault(); return; }
    if (key === 'Enter' || key === '=') { handleInput('='); e.preventDefault(); return; }
    if (key === 'Backspace') { handleInput('BS'); e.preventDefault(); return; }
    if (key === 'Escape') { handleInput('C'); e.preventDefault(); return; }
    if (key === 'Delete') { expr = ''; displayRes.textContent = '0'; updateDisplays(); e.preventDefault(); return; }
    // Numpad support: e.code suele ser 'Numpad0'...'NumpadAdd' etc.
    if (e.code && e.code.startsWith('Numpad')) {
      // e.key ya tiene el valor correcto para la mayoría de numpads
      if (/^[0-9.]$/.test(e.key)) { handleInput(e.key); e.preventDefault(); return; }
      // Operadores numpad (en algunos navegadores/teclados)
      if (e.code === 'NumpadAdd') { handleInput('+'); e.preventDefault(); return; }
      if (e.code === 'NumpadSubtract') { handleInput('-'); e.preventDefault(); return; }
      if (e.code === 'NumpadMultiply') { handleInput('*'); e.preventDefault(); return; }
      if (e.code === 'NumpadDivide') { handleInput('/'); e.preventDefault(); return; }
      if (e.code === 'NumpadEnter') { handleInput('='); e.preventDefault(); return; }
    }
  });

  // Estado inicial
  displayRes.textContent = '0';
  updateDisplays();
});