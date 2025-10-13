// Quantity and Price Calculator
(() => {
  const VOUCHER_PRICE = 1842;
  const PACK_PRICES = {
    "e-voucher": 0,
    "plastic-card": 0,
    luxury: 249,
  };
  const DELIVERY_PRICES = {
    ppl: 99,
    cp: 85,
    luxury: 35,
  };

  // Elements
  const qtyInput = document.getElementById("qty-input");
  const qtyMinus = document.getElementById("qty-minus");
  const qtyPlus = document.getElementById("qty-plus");
  const summaryQtyDisplay = document.getElementById("summary-qty-display");
  const summaryQtyMinus = document.getElementById("summary-qty-minus");
  const summaryQtyPlus = document.getElementById("summary-qty-plus");
  const summaryTotal = document.getElementById("summary-total");
  const payButton = document.getElementById("pay-button");
  const summaryPackRow = document.getElementById("summary-pack-row");
  const summaryPackLabel = document.getElementById("summary-pack-label");
  const summaryPackPrice = document.getElementById("summary-pack-price");
  const summaryDeliveryRow = document.getElementById("summary-delivery-row");
  const summaryDeliveryPrice = document.getElementById("summary-delivery-price");

  const clamp = (v) => Math.max(1, parseInt(v || "1", 10));

  const formatPrice = (price) => `${price.toLocaleString("cs-CZ")} Kč`;

  const updateSummary = () => {
    const qty = clamp(qtyInput.value);
    const pack = document.querySelector('input[name="pack"]:checked')?.value || "e-voucher";
    const delivery = document.querySelector('input[name="delivery"]:checked')?.value || null;

    // Update quantity display
    summaryQtyDisplay.textContent = qty;

    // Calculate prices
    let total = VOUCHER_PRICE * qty;
    let packPrice = 0;
    let deliveryPrice = 0;

    const isLuxury = pack === "luxury";
    const isPlastic = pack === "plastic-card";

    // Pack line: only for luxury
    if (isLuxury) {
      packPrice = PACK_PRICES.luxury;
      summaryPackLabel.textContent = "Dárkové luxusní balení";
      summaryPackPrice.textContent = formatPrice(packPrice);
      summaryPackRow.style.display = "flex";
    } else if (isPlastic) {
      packPrice = PACK_PRICES["plastic-card"]; // 0 Kč
      summaryPackRow.style.display = "none";
    } else {
      packPrice = PACK_PRICES["e-voucher"]; // 0 Kč
      summaryPackRow.style.display = "none";
    }

    // Show/hide delivery row
    // Luxury: hide delivery, Plastic: show only when selected and priced, E-voucher: always hide
    if (isPlastic && delivery && DELIVERY_PRICES[delivery] !== undefined) {
      deliveryPrice = DELIVERY_PRICES[delivery];
      if (deliveryPrice >= 0) {
        summaryDeliveryPrice.textContent = formatPrice(deliveryPrice);
      }
    } else {
      deliveryPrice = 0;
      summaryDeliveryRow.hidden = true;
    }

    total += packPrice + deliveryPrice;

    // Update displays
    summaryTotal.textContent = formatPrice(total);
    payButton.textContent = `Zaplatit ${formatPrice(total)}`;

    // Update button states
    qtyMinus.disabled = qty <= 1;
    summaryQtyMinus.disabled = qty <= 1;
  };

  // Quantity controls - top section
  qtyMinus.addEventListener("click", () => {
    qtyInput.value = clamp(parseInt(qtyInput.value || "1", 10) - 1);
    updateSummary();
  });

  qtyPlus.addEventListener("click", () => {
    qtyInput.value = clamp(parseInt(qtyInput.value || "1", 10) + 1);
    updateSummary();
  });

  qtyInput.addEventListener("input", () => {
    qtyInput.value = clamp(qtyInput.value);
    updateSummary();
  });

  // Quantity controls - summary section (guard for pages without summary controls)
  if (summaryQtyMinus) {
    summaryQtyMinus.addEventListener("click", () => {
      qtyInput.value = clamp(parseInt(qtyInput.value || "1", 10) - 1);
      updateSummary();
    });
  }

  if (summaryQtyPlus) {
    summaryQtyPlus.addEventListener("click", () => {
      qtyInput.value = clamp(parseInt(qtyInput.value || "1", 10) + 1);
      updateSummary();
    });
  }

  // Listen to pack changes
  document.querySelectorAll('input[name="pack"]').forEach((radio) => {
    radio.addEventListener("change", updateSummary);
  });

  // Listen to delivery changes
  document.querySelectorAll('input[name="delivery"]').forEach((radio) => {
    radio.addEventListener("change", updateSummary);
  });

  // Initial update
  qtyInput.value = clamp(qtyInput.value);
  updateSummary();

  try {
    document
      .querySelectorAll('input[type="radio"][name="payment"]')
      .forEach((r) => {
        r.checked = false;
      });
    document
      .querySelectorAll('input[type="radio"][name="design"]')
      .forEach((r) => {
        r.checked = false;
      });
  } catch (_) {}

  try {
    const moreLink = document.getElementById("more-payments-link");
    const moreBlock = document.getElementById("more-payments");
    const lessLink = document.getElementById("less-payments-link");
    if (moreLink && moreBlock) {
      moreLink.addEventListener("click", (e) => {
        e.preventDefault();
        moreBlock.classList.remove("hidden");
        moreLink.classList.add("hidden");
        if (lessLink) lessLink.classList.remove("hidden");
      });
    }
    if (lessLink && moreBlock && moreLink) {
      lessLink.addEventListener("click", (e) => {
        e.preventDefault();
        moreBlock.classList.add("hidden");
        lessLink.classList.add("hidden");
        moreLink.classList.remove("hidden");
      });
    }
  } catch (_) {}

  // Company fields: show more / hide
  try {
    const toggleBtn = document.getElementById("company-form-more-toggle");
    const moreSection = document.getElementById("company-form-more");
    if (toggleBtn && moreSection) {
      toggleBtn.setAttribute("aria-controls", "company-form-more");
      toggleBtn.setAttribute("aria-expanded", "false");

      const LABELS = {
        show: "Zadat fakturační údaje",
        hide: "Skrýt fakturační údaje",
      };

      const setOpen = (open) => {
        toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
          moreSection.classList.remove("hidden");
          toggleBtn.textContent = LABELS.hide;
        } else {
          moreSection.classList.add("hidden");
          toggleBtn.textContent = LABELS.show;
        }
      };

      toggleBtn.addEventListener("click", () => {
        const open = toggleBtn.getAttribute("aria-expanded") === "true";
        setOpen(!open);
      });
    }
  } catch (_) {}
})();

// Minimal custom select
(() => {
  const root = document.getElementById("country-select");
  if (!root) return;
  const trigger = root.querySelector(".sv-select-trigger");
  const caret = root.querySelector(".sv-select-caret");
  const menu = root.querySelector(".sv-select-menu");
  const options = Array.from(root.querySelectorAll(".sv-select-option"));
  const hidden = root.querySelector('input[type="hidden"]');
  const label = root.querySelector(".sv-label");

  const setOpen = (value) => {
    root.dataset.open = value ? "true" : "false";
    trigger.setAttribute("aria-expanded", value ? "true" : "false");
  };

  const close = () => setOpen(false);
  const open = () => setOpen(true);

  trigger.addEventListener("click", () => {
    const isOpen = root.dataset.open === "true";
    setOpen(!isOpen);
  });

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      options.forEach((o) => o.classList.remove("is-selected"));
      opt.classList.add("is-selected");
      label.textContent = opt.textContent.trim();
      hidden.value = opt.dataset.value || "";
      close();
    });
  });

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) close();
  });
})();

(() => {
  const radios = document.querySelectorAll('input[name="send_to"]');
  const recipientBlock = document.getElementById("send-to-recipient");

  const render = () => {
    const val = document.querySelector('input[name="send_to"]:checked')?.value;
    if (!val) return;
    if (recipientBlock) recipientBlock.hidden = val !== "recipient";
  };

  radios.forEach((r) => r.addEventListener("change", render));
  render();
})();

// Pack selection - show/hide delivery forms on page load
(() => {
  const packRadios = document.querySelectorAll('input[name="pack"]');
  const deliveryPlasticCard = document.getElementById("delivery-form-plastic-card");
  const deliveryLuxury = document.getElementById("delivery-form-pack-luxury");

  const render = () => {
    const val = document.querySelector('input[name="pack"]:checked')?.value;
    if (!val) return;
    
    if (deliveryPlasticCard) deliveryPlasticCard.hidden = true;
    if (deliveryLuxury) deliveryLuxury.hidden = true;
    
    if (val === "plastic-card" && deliveryPlasticCard) {
      deliveryPlasticCard.hidden = false;
    } else if (val === "luxury" && deliveryLuxury) {
      deliveryLuxury.hidden = false;
    }
  };

  packRadios.forEach((r) => r.addEventListener("change", render));
  render();
})();
