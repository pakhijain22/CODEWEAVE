const langs = {
  js: [
    [`<span class="cmt">// CodeWeave Collaborative Editor — Real-time sync active</span>`],
    [`<span class="kw">import</span> <span class="punct">{</span> <span class="var2">OperationalTransform</span><span class="punct">,</span> <span class="var2">CRDTDocument</span> <span class="punct">}</span> <span class="kw">from</span> <span class="str">'./collab.js'</span><span class="punct">;</span>`],
    [``],
    [`<span class="kw">const</span> <span class="var2">session</span> <span class="punct">=</span> <span class="kw">new</span> <span class="cls">CollabSession</span><span class="punct">({</span>`],
    [`  <span class="var2">roomId</span><span class="punct">:</span>    <span class="str">'codeweave-7fx9'</span><span class="punct">,</span>`],
    [`  <span class="var2">transport</span><span class="punct">:</span> <span class="str">'websocket'</span><span class="punct">,</span>`],
    [`  <span class="var2">otEngine</span><span class="punct">:</span>  <span class="kw">new</span> <span class="cls">OperationalTransform</span><span class="punct">(),</span>`],
    [`<span class="punct">});</span>`],
    [``],
    [`<span class="cmt">// Listen for remote operations from peers</span>`],
    [`<span class="var2">session</span><span class="punct">.</span><span class="fn">onRemoteOp</span><span class="punct">((</span><span class="param">op</span><span class="punct">,</span> <span class="param">peer</span><span class="punct">)</span> <span class="punct">=&gt;</span> <span class="punct">{</span>`],
    [`  <span class="kw">const</span> <span class="var2">transformed</span> <span class="punct">=</span> <span class="var2">otEngine</span><span class="punct">.</span><span class="fn">transform</span><span class="punct">(</span><span class="var2">op</span><span class="punct">,</span> <span class="var2">localOp</span><span class="punct">);</span>`, true],
    [`  <span class="var2">document</span><span class="punct">.</span><span class="fn">apply</span><span class="punct">(</span><span class="var2">transformed</span><span class="punct">);</span>`],
    [`  <span class="var2">renderCursor</span><span class="punct">(</span><span class="var2">peer</span><span class="punct">.</span><span class="var2">userId</span><span class="punct">,</span> <span class="var2">peer</span><span class="punct">.</span><span class="var2">cursorPos</span><span class="punct">);</span>`],
    [`<span class="punct">});</span>`],
    [``],
    [`<span class="fn">function</span> <span class="fn">handleLocalEdit</span><span class="punct">(</span><span class="param">delta</span><span class="punct">)</span> <span class="punct">{</span>`],
    [`  <span class="kw">const</span> <span class="var2">op</span> <span class="punct">=</span> <span class="var2">session</span><span class="punct">.</span><span class="fn">createOp</span><span class="punct">(</span><span class="var2">delta</span><span class="punct">);</span>`],
    [`  <span class="var2">session</span><span class="punct">.</span><span class="fn">broadcast</span><span class="punct">(</span><span class="var2">op</span><span class="punct">);</span>  <span class="cmt">// push to all peers</span>`],
    [`<span class="punct">}</span>`],
  ],
  py: [
    [`<span class="cmt"># CodeWeave Collaborative Editor — Python mode</span>`],
    [`<span class="kw">from</span> <span class="var2">collab</span> <span class="kw">import</span> <span class="var2">OTEngine</span><span class="punct">,</span> <span class="var2">Session</span>`],
    [`<span class="kw">import</span> <span class="var2">asyncio</span><span class="punct">,</span> <span class="var2">websockets</span>`],
    [``],
    [`<span class="decorator">@asyncio.coroutine</span>`],
    [`<span class="kw">async</span> <span class="kw">def</span> <span class="fn">sync_loop</span><span class="punct">(</span><span class="param">session</span><span class="punct">:</span> <span class="type">Session</span><span class="punct">):</span>`],
    [`    <span class="var2">engine</span> <span class="punct">=</span> <span class="cls">OTEngine</span><span class="punct">()</span>`],
    [`    <span class="kw">async</span> <span class="kw">for</span> <span class="var2">op</span> <span class="kw">in</span> <span class="var2">session</span><span class="punct">.</span><span class="fn">stream</span><span class="punct">():</span>`, true],
    [`        <span class="var2">transformed</span> <span class="punct">=</span> <span class="var2">engine</span><span class="punct">.</span><span class="fn">transform</span><span class="punct">(</span><span class="var2">op</span><span class="punct">)</span>`],
    [`        <span class="kw">await</span> <span class="var2">session</span><span class="punct">.</span><span class="fn">apply</span><span class="punct">(</span><span class="var2">transformed</span><span class="punct">)</span>`],
    [``],
    [`<span class="kw">class</span> <span class="cls">CollabRoom</span><span class="punct">:</span>`],
    [`    <span class="kw">def</span> <span class="fn">__init__</span><span class="punct">(</span><span class="param">self</span><span class="punct">,</span> <span class="param">room_id</span><span class="punct">:</span> <span class="type">str</span><span class="punct">):</span>`],
    [`        <span class="var2">self</span><span class="punct">.</span><span class="var2">peers</span> <span class="punct">=</span> <span class="punct">[]</span>`],
    [`        <span class="var2">self</span><span class="punct">.</span><span class="var2">doc</span>   <span class="punct">=</span> <span class="cls">CRDTDocument</span><span class="punct">()</span>`],
    [``],
    [`    <span class="kw">async</span> <span class="kw">def</span> <span class="fn">broadcast</span><span class="punct">(</span><span class="param">self</span><span class="punct">,</span> <span class="param">op</span><span class="punct">):</span>`],
    [`        <span class="kw">for</span> <span class="var2">peer</span> <span class="kw">in</span> <span class="var2">self</span><span class="punct">.</span><span class="var2">peers</span><span class="punct">:</span>`],
    [`            <span class="kw">await</span> <span class="var2">peer</span><span class="punct">.</span><span class="fn">send</span><span class="punct">(</span><span class="var2">op</span><span class="punct">)</span>`],
    [`        <span class="kw">return</span> <span class="builtin">True</span>`],
  ],
  ts: [
    [`<span class="cmt">// CodeWeave — TypeScript collaborative engine</span>`],
    [`<span class="kw">import</span> <span class="kw">type</span> <span class="punct">{</span> <span class="type">Operation</span><span class="punct">,</span> <span class="type">Peer</span><span class="punct">,</span> <span class="type">SessionConfig</span> <span class="punct">}</span> <span class="kw">from</span> <span class="str">'./types'</span><span class="punct">;</span>`],
    [``],
    [`<span class="kw">interface</span> <span class="cls">CollabState</span> <span class="punct">{</span>`],
    [`  <span class="var2">peers</span><span class="punct">:</span>     <span class="type">Map</span><span class="punct">&lt;</span><span class="type">string</span><span class="punct">,</span> <span class="type">Peer</span><span class="punct">&gt;;</span>`],
    [`  <span class="var2">revision</span><span class="punct">:</span> <span class="type">number</span><span class="punct">;</span>`],
    [`  <span class="var2">pending</span><span class="punct">:</span>  <span class="type">Operation</span><span class="punct">[];</span>`],
    [`<span class="punct">}</span>`],
    [``],
    [`<span class="kw">class</span> <span class="cls">OTEngine</span><span class="punct">&lt;</span><span class="type">T</span> <span class="kw">extends</span> <span class="type">Operation</span><span class="punct">&gt;</span> <span class="punct">{</span>`],
    [`  <span class="fn">transform</span><span class="punct">(</span><span class="param">a</span><span class="punct">:</span> <span class="type">T</span><span class="punct">,</span> <span class="param">b</span><span class="punct">:</span> <span class="type">T</span><span class="punct">):</span> <span class="type">T</span> <span class="punct">{</span>`, true],
    [`    <span class="cmt">// resolve concurrent edits via diamond property</span>`],
    [`    <span class="kw">return</span> <span class="var2">this</span><span class="punct">.</span><span class="fn">compose</span><span class="punct">(</span><span class="var2">a</span><span class="punct">,</span> <span class="var2">this</span><span class="punct">.</span><span class="fn">invert</span><span class="punct">(</span><span class="var2">b</span><span class="punct">));</span>`],
    [`  <span class="punct">}</span>`],
    [`  <span class="kw">async</span> <span class="fn">broadcast</span><span class="punct">(</span><span class="param">op</span><span class="punct">:</span> <span class="type">T</span><span class="punct">):</span> <span class="type">Promise</span><span class="punct">&lt;</span><span class="type">void</span><span class="punct">&gt;</span> <span class="punct">{</span>`],
    [`    <span class="kw">await</span> <span class="var2">this</span><span class="punct">.</span><span class="var2">socket</span><span class="punct">.</span><span class="fn">emit</span><span class="punct">(</span><span class="str">'op'</span><span class="punct">,</span> <span class="var2">op</span><span class="punct">);</span>`],
    [`  <span class="punct">}</span>`],
    [`<span class="punct">}</span>`],
    [``],
    [`<span class="kw">export</span> <span class="kw">const</span> <span class="var2">engine</span> <span class="punct">=</span> <span class="kw">new</span> <span class="cls">OTEngine</span><span class="punct">();</span>`],
    [`<span class="kw">export</span> <span class="kw">default</span> <span class="var2">engine</span><span class="punct">;</span>`],
  ]
};

let currentLang = 'js';
let conflictActive = false;

/* ─── Render editor ─── */
function renderEditor(lang, conflictLine) {
  const lines = langs[lang];
  const lineNums = document.getElementById('lineNums');
  const codeArea = document.getElementById('codeArea');

  lineNums.innerHTML = lines
    .map((_, i) => `<div style="height:22px;padding-right:8px;">${i + 1}</div>`)
    .join('');

  codeArea.innerHTML = lines.map((lineData, i) => {
    const [html, isHighlight] = Array.isArray(lineData) ? lineData : [lineData, false];

    let cls = 'code-line';
    if (conflictLine !== null && i === conflictLine) cls += ' conflict-line';
    else if (isHighlight) cls += ' highlight-line';

    let extra = '';
    if (i === (lang === 'py' ? 7 : 11)) {
      extra = `<span class="cursor-label" style="background:#1f6feb;left:${lang === 'py' ? 40 : 200}px;">Aryan K.</span>`
             + `<span class="cursor-marker" style="background:#1f6feb;"></span>`;
    }
    if (i === (lang === 'py' ? 2 : 4)) {
      extra += `<span class="cursor-label" style="background:#8957e5;left:${lang === 'py' ? 180 : 260}px;">Priya L.</span>`
              + `<span class="cursor-marker" style="background:#8957e5;"></span>`;
    }

    return `<div class="${cls}" style="position:relative;">${html || '&nbsp;'}${extra}</div>`;
  }).join('');
}

/* ─── Language switcher ─── */
function changeLang(lang) {
  currentLang = lang;
  const names = { js: 'JavaScript', py: 'Python', ts: 'TypeScript' };
  document.getElementById('langStatus').textContent = names[lang];
  conflictActive = false;
  document.getElementById('conflictStatus').innerHTML = '';
  renderEditor(lang, null);
  addLog(`[Lang] Switched to ${names[lang]}. Syntax highlighting reloaded.`, 'info');
}

/* ─── Run code ─── */
function runCode() {
  const msgs = {
    js: [
      { t: '[Node.js] Executing main.js...',                              c: 'info'    },
      { t: '[OT] Transforming 3 pending operations...',                   c: 'ot'      },
      { t: 'Session "codeweave-7fx9" initialized. 4 peers connected.',    c: 'success' },
      { t: '[Sync] All operations converged. Document revision: 42.',     c: 'success' },
    ],
    py: [
      { t: '[Python 3.12] Running main.py...',                            c: 'info'    },
      { t: 'asyncio event loop started.',                                  c: ''        },
      { t: 'CollabRoom initialized. CRDT document ready.',                 c: 'success' },
      { t: 'WebSocket server listening on port 8765.',                     c: 'success' },
    ],
    ts: [
      { t: '[tsc] Compiling TypeScript...',                                c: 'info'    },
      { t: '[tsc] No type errors. Build successful.',                      c: 'success' },
      { t: 'OTEngine instantiated. Diamond property verified.',            c: 'ot'      },
      { t: 'Broadcast channel active. 4 peers subscribed.',                c: 'success' },
    ],
  };

  const lines = msgs[currentLang];
  let i = 0;
  const iv = setInterval(() => {
    if (i >= lines.length) { clearInterval(iv); return; }
    addLog(lines[i].t, lines[i].c);
    i++;
  }, 350);
}

/* ─── Conflict simulation ─── */
function triggerConflict() {
  if (conflictActive) {
    conflictActive = false;
    document.getElementById('conflictStatus').innerHTML = '';
    renderEditor(currentLang, null);
    addLog('[OT] Conflict resolved via Operational Transform. Document converged.', 'ot');
    addLog('[Sync] Revision incremented. All peers synchronized.', 'success');
    document.getElementById('u1status').textContent = 'editing line 12...';
    document.getElementById('u2status').textContent = 'viewing utils.js';
    return;
  }

  conflictActive = true;
  const conflictIdx = currentLang === 'py' ? 7 : 10;
  document.getElementById('conflictStatus').innerHTML = '<span class="conflict-badge">1 Conflict</span>';
  renderEditor(currentLang, conflictIdx);
  addLog('[CONFLICT] Concurrent edit detected on line ' + (conflictIdx + 1) + ' by Aryan K. & Sara R.', 'err');
  addLog('[OT] Applying Operational Transform... computing diamond closure...', 'warn');
  document.getElementById('u1status').textContent = '⚡ conflict on L' + (conflictIdx + 1);
  document.getElementById('u2status').textContent = '⚡ conflict on L' + (conflictIdx + 1);

  setTimeout(() => {
    if (conflictActive) {
      addLog("[OT] Transform successful. Sara's insert shifted by +3 chars.", 'ot');
      addLog('[OT] Click "Simulate Conflict" again to resolve.', '');
    }
  }, 800);
}

/* ─── Output log helper ─── */
function addLog(text, cls) {
  const body = document.getElementById('outputBody');
  const div = document.createElement('div');
  div.className = 'out-line' + (cls ? ' ' + cls : '');
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

/* ─── Animated collaborator statuses ─── */
const statusMsgs = [
  ['editing line 12...', 'typing...',    'idle',        'reviewing...'],
  ['inserted 3 chars',   'scrolling...', 'typing...',   'idle'],
  ['editing line 5...',  'idle',         'reviewing...','typing...'],
];
let msgIdx = 0;
setInterval(() => {
  if (!conflictActive) {
    const m = statusMsgs[msgIdx % statusMsgs.length];
    document.getElementById('u1status').textContent = m[0];
    document.getElementById('u2status').textContent = m[1];
    document.getElementById('u3status').textContent = m[2];
    document.getElementById('u4status').textContent = m[3];
    msgIdx++;
  }
}, 3000);

/* ─── Animated cursor position ─── */
const cursorPositions = ['Ln 12, Col 28', 'Ln 4, Col 18', 'Ln 12, Col 31', 'Ln 13, Col 9', 'Ln 12, Col 35'];
let cpIdx = 0;
setInterval(() => {
  document.getElementById('cursorPos').textContent = cursorPositions[cpIdx % cursorPositions.length];
  cpIdx++;
}, 2200);

/* ─── Init ─── */
renderEditor('js', null);