/* Best Cars 254 — site-wide inquiry modal.
   Opens the full inquiry form as an overlay (no page navigation).
   Triggered ONLY for model-specific inquiries: model-card "Request Options"
   buttons and any element with [data-inquiry] (which carry a vehicle model).
   General "contact.html" buttons navigate to the contact page (form) instead.
   WhatsApp buttons are left untouched.
   Form fields reuse the page's existing .cp-form* design-system CSS. */
(function () {
  if (window.__bcInquiryModal) return;
  window.__bcInquiryModal = true;

  /* ---- modal chrome styles (form fields styled by page CSS) ---- */
  var css =
    '.im-backdrop{position:fixed;inset:0;z-index:1000;display:none;align-items:flex-start;justify-content:center;padding:4vh 16px;overflow-y:auto;background:rgba(20,18,16,.55);opacity:0;transition:opacity .25s ease}' +
    '.im-backdrop.im-open{display:flex;opacity:1}' +
    'body.im-lock{overflow:hidden}' +
    '.im-dialog{position:relative;background:var(--bg-surface,#fff);width:100%;max-width:640px;margin:0 auto;border-radius:16px;box-shadow:0 30px 90px rgba(0,0,0,.4);transform:translateY(14px) scale(.985);transition:transform .25s ease}' +
    '.im-backdrop.im-open .im-dialog{transform:none}' +
    '.im-head{padding:32px 34px 4px}' +
    '.im-head .im-eyebrow{display:inline-block;font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--accent,#b08d57);margin-bottom:10px}' +
    '.im-head h2{font-family:var(--serif,Georgia,serif);font-size:26px;line-height:1.2;margin:0 0 6px;color:var(--text-primary,#1a1a1a)}' +
    '.im-head p{font-family:var(--sans);font-size:14px;color:var(--text-muted,#666);margin:0;line-height:1.55}' +
    '.im-model{display:none;margin:16px 34px 0;padding:11px 15px;border:1px solid var(--border-subtle,#e5e3dd);border-radius:10px;background:var(--bg-secondary,#f7f5f0);font-family:var(--sans);font-size:14px;color:var(--text-primary,#1a1a1a)}' +
    '.im-model strong{color:var(--accent,#b08d57);font-weight:600}' +
    '.im-body{padding:18px 34px 32px}' +
    '.im-close{position:absolute;top:16px;right:16px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:none;background:rgba(0,0,0,.06);border-radius:50%;cursor:pointer;color:#333;transition:background .2s;z-index:2}' +
    '.im-close:hover{background:rgba(0,0,0,.12)}' +
    '.im-body .cp-form select{width:100%;background:var(--bg-surface,#fff);border:1px solid var(--border-subtle,#e5e3dd);color:var(--text-primary,#1a1a1a);padding:14px 44px 14px 16px;border-radius:var(--radius-btn,10px);font-family:var(--sans);font-size:16px;outline:none;box-sizing:border-box;min-height:52px;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center}' +
    '.im-body .cp-form select:focus{border-color:var(--accent,#b08d57);box-shadow:0 0 0 3px var(--accent-15,rgba(176,141,87,.15))}' +
    '@media(max-width:560px){.im-head{padding:26px 20px 2px}.im-head h2{font-size:22px}.im-body{padding:14px 20px 24px}.im-model{margin-left:20px;margin-right:20px}.im-dialog{border-radius:14px}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---- form markup (mirrors the detail-page inquiry form) ---- */
  var formHTML =
    '<form id="im-form" class="cp-form" novalidate>' +
      '<input type="hidden" name="access_key" value="4848df2e-42c1-448a-afcf-14a50f017425">' +
      '<input type="hidden" name="subject" id="im-subject" value="Inquiry: Best Cars 254 website">' +
      '<input type="hidden" name="from_name" value="Best Cars 254 website">' +
      '<input type="hidden" name="action_needed" value="Engage on WhatsApp within 2 hours. Send 10+ real photos of available units matching customer criteria + personalized quote with total landed cost.">' +
      '<input type="hidden" name="lead_score" value="MEDIUM (site-wide inquiry modal)">' +
      '<input type="hidden" name="page_url" id="im-page-url" value="">' +
      '<input type="hidden" name="submitted_at" id="im-submitted-at" value="">' +
      '<div class="cp-form-row-2">' +
        '<div class="cp-form-row"><label for="im-name">Full name</label><input type="text" name="name" id="im-name" placeholder="Your full name" required></div>' +
        '<div class="cp-form-row"><label for="im-city">City</label><input type="text" name="city" id="im-city" placeholder="Nairobi, Mombasa, Kisumu" required></div>' +
      '</div>' +
      '<div class="cp-form-row-2">' +
        '<div class="cp-form-row"><label for="im-phone">WhatsApp number</label><input type="tel" name="phone" id="im-phone" value="+254 " placeholder="+254 7XX XXX XXX" required></div>' +
        '<div class="cp-form-row"><label for="im-email">Email address <span class=\'cp-form-hint\'>optional</span></label><input type="email" name="email" id="im-email" placeholder="your@email.com"></div>' +
      '</div>' +
      '<div class="cp-form-row-2">' +
        '<div class="cp-form-row"><label for="im-vehicle-type">Vehicle type <span class=\'cp-form-hint\'>optional</span></label><select name="vehicle_type" id="im-vehicle-type"><option value="">Select a type</option><option value="SUV / 4x4">SUV / 4x4</option><option value="Compact / Hatchback">Compact / Hatchback</option><option value="Sedan">Sedan</option><option value="Station Wagon">Station Wagon</option><option value="Minivan / 7–8 seater">Minivan / 7–8 seater</option><option value="Pickup / Double cab">Pickup / Double cab</option><option value="Kei car (small &amp; economical)">Kei car (small &amp; economical)</option><option value="Luxury / Premium">Luxury / Premium</option><option value="Sports / Coupe">Sports / Coupe</option><option value="Bus / Lorry (commercial)">Bus / Lorry (commercial)</option><option value="Not sure / Other">Not sure / Other</option></select></div>' +
        '<div class="cp-form-row"><label for="im-model-of-interest">Model of interest <span class=\'cp-form-hint\'>optional</span></label><select name="model_of_interest" id="im-model-of-interest"><option value="General inquiry (no specific model)">General inquiry / not sure</option><optgroup label="Audi"><option value="Audi Q3">Audi Q3</option><option value="Audi Q5">Audi Q5</option></optgroup><optgroup label="BMW"><option value="BMW X3">BMW X3</option><option value="BMW X5">BMW X5</option></optgroup><optgroup label="Bentley"><option value="Bentley Bentayga">Bentley Bentayga</option></optgroup><optgroup label="Honda"><option value="Honda Vezel">Honda Vezel</option></optgroup><optgroup label="Jeep"><option value="Jeep Wrangler">Jeep Wrangler</option></optgroup><optgroup label="Land Rover"><option value="Land Rover Defender">Land Rover Defender</option><option value="Land Rover Discovery">Land Rover Discovery</option><option value="Land Rover Range Rover">Land Rover Range Rover</option></optgroup><optgroup label="Lexus"><option value="Lexus LX 600">Lexus LX 600</option><option value="Lexus NX">Lexus NX</option></optgroup><optgroup label="Mazda"><option value="Mazda CX-3">Mazda CX-3</option><option value="Mazda CX-5">Mazda CX-5</option><option value="Mazda CX-8">Mazda CX-8</option></optgroup><optgroup label="Mercedes-Benz"><option value="Mercedes-Benz C200">Mercedes-Benz C200</option><option value="Mercedes-Benz E250 Coupe">Mercedes-Benz E250 Coupe</option><option value="Mercedes-Benz E350">Mercedes-Benz E350</option><option value="Mercedes-Benz G-Class">Mercedes-Benz G-Class</option><option value="Mercedes-Benz GLC">Mercedes-Benz GLC</option><option value="Mercedes-Benz GLC Coupe">Mercedes-Benz GLC Coupe</option><option value="Mercedes-Benz GLE">Mercedes-Benz GLE</option><option value="Mercedes-Benz GLS">Mercedes-Benz GLS</option><option value="Mercedes-Benz V220">Mercedes-Benz V220</option></optgroup><optgroup label="Nissan"><option value="Nissan X-Trail">Nissan X-Trail</option></optgroup><optgroup label="Peugeot"><option value="Peugeot 3008">Peugeot 3008</option></optgroup><optgroup label="Porsche"><option value="Porsche Cayenne">Porsche Cayenne</option><option value="Porsche Macan">Porsche Macan</option></optgroup><optgroup label="Range Rover"><option value="Range Rover Evoque">Range Rover Evoque</option><option value="Range Rover Sport">Range Rover Sport</option><option value="Range Rover Velar">Range Rover Velar</option></optgroup><optgroup label="Subaru"><option value="Subaru Forester">Subaru Forester</option></optgroup><optgroup label="Toyota"><option value="Toyota Harrier">Toyota Harrier</option><option value="Toyota Hilux GR Sport">Toyota Hilux GR Sport</option><option value="Toyota Land Cruiser 250">Toyota Land Cruiser 250</option><option value="Toyota Land Cruiser 300">Toyota Land Cruiser 300</option><option value="Toyota Land Cruiser 70">Toyota Land Cruiser 70</option><option value="Toyota Land Cruiser Prado">Toyota Land Cruiser Prado</option><option value="Toyota RAV4">Toyota RAV4</option></optgroup><optgroup label="Volkswagen"><option value="Volkswagen Golf GTI">Volkswagen Golf GTI</option><option value="Volkswagen Tiguan">Volkswagen Tiguan</option></optgroup><optgroup label="Volvo"><option value="Volvo XC40">Volvo XC40</option><option value="Volvo XC60">Volvo XC60</option><option value="Volvo XC90">Volvo XC90</option></optgroup></select></div>' +
      '</div>' +
      '<div class="cp-form-row"><label>Year of manufacture <span class="cp-form-hint">pick one or more</span></label>' +
        '<div class="cp-check-grid">' +
          '<label class="cp-check-opt"><input type="checkbox" name="years" value="2019"> 2019</label>' +
          '<label class="cp-check-opt"><input type="checkbox" name="years" value="2020"> 2020</label>' +
          '<label class="cp-check-opt"><input type="checkbox" name="years" value="2021"> 2021</label>' +
          '<label class="cp-check-opt"><input type="checkbox" name="years" value="2022"> 2022</label>' +
          '<label class="cp-check-opt"><input type="checkbox" name="years" value="2023"> 2023</label>' +
          '<label class="cp-check-opt"><input type="checkbox" name="years" value="2024"> 2024</label>' +
          '<label class="cp-check-opt"><input type="checkbox" name="years" value="2025"> 2025</label>' +
        '</div></div>' +
      '<div class="cp-form-row"><label for="im-budget">Your budget in KSh <span class=\'cp-form-hint\'>optional</span></label><select name="budget_ksh" id="im-budget"><option value="">Select a budget</option><option value="Up to KSh 3M">Up to KSh 3M</option><option value="Up to KSh 5M">Up to KSh 5M</option><option value="Up to KSh 7M">Up to KSh 7M</option><option value="Up to KSh 10M">Up to KSh 10M</option><option value="Up to KSh 20M">Up to KSh 20M</option><option value="Other">Other</option></select></div>' +
      '<div class="cp-form-row"><label>Maximum mileage</label>' +
        '<div class="cp-radio-group">' +
          '<label class="cp-radio-opt"><input type="radio" name="max_mileage" value="Under 50,000 km"> Under 50,000 km</label>' +
          '<label class="cp-radio-opt"><input type="radio" name="max_mileage" value="Under 100,000 km"> Under 100,000 km</label>' +
          '<label class="cp-radio-opt"><input type="radio" name="max_mileage" value="Under 150,000 km"> Under 150,000 km</label>' +
          '<label class="cp-radio-opt"><input type="radio" name="max_mileage" value="Under 200,000 km"> Under 200,000 km</label>' +
          '<label class="cp-radio-opt"><input type="radio" name="max_mileage" value="No limit"> No limit</label>' +
        '</div></div>' +
      '<div class="cp-form-row-2">' +
        '<div class="cp-form-row"><label>Fuel preference <span class="cp-form-hint">optional</span></label>' +
          '<div class="cp-radio-group">' +
            '<label class="cp-radio-opt"><input type="radio" name="fuel_preference" value="Petrol"> Petrol</label>' +
            '<label class="cp-radio-opt"><input type="radio" name="fuel_preference" value="Diesel"> Diesel</label>' +
            '<label class="cp-radio-opt"><input type="radio" name="fuel_preference" value="Hybrid"> Hybrid</label>' +
            '<label class="cp-radio-opt"><input type="radio" name="fuel_preference" value="Any"> Any</label>' +
          '</div></div>' +
        '<div class="cp-form-row"><label>Transmission <span class="cp-form-hint">optional</span></label>' +
          '<div class="cp-radio-group">' +
            '<label class="cp-radio-opt"><input type="radio" name="transmission_pref" value="Automatic"> Automatic</label>' +
            '<label class="cp-radio-opt"><input type="radio" name="transmission_pref" value="Manual"> Manual</label>' +
            '<label class="cp-radio-opt"><input type="radio" name="transmission_pref" value="Any"> Any</label>' +
          '</div></div>' +
      '</div>' +
      '<div class="cp-form-row"><label for="im-message">Anything else? <span class="cp-form-hint">optional</span></label><textarea name="message" id="im-message" placeholder="Color, delivery timeline, financing questions."></textarea></div>' +
      '<button type="submit" class="cp-form-submit" id="im-submit">Send inquiry</button>' +
      '<p class="cp-form-error" id="im-error">Something went wrong. Please try again.</p>' +
      '<p class="cp-form-privacy">Your information is private and never shared.</p>' +
    '</form>' +
    '<div class="cp-form-success" id="im-success">' +
      '<div class="success-check"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2E7D5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>' +
      '<h3>Got it. We’ll be in touch.</h3>' +
      '<p id="im-success-msg">Our Sales Team will message you on WhatsApp with available units.</p>' +
    '</div>';

  /* ---- build modal ---- */
  var bd = document.createElement('div');
  bd.className = 'im-backdrop';
  bd.setAttribute('role', 'dialog');
  bd.setAttribute('aria-modal', 'true');
  bd.setAttribute('aria-label', 'Request vehicle options');
  bd.innerHTML =
    '<div class="im-dialog">' +
      '<button class="im-close" type="button" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>' +
      '<div class="im-head"><span class="im-eyebrow">Request private options</span><h2>Tell us what you’re looking for</h2><p>Share your requirements and our Kenya team sends matching real vehicle options with a CFR Mombasa quotation, privately.</p></div>' +
      '<div class="im-body">' + formHTML + '</div>' +
    '</div>';
  document.body.appendChild(bd);

  var dialog   = bd.querySelector('.im-dialog');
  var form     = bd.querySelector('#im-form');
  var success  = bd.querySelector('#im-success');
  var lastFocus = null;

  function openModal(model) {
    /* reset to a fresh form each open */
    form.style.display = '';
    success.classList.remove('show');
    var btn = bd.querySelector('#im-submit');
    btn.disabled = false; btn.textContent = 'Send inquiry';
    bd.querySelector('#im-error').classList.remove('show');

    var mSel = bd.querySelector('#im-model-of-interest');
    var oldTmp = mSel.querySelector('option[data-temp]');
    if (oldTmp) oldTmp.remove();
    if (model) {
      var has = false, mi;
      for (mi = 0; mi < mSel.options.length; mi++) { if (mSel.options[mi].value === model) { has = true; break; } }
      if (!has) {
        var o = document.createElement('option');
        o.value = model; o.textContent = model; o.setAttribute('data-temp', '1');
        mSel.insertBefore(o, mSel.options[1] || null);
      }
      mSel.value = model;
      bd.querySelector('#im-subject').value = 'Inquiry: ' + model + '. Best Cars 254 website';
      bd.querySelector('#im-success-msg').textContent = 'Our Sales Team will message you on WhatsApp with available ' + model + ' units.';
    } else {
      mSel.selectedIndex = 0;
      bd.querySelector('#im-subject').value = 'Inquiry: General. Best Cars 254 website';
      bd.querySelector('#im-success-msg').textContent = 'Our Sales Team will message you on WhatsApp with matching available units.';
    }
    bd.querySelector('#im-page-url').value = window.location.href;
    bd.querySelector('#im-submitted-at').value = new Date().toISOString();

    lastFocus = document.activeElement;
    bd.classList.add('im-open');
    document.body.classList.add('im-lock');
    var first = bd.querySelector('#im-name');
    if (first) setTimeout(function () { first.focus(); }, 60);
  }

  function closeModal() {
    bd.classList.remove('im-open');
    document.body.classList.remove('im-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---- close interactions ---- */
  bd.querySelector('.im-close').addEventListener('click', closeModal);
  bd.addEventListener('mousedown', function (e) { if (e.target === bd) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bd.classList.contains('im-open')) closeModal();
  });

  /* ---- open triggers ---- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('a.mc-btn-details, [data-inquiry]');
    if (!t || bd.contains(t)) return;
    e.preventDefault();
    var model = '';
    var card = t.closest('.model-card');
    if (t.hasAttribute('data-model')) {
      model = t.getAttribute('data-model');
    } else if (card) {
      var ti = card.querySelector('.mc-title');
      if (ti) model = ti.textContent.trim();
    } else {
      var mo = document.querySelector('input[name="model_of_interest"]');
      if (mo && mo.value) model = mo.value;
    }
    openModal(model);
  });

  /* ---- submit (Web3Forms, urlencoded) ---- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = bd.querySelector('#im-submit');
    var err = bd.querySelector('#im-error');
    err.classList.remove('show');
    var reqs = [['im-name', 'your full name'], ['im-city', 'your city']];
    for (var ri = 0; ri < reqs.length; ri++) {
      var rel = bd.querySelector('#' + reqs[ri][0]);
      if (!rel.value.trim()) { err.textContent = 'Please enter ' + reqs[ri][1] + '.'; err.classList.add('show'); rel.focus(); return; }
    }
    var phEl = bd.querySelector('#im-phone');
    if (phEl.value.replace(/\D/g, '').length < 9) { err.textContent = 'Please enter a valid phone number.'; err.classList.add('show'); phEl.focus(); return; }
    var emv = bd.querySelector('#im-email').value.trim();
    if (emv && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emv)) { err.textContent = 'Please enter a valid email address (or leave it blank).'; err.classList.add('show'); bd.querySelector('#im-email').focus(); return; }
    if (form.querySelectorAll('input[name="years"]:checked').length === 0) {
      err.textContent = 'Please pick at least one year of manufacture.';
      err.classList.add('show');
      return;
    }
    btn.disabled = true; btn.textContent = 'Sending...';
    var fd = new FormData(form);
    var params = new URLSearchParams();
    fd.forEach(function (v, k) { params.append(k, v); });
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
      .then(function (r) {
        if (r.ok) return r.json().catch(function () { return { success: true }; });
        return r.json().catch(function () { return { success: false, message: 'HTTP ' + r.status }; });
      })
      .then(function (d) {
        if (d.success) {
          form.style.display = 'none';
          success.classList.add('show');
          if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: bd.querySelector('#im-model-of-interest').value });
        } else {
          err.textContent = 'Something went wrong. ' + (d.message || 'Please try again.');
          err.classList.add('show');
          btn.disabled = false; btn.textContent = 'Send inquiry';
        }
      })
      .catch(function () {
        err.textContent = 'Network error. Please try again or message us on WhatsApp.';
        err.classList.add('show');
        btn.disabled = false; btn.textContent = 'Send inquiry';
      });
  });
})();
