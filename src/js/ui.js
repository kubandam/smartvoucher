// verification.html
(() => {
  // helpers
  const $ = (root, sel) => (root && root.querySelector ? root.querySelector(sel) : null);

  // root: card with code (contains form)
  const codeCard = document.querySelector('[data-code-form]');
  if (!codeCard) return;

  const form = $('[data-code-form]', '[data-verify-form]') || codeCard.querySelector('[data-verify-form]');
  const voucherInput = $('[data-code-form]', '[data-voucher-code]') || codeCard.querySelector('[data-voucher-code]');
  const submitBtn = $('[data-code-form]', '[data-submit]') || codeCard.querySelector('[data-submit]');
  const recaptchaWrap = codeCard.querySelector('[data-recaptcha]');
  const resultBlock = codeCard.querySelector('[data-verify-result]');

  // card with PIN
  const pinCard = document.querySelector('[data-pin-card]');
  const pinForm = pinCard?.querySelector('[data-pin-form]');
  const pinInput = pinCard?.querySelector('[data-pin-input]');
  const submitPinBtn = pinCard?.querySelector('[data-pin-submit]');

  // settings
  const PIN_LEN = parseInt(pinInput?.dataset.pinLength || '5', 10);
  const REDIRECT_URL = pinForm?.dataset.redirect || '/detail-voucher.html';

  // reCAPTCHA state on form
  const setRecaptchaState = (done) => {
    if (!form) return;
    form.dataset.recaptcha = done ? 'done' : 'pending';
  };

  // enable/disable submit
  const updateVerifyState = () => {
    if (!submitBtn) return;
    const hasVoucher = (voucherInput?.value?.trim().length || 0) > 0;
    const captchaOK = form?.dataset.recaptcha === 'done';
    const enabled = hasVoucher && captchaOK;

    submitBtn.disabled = !enabled;
    submitBtn.classList.toggle('is-enabled', enabled);
    submitBtn.classList.toggle('cursor-not-allowed', !enabled);
  };

  // reCAPTCHA callback - bound to data-callback in HTML
  window.onRecaptchaSuccess = () => {
    setRecaptchaState(true);
    updateVerifyState();
  };

  // init
  setRecaptchaState(false);
  updateVerifyState();

  voucherInput?.addEventListener('input', updateVerifyState);

  // SUBMIT code verification
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn?.disabled) return;

    // "success" verification: show pre-rendered result
    resultBlock?.classList.remove('hidden');

    // hide button and captcha
    submitBtn?.classList.add('hidden');
    recaptchaWrap?.classList.add('hidden');

    // events in result block - delegation
    resultBlock?.addEventListener('click', (ev) => {
      const btn = ev.target.closest('[data-btn-show-detail],[data-btn-check-another]');
      if (!btn) return;
      ev.preventDefault();

      // click on "Show detail" => open PIN card
      if (btn.hasAttribute('data-btn-show-detail')) {
        codeCard?.classList.add('hidden');
        pinCard?.classList.remove('hidden');
        if (pinInput) {
          pinInput.value = '';
          pinInput.focus();
        }
        if (submitPinBtn) {
          submitPinBtn.disabled = true;
          submitPinBtn.classList.remove('is-enabled');
          submitPinBtn.classList.add('cursor-not-allowed');
        }
      }

      // click on "Verify another voucher" => reset state
      if (btn.hasAttribute('data-btn-check-another')) {
        resultBlock?.classList.add('hidden');
        if (voucherInput) voucherInput.value = '';
        setRecaptchaState(false);
        try {
          if (window.grecaptcha) window.grecaptcha.reset();
        } catch (_) {}
        updateVerifyState();
        voucherInput?.focus();
        submitBtn?.classList.remove('hidden');
        recaptchaWrap?.classList.remove('hidden');

        // hide PIN card, show code card
        pinCard?.classList.add('hidden');
        codeCard?.classList.remove('hidden');
      }
    }, { once: true });
  });

  // PIN: enable submit only at correct length (data-pin-length)
  pinInput?.addEventListener('input', () => {
    if (!submitPinBtn) return;
    const len = (pinInput.value || '').trim().length;
    const ok = len === PIN_LEN;
    submitPinBtn.disabled = !ok;
    submitPinBtn.classList.toggle('is-enabled', ok);
    submitPinBtn.classList.toggle('cursor-not-allowed', !ok);
  });

  // SUBMIT PIN => redirect (data-redirect)
  pinForm?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (submitPinBtn?.disabled) return;
    window.location.href = REDIRECT_URL;
  });

})();

// buy.html
(() => {
  // Early return if we're not on the buy page
  if (!document.querySelector('[data-summary]')) return;
  
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const num = (v, d=0) => Number.isFinite(+v) ? +v : d;
  const fmt = (n) => `${n.toLocaleString('cs-CZ')} Kč`;

  // ---------- COUNTER (note) ----------
  const updateCounter = (input) => {
    const max = num(input.dataset.counterMax, 0);
    const out = $(input.dataset.counterTarget);
    if (!out) return;
    const len = input.value.length;
    out.textContent = max ? `${len}/${max} znaků` : `${len}`;
  };
  $$( '[data-counter-input]' ).forEach(el => {
    updateCounter(el);
    el.addEventListener('input', () => updateCounter(el));
  });

  // ---------- TOGGLES show/hide (more payments, company form, etc.) ----------
  const setHidden = (el, hidden) => { if (el) el.hidden = hidden; };
  const setCollapsed = (sel, open) => {
    const el = $(sel);
    if (!el) return;
    el.classList.toggle('hidden', !open);
    setHidden(el, !open);
  };

  document.addEventListener('click', (e) => {
    // data-action show/hide target
    const actEl = e.target.closest('[data-action][data-target]');
    if (actEl) {
      e.preventDefault();
      const target = actEl.dataset.target;
      if (!target) return;

      if (actEl.dataset.action === 'show') {
        setCollapsed(target, true);
        const siblingHide = document.querySelector(`[data-action="hide"][data-target="${target}"]`);
        actEl.classList.add('hidden');
        siblingHide?.classList.remove('hidden');
      }
      if (actEl.dataset.action === 'hide') {
        setCollapsed(target, false);
        const siblingShow = document.querySelector(`[data-action="show"][data-target="${target}"]`);
        actEl.classList.add('hidden');
        siblingShow?.classList.remove('hidden');
      }
    }

    // data-toggle (aria-expanded + text swap)
    const toggleBtn = e.target.closest('[data-toggle][data-target]');
    if (toggleBtn) {
      const target = $(toggleBtn.dataset.target);
      if (!target) return;
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', (!expanded).toString());
      target.classList.toggle('hidden', expanded);
      setHidden(target, expanded);
      if (toggleBtn.dataset.textOn && toggleBtn.dataset.textOff) {
        toggleBtn.textContent = expanded ? toggleBtn.dataset.textOff : toggleBtn.dataset.textOn;
      }
    }
  });

  // ---------- CUSTOM SELECT ----------
  $$( '[data-select]' ).forEach(root => {
    const trigger = $('[data-select-trigger]', root);
    const hidden = $('[data-select-value]', root);
    const label = $('[data-select-label]', root);
    const options = $$('[data-select-option]', root);

    const setOpen = (open) => {
      root.dataset.open = open ? 'true' : 'false';
      trigger?.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    trigger?.addEventListener('click', () => {
      const open = root.dataset.open === 'true';
      setOpen(!open);
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('is-selected'));
        opt.classList.add('is-selected');
        label && (label.textContent = opt.textContent.trim());
        hidden && (hidden.value = opt.dataset.value || '');
        setOpen(false);
      });
    });

    document.addEventListener('click', (ev) => {
      if (!root.contains(ev.target)) setOpen(false);
    });
  });

  // ---------- SEND TO (recipient block) ----------
  const recipientBlock = $('[data-recipient-block]');
  const renderRecipient = () => {
    console.log('renderRecipient');
    const sel = $('input[name="send_to"]:checked');
    if (!recipientBlock || !sel) return;
    setHidden(recipientBlock, sel.value !== 'recipient');
  };
  $$('input[name="send_to"][data-sendto]').forEach(r => r.addEventListener('change', renderRecipient));
  renderRecipient();

  // ---------- PACK - DELIVERY FORMS ----------
  const renderDeliveryForms = () => {
    const pack = $('input[name="pack"]:checked')?.value;
    
    // Reset ALL delivery options when pack changes
    $$('input[name="delivery"][data-delivery]').forEach(r => (r.checked = false));
    
    // Reset PPL parcelshop selections (text and hidden inputs)
    $$('[data-ppl-text]').forEach(el => {
      const optionId = el.dataset.pplText;
      // Reset to default text based on option type
      if (optionId === 'ppl-luxury') {
        el.textContent = 'Vyberte si PPL s poistením a prioritným spracovaním.';
      } else if (optionId === 'ppl-plastic') {
        el.textContent = 'Vyberte si místo doručení do PPL boxu';
      } else {
        el.textContent = 'Vyberte si PPL výdejné miesto.';
      }
      // Reset color to default
      el.style.color = '';
    });
    $$('[data-ppl-id]').forEach(input => (input.value = ''));
    
    $$('[data-delivery-form]').forEach(form => {
      const expects = form.dataset.visibleForPack;
      const show = expects === pack;
      form.classList.toggle('hidden', !show);
      setHidden(form, !show);
    });

    $$('[data-visible-for-pack]').forEach(el => {
      const expects = el.dataset.visibleForPack;
      const show = expects === pack;
      el.classList.toggle('hidden', !show);
      setHidden(el, !show);
    });
  };
  $$('input[name="pack"][data-pack]').forEach(r => r.addEventListener('change', renderDeliveryForms));
  renderDeliveryForms();

  // ---------- QTY + SUMMARY ----------
  const clamp = (v, min=1) => Math.max(min, num(v, min));

  const updateSummary = () => {
    const sRoot = $('[data-summary]') || document;
    const unitPriceBase =
      num(sRoot.dataset.unitPrice) || num($('[data-qty-root]')?.dataset.unitPrice) || 0;
  
    // qty
    const qtyInput = $('[data-qty-input]');
    const qtyMin = num(qtyInput?.dataset.qtyMin, 1);
    const qty = clamp(qtyInput?.value, qtyMin);
    if (qtyInput) qtyInput.value = qty;
  
    // pack
    const packRadio = $('input[name="pack"]:checked');
    const packVal = packRadio?.value || 'e-voucher';
    const packPrice = num(packRadio?.dataset.packPrice, 0);
    const isLuxury = packVal === 'luxury';
    const isPlastic = packVal === 'plastic-card';
  
    // delivery
    const delRadio = $('input[name="delivery"]:checked');
    const deliveryPrice = delRadio ? num(delRadio.dataset.deliveryPrice, 0) : 0;
  
    // --- calculate unit price (without delivery) ---
    const unitPriceFinal = unitPriceBase * qty;
    const unitPriceOut = $('[data-summary-unit-price]', sRoot);
    if (unitPriceOut) unitPriceOut.textContent = fmt(unitPriceFinal);
  
    // --- display quantity ---
    const qtyDisplay = $('[data-summary-qty-display]', sRoot);
    if (qtyDisplay) qtyDisplay.textContent = qty;
  
    // --- pack row ---
    const rowPack = $('[data-summary-pack-row]', sRoot);
    const rowPackLabel = $('[data-summary-pack-label]', sRoot);
    const rowPackPrice = $('[data-summary-pack-price]', sRoot);
    if (rowPack) {
      const showPack = isLuxury && packPrice > 0;
      rowPack.hidden = !showPack;
      rowPack.classList.toggle('hidden', !showPack);
      if (showPack) {
        if (rowPackLabel) rowPackLabel.textContent = 'Dárkové luxusní balení';
        if (rowPackPrice) rowPackPrice.textContent = fmt(packPrice);
      }
    }
  
    // --- delivery row ---
    const rowDel = $('[data-summary-delivery-row]', sRoot);
    const rowDelPrice = $('[data-summary-delivery-price]', sRoot);
    const showDelivery = !!delRadio && (isPlastic || isLuxury);
    if (rowDel) {
      rowDel.hidden = !showDelivery;
      rowDel.classList.toggle('hidden', !showDelivery);
      if (showDelivery && rowDelPrice) rowDelPrice.textContent = fmt(deliveryPrice);
    }
  
    // --- total (unit × qty + delivery) ---
    const total = unitPriceFinal + (showDelivery ? deliveryPrice : 0) + (isLuxury ? packPrice : 0);
    const totalOut = $('[data-summary-total]', sRoot);
    if (totalOut) totalOut.textContent = fmt(total);
  
    const payBtn = $('[data-pay-btn]');
    if (payBtn) payBtn.textContent = `Zaplatit ${fmt(total)}`;
  };
  
  

  // qty events
  document.addEventListener('click', (e) => {
    const dec = e.target.closest('[data-action="qty-dec"]');
    const inc = e.target.closest('[data-action="qty-inc"]');
    if (!dec && !inc) return;

    const input = $('[data-qty-input]');
    if (!input) return;
    const min = num(input.dataset.qtyMin, 1);
    const cur = clamp(input.value, min);
    input.value = dec ? Math.max(min, cur - 1) : cur + 1;
    updateSummary();
  });
  $('[data-qty-input]')?.addEventListener('input', updateSummary);

  // pack / delivery change => summary
  $$('input[name="pack"][data-pack]').forEach(r => r.addEventListener('change', () => { renderDeliveryForms(); updateSummary(); }));
  
  // Reset PPL selection when switching to non-PPL delivery option
  $$('input[name="delivery"][data-delivery]').forEach(r => r.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    
    // If user selects non-PPL option (e.g., "cp"), reset PPL data
    if (selectedValue !== 'ppl' && selectedValue !== 'luxury') {
      // Get current pack type to determine which PPL option to reset
      const pack = $('input[name="pack"]:checked')?.value;
      let pplOptionId = null;
      
      if (pack === 'plastic-card') {
        pplOptionId = 'ppl-plastic';
      } else if (pack === 'luxury') {
        pplOptionId = 'ppl-luxury';
      }
      
      if (pplOptionId) {
        const pplTextElement = $(`[data-ppl-text="${pplOptionId}"]`);
        const pplIdInput = $(`[data-ppl-id="${pplOptionId}"]`);
        
        if (pplTextElement) {
          // Reset text to default based on option type
          if (pplOptionId === 'ppl-luxury') {
            pplTextElement.textContent = 'Vyberte si PPL s poistením a prioritným spracovaním.';
          } else if (pplOptionId === 'ppl-plastic') {
            pplTextElement.textContent = 'Vyberte si místo doručení do PPL boxu';
          }
          // Reset color to default
          pplTextElement.style.color = '';
        }
        
        if (pplIdInput) {
          pplIdInput.value = '';
        }
      }
    }
    
    updateSummary();
  }));

  // design / payment default uncheck (if you want to start without selection)
  try {
    $$('input[type="radio"][name="payment"][data-payment]').forEach(r => r.checked = false);
    $$('input[type="radio"][name="design"][data-design]').forEach(r => r.checked = false);
  } catch(_) {}

  // init summary
  updateSummary();
})();

// generic modal (used in buy.html)
(() => {
  // Check if modals exist on this page
  if (!document.querySelector('[data-modal]')) return;
  
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const openModal = (root) => {
    if (!root) return;
    root.classList.remove('hidden');
    root.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  };

  const closeModal = (root) => {
    if (!root) return;
    root.classList.add('hidden');
    root.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    // open via trigger
    const opener = e.target.closest('[data-modal-open][data-modal-target]');
    if (opener) {
      e.preventDefault();
      const targetSel = opener.getAttribute('data-modal-target');
      const modal = $(targetSel);
      openModal(modal);
      return;
    }

    // close via button
    const closer = e.target.closest('[data-modal-close]');
    if (closer) {
      const modal = closer.closest('[data-modal]');
      closeModal(modal);
      return;
    }

    // close via overlay click
    const overlay = e.target.closest('[data-modal-overlay]');
    if (overlay) {
      closeModal(overlay.closest('[data-modal]'));
      return;
    }

    // close when clicking inside modal but outside content (e.g., centering wrapper)
    const modalRoot = e.target.closest('[data-modal]');
    if (modalRoot && !e.target.closest('[data-modal-content]')) {
      closeModal(modalRoot);
      return;
    }
  });

  // ESC key closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    $$( '[data-modal]' ).forEach(m => { if (!m.classList.contains('hidden')) closeModal(m); });
  });
})();

// PPL MAP MODAL
(() => {
  const modalElement = document.getElementById('ppl-parcelshop-map-modal');
  // Early return if PPL modal doesn't exist
  if (!modalElement) return;
  
  let currentPPLOptionId = null;
    
    // Function to CLOSE Modal
    function closePPLModal() {
        if (modalElement) {
            modalElement.classList.add('hidden');
            modalElement.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }

    // 1. Save active option on click
    document.querySelectorAll('[data-delivery-option-id]').forEach(label => {
        label.addEventListener('click', (event) => {
            currentPPLOptionId = label.getAttribute('data-delivery-option-id');
            const targetId = label.getAttribute('data-modal-target');

            // --- CUSTOM LOGIC FOR OPENING MODAL ---
            if (targetId && modalElement) {
                // 1. Select radio button
                const radioButton = label.querySelector('input[type="radio"]');
                if (radioButton) {
                    radioButton.checked = true;
                    radioButton.dispatchEvent(new Event('change', { bubbles: true }));
                }

                // 2. Open modal
                modalElement.classList.remove('hidden');
                modalElement.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';

                if (window.PPL && window.PPL.map && typeof window.PPL.map.resize === 'function') {
                    setTimeout(() => {
                        window.PPL.map.resize();
                    }, 50); 
                }
            }
        });
    });
    
    // On click on close button
    const closeBtn = document.querySelector('[data-modal-close]');
    const overlayEl = document.querySelector('.sv-modal-overlay');
    
    if (closeBtn) closeBtn.addEventListener('click', closePPLModal);
    if (overlayEl) overlayEl.addEventListener('click', closePPLModal);


    // 2. Process data from PPL Widget
    document.addEventListener("ppl-parcelshop-map", (event) => {
        const parcelshop = event.detail;
        
        if (!currentPPLOptionId || !parcelshop) {
            console.error("Chyba: Dáta z PPL widgetu sú neúplné.");
            return;
        }

        const pplTextElement = document.querySelector(`[data-ppl-text="${currentPPLOptionId}"]`);
        const pplIdInputElement = document.querySelector(`[data-ppl-id="${currentPPLOptionId}"]`);
        
        // Find the label with the matching data-delivery-option-id
        const label = document.querySelector(`[data-delivery-option-id="${currentPPLOptionId}"]`);
        const targetRadioButton = label ? label.querySelector('input[type="radio"][name="delivery"]') : null;
        
        if (pplIdInputElement && pplTextElement && targetRadioButton) {
            
            const parcelshopId = parcelshop.id || parcelshop.code;
            pplIdInputElement.value = parcelshopId;

            const zip = parcelshop.zip || parcelshop.zipCode || parcelshop.postalCode || '';
            const address = `${parcelshop.street}, ${zip}, ${parcelshop.city}`;
            pplTextElement.textContent = `Vybrané miesto: ${parcelshop.name} (${address})`;
            
            // Highlight selected location with brand color
            pplTextElement.style.color = 'var(--brand)';

            targetRadioButton.checked = true;
            targetRadioButton.dispatchEvent(new Event('change', { bubbles: true }));

            closePPLModal();
        } else {
            console.error(`Chyba: Nenašli sa všetky cieľové prvky pre možnosť ${currentPPLOptionId}.`);
        }
        
        currentPPLOptionId = null;
    });
})();

// Language Selector
(() => {
    const langSelector = document.querySelector('[data-lang-selector]');
    if (!langSelector) return;
    
    const trigger = langSelector.querySelector('[data-lang-trigger]');
    const dropdown = langSelector.querySelector('[data-lang-dropdown]');
    const currentLangSpan = langSelector.querySelector('[data-lang-current]');
    const options = langSelector.querySelectorAll('.lang-selector-option');
    
    // Toggle dropdown when clicking trigger
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelector.classList.toggle('is-open');
    });
    
    // Handle language selection
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const selectedLang = option.dataset.lang;
            const selectedText = option.textContent;
            
            // Update active state
            options.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update trigger text
            currentLangSpan.textContent = selectedText;
            
            // Close dropdown
            langSelector.classList.remove('is-open');
            
            console.log('Selected language:', selectedLang);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langSelector.contains(e.target)) {
            langSelector.classList.remove('is-open');
        }
    });
})();

