function startTypewriterLoop(options) {
  const target =
    options.targetElement ||
    document.getElementById(options.targetId || "demo");
  if (!target) return;

  const items = Array.isArray(options.items) ? options.items : [];
  if (items.length === 0) return;

  const typeSpeed = options.typeSpeed || 45;
  const deleteSpeed = options.deleteSpeed || 25;
  const holdAfterType = options.holdAfterType || 900;
  const holdAfterDelete = options.holdAfterDelete || 250;

  let itemIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = items[itemIndex];

    if (!isDeleting) {
      charIndex += 1;
      target.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, holdAfterType);
        return;
      }

      setTimeout(tick, typeSpeed);
      return;
    }

    charIndex -= 1;
    target.textContent = current.slice(0, Math.max(0, charIndex));

    if (charIndex === 0) {
      isDeleting = false;
      itemIndex = (itemIndex + 1) % items.length;
      setTimeout(tick, holdAfterDelete);
      return;
    }

    setTimeout(tick, deleteSpeed);
  }

  target.textContent = "";
  tick();
}
