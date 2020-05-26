class Clock {
  constructor(id) {
    this.timezone = parseInt(document.getElementById(id).dataset.timezone);

    if (this.isDST(new Date())) {
      this.timezone += 1;
    }

    this.handSeconds = document.querySelector(`#${id} .hand.seconds`);
    this.handMinutes = document.querySelector(`#${id} .hand.minutes`);
    this.handHours = document.querySelector(`#${id} .hand.hours`);

    this.getTime();
    this.cycle();
  }

  isDST(now) {
    const jan = new Date(now.getFullYear(), 0, 1);
    const jul = new Date(now.getFullYear(), 6, 1);
    const dst = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

    return now.getTimezoneOffset() < dst;
  }

  draw(hours, minutes, seconds) {
    const drawSeconds = seconds / 60 * 360 + 90;
    const drawMinutes = minutes / 60 * 360 + 90;
    const drawHours = hours / 12 * 360 + 90;

    this.handSeconds.style.transform = `rotate(${drawSeconds}deg)`;
    this.handMinutes.style.transform = `rotate(${drawMinutes}deg)`;
    this.handHours.style.transform = `rotate(${drawHours}deg)`;

    // fix for animation bump on when clock hands hit zero
    if (drawSeconds === 444 || drawSeconds === 90) {
      this.handSeconds.style.transition = "all 0s ease 0s";
    } else {
      this.handSeconds.style.transition = "all 0.05s cubic-bezier(0, 0, 0.52, 2.51) 0s";
    }
  }

  getTime() {
    const now = new Date();

    const hours = now.getUTCHours() + this.timezone;
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    this.draw(hours, minutes, seconds);
  }

  cycle() {
    setInterval(this.getTime.bind(this), 1000);
  }}


new Clock('okinawa');
new Clock('seattle');
new Clock('amalfi');

// this is just a rough draft for some effects
// const shadowOkinawa = document.querySelector("#okinawa .shadow");
// const shadowSeattle = document.querySelector("#seattle .shadow");
// const shadowAmalfi = document.querySelector("#amalfi .shadow");

// const handleMouseMove = (event) => {
//   const percent = parseInt((100 * event.pageX) / window.innerWidth);
//   const drawShadow = (0.22 * percent) - 50;

//   shadowOkinawa.style.transform = `rotate(${drawShadow}deg)`;
//   shadowSeattle.style.transform = `rotate(${drawShadow}deg)`;
//   shadowAmalfi.style.transform = `rotate(${drawShadow}deg)`;
// };

// document.onmousemove = handleMouseMove;