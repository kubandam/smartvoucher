// Simple accordion behavior for detail page
(() => {
  const root = document.getElementById('voucher-accordion');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('.accordion-item'));

  function setOpen(item, open) {
    const content = item.querySelector('[data-acc-content]');
    if (!content) return;
    item.setAttribute('data-open', String(open));
    if (open) {
      content.removeAttribute('hidden');
    } else {
      content.setAttribute('hidden', '');
    }
  }

  items.forEach((item) => {
    const toggleEl = item.querySelector('[data-acc-toggle]');
    if (!toggleEl) return;
    toggleEl.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      setOpen(item, !isOpen);
    });
  });
})();


