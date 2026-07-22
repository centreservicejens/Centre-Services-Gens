const closeBtn = document.querySelector('.close-btn');
const backWindow = document.querySelector('.face.back');

closeBtn.addEventListener('click', () => {
    backWindow.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function() {
        const showBtn = document.getElementById('show-btn');
        const ele = document.getElementsByClassName('back');
        showBtn.addEventListener('click', function() {
            ele.style.display = 'block';
        });

});

// js bach nzid activity jdida b dynamique men kul waqt
  const container = document.getElementById('activities-container');

  function addActivity({ icon = '✨', title = 'نشاط جديد', desc = '', duration = '', place = '' }) {
    const card = document.createElement('div');
    card.className = 'activity';
    card.innerHTML = `
      <span class="icon">${icon}</span>
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="meta">
        <span>⏱ ${duration}</span>
        <span>📍 ${place}</span>
      </div>
    `;
    container.appendChild(card);
  }

  function scrollToSection(id){
    document.getElementById(id).scrollIntoView({ behavior:'smooth' });
    document.getElementById('navLinks').classList.remove('open');
  }

  document.getElementById('burgerBtn').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // js bach nzid activity jdida b dynamique
  function addActivity({ icon = '✨', title = 'نشاط جديد', desc = '', duration = '', place = '' }) {
    const container = document.getElementById('activities-container');
    const card = document.createElement('div');
    card.className = 'activity';
    card.innerHTML = `
      <span class="icon">${icon}</span>
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="meta">
        <span>⏱ ${duration}</span>
        <span>📍 ${place}</span>
      </div>
    `;
    container.appendChild(card);
  }

  // js bach nzid worker jdid b dynamique
  function addWorker({ initial = 'A', name = 'اسم العامل', role = '', desc = '' }) {
    const container = document.getElementById('workers-container');
    const card = document.createElement('div');
    card.className = 'worker';
    card.innerHTML = `
      <div class="avatar">${initial}</div>
      <h3>${name}</h3>
      <div class="role">${role}</div>
      <p>${desc}</p>
    `;
    container.appendChild(card);
  }

   const workWindow = document.getElementById('work-window');
  document.getElementById('show-btn').addEventListener('click', () => {
    workWindow.style.display = 'block';
  });
  document.getElementById('close-btn').addEventListener('click', () => {
    workWindow.style.display = 'none';
  });

  const whoareweCard = document.getElementById('whoareweCard');
document.getElementById('show-btn').addEventListener('click', () => whoareweCard.classList.add('flipped'));
document.getElementById('close-btn').addEventListener('click', () => whoareweCard.classList.remove('flipped'));
