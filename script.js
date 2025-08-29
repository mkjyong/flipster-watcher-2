(function () {
  const donuts = document.querySelectorAll('.donut');
  donuts.forEach((el) => {
    const current = parseFloat(el.getAttribute('data-current') || '0');
    const cap = parseFloat(el.getAttribute('data-cap') || '1');
    const ratio = Math.max(0, Math.min(1, current / cap));
    const percent = (ratio * 100).toFixed(2) + '%';
    el.style.setProperty('--percent', percent);
  });
})();


// Insert KRW conversion under the main hero amount using 1 USD = 1,400 KRW
(function () {
  const USD_TO_KRW = 1400;
  const heroAmountElement = document.querySelector('.hero-amount');
  if (!heroAmountElement) return;

  const rawText = heroAmountElement.textContent || '';
  const numericText = rawText.replace(/[^0-9.]/g, '');
  const usdtAmount = Number(numericText);
  if (Number.isNaN(usdtAmount)) return;

  const krwValue = usdtAmount * USD_TO_KRW;
  const formattedKrw = new Intl.NumberFormat('ko-KR').format(Math.round(krwValue));

  const krwElement = document.createElement('p');
  krwElement.className = 'hero-krw';
  krwElement.textContent = `약 ${formattedKrw}원 (1달러=1,400원 기준)`;

  const parent = heroAmountElement.parentElement;
  const heroSub = document.querySelector('.hero-sub');
  if (parent) {
    if (heroSub && heroSub.parentElement === parent) {
      parent.insertBefore(krwElement, heroSub);
    } else {
      parent.appendChild(krwElement);
    }
  }
})();

