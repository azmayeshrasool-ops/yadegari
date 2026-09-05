// شروع شمارش: اولین پیام ساعت ۸:۳۶ عصر، ۱۴ شهریور ۱۴۰۵ (به‌وقت تهران، UTC+3:30)
// ۲۰:۳۶ +۰۳:۳۰  ->  ۱۷:۰۶:۰۰Z
const ACQUIRED = new Date(Date.UTC(2026, 8, 5, 17, 6, 0));

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const diffMs = Math.max(0, Date.now() - ACQUIRED.getTime());
  const total = Math.floor(diffMs / 1000);

  els.days.textContent = pad(Math.floor(total / 86400));
  els.hours.textContent = pad(Math.floor((total % 86400) / 3600));
  els.minutes.textContent = pad(Math.floor((total % 3600) / 60));
  els.seconds.textContent = pad(total % 60);
}

tick();
setInterval(tick, 1000);

/* ---------- کاروسل عکس‌ها ---------- */

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersianDigits(n) {
  return String(n).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

const IMAGES = ["1.png", "2.png", "3.png", "4.png"];
const ORDINALS = ["اول", "دوم", "سوم", "چهارم"];

const carImg = document.getElementById("carImg");
const carCount = document.getElementById("carCount");
let current = 0;

function show(i) {
  current = (i + IMAGES.length) % IMAGES.length;
  carImg.src = IMAGES[current];
  carImg.alt = `عکس یادگاری ${ORDINALS[current]}`;
  carCount.textContent = `${toPersianDigits(current + 1)} / ${toPersianDigits(IMAGES.length)}`;
}

document.getElementById("carPrev").addEventListener("click", () => show(current - 1));
document.getElementById("carNext").addEventListener("click", () => show(current + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") show(current + 1);
  else if (e.key === "ArrowLeft") show(current - 1);
});

show(0);
