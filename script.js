let hpPlayer = 5;
let hpEnemy = 5;
let senjataTerpilih = { nama: "", damage: 0 };

function updateStatus() {
  document.getElementById("hpPlayer").innerText = hpPlayer;
  document.getElementById("hpEnemy").innerText = hpEnemy;
}

function pilihSenjata(nama, damage) {
  senjataTerpilih = { nama, damage };
  log(`Kamu memilih ${nama} dengan damage ${damage}.`);
  document.getElementById("weapon-choice").style.display = "none";
  document.getElementById("nextTurn").style.display = "inline-block";
}

function tembakan() {
  return Math.random() < 0.7 ? "Kena!" : "Meleset!";
}

function log(pesan) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += `<p>${pesan}</p>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}

function nextTurn() {
  // Pemain Menembak
  let hasil = tembakan();
  if (hasil === "Kena!") {
    hpEnemy -= senjataTerpilih.damage;
    log(`Kamu menembak dengan ${senjataTerpilih.nama}... ${hasil}! (Damage: ${senjataTerpilih.damage})`);
  } else {
    log(`Kamu menembak dengan ${senjataTerpilih.nama}... ${hasil}!`);
  }

  if (hpEnemy <= 0) {
    log("Selamat! Kamu menang!");
    endGame();
    return;
  }

  // Giliran Musuh
  setTimeout(() => {
    let senjataMusuh = pilihSenjataAcak();
    let hasilMusuh = tembakan();
    if (hasilMusuh === "Kena!") {
      hpPlayer -= senjataMusuh.damage;
      log(`Musuh menembak dengan ${senjataMusuh.nama}... ${hasilMusuh}! (Damage: ${senjataMusuh.damage})`);
    } else {
      log(`Musuh menembak dengan ${senjataMusuh.nama}... ${hasilMusuh}!`);
    }

    if (hpPlayer <= 0) {
      log("Kamu kalah... Musuh lebih cepat darimu.");
      endGame();
      return;
    }

    // Cek Power-up
    if (munculPowerUp()) {
      hpPlayer += 1;
      log("Power-up muncul! Nyawamu bertambah 1.");
    }

    // Reset untuk giliran berikutnya
    document.getElementById("weapon-choice").style.display = "block";
    document.getElementById("nextTurn").style.display = "none";
    updateStatus();
  }, 1000);
}

function pilihSenjataAcak() {
  const senjataList = [
    { nama: "Pistol", damage: 1 },
    { nama: "Shotgun", damage: 2 },
    { nama: "Sniper", damage: 3 }
  ];
  return senjataList[Math.floor(Math.random() * senjataList.length)];
}

function munculPowerUp() {
  return Math.random() < 0.3; // 30% kemungkinan muncul power-up
}

function endGame() {
  document.getElementById("weapon-choice").style.display = "none";
  document.getElementById("nextTurn").style.display = "none";
}

updateStatus();
