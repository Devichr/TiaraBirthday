document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const flap = envelope.querySelector(".flap");
  const smFlap = envelope.querySelector(".smFlap");
  const card = document.getElementById("card");
  const messages = card.querySelectorAll(".message");
  let currentMessageIndex = 0;
  let allMessagesDisplayed = false;

  envelope.addEventListener("click", () => {
    if (!allMessagesDisplayed) {
      flap.classList.add("open");
      smFlap.classList.add("open");
      setTimeout(() => {
        card.style.display = "block";
        card.classList.add("open");
        setTimeout(() => {
          card.classList.remove("open");
          card.classList.add("outside");
        }, 500); // Tunggu sampai kartu keluar sepenuhnya ke atas
      }, 500); // Tunggu sampai flap terbuka sepenuhnya
    }
  });

  card.addEventListener("click", () => {
    messages[currentMessageIndex].style.display = "none"; // Sembunyikan pesan saat ini
    currentMessageIndex = (currentMessageIndex + 1) % messages.length; // Indeks pesan berikutnya
    if (currentMessageIndex === 0) {
      // Semua pesan telah ditampilkan, kartu akan kembali ke amplop
      card.classList.remove("outside");
      card.classList.add("open");
      setTimeout(() => {
        card.classList.remove("open");
        card.classList.add("inside");
        setTimeout(() => {
          flap.classList.remove("open");
          smFlap.classList.remove("open");
          allMessagesDisplayed = false; // Reset flag setelah amplop tertutup kembali
          card.classList.remove("inside");
          card.style.display = "none"; // Sembunyikan kartu setelah masuk kembali ke amplop
          messages.forEach((message, index) => {
            message.style.display = index === 0 ? "block" : "none";
          });
        }, 500); // Tunggu sampai kartu kembali ke amplop sebelum menutup flap
      }, 500); // Tunggu sampai kartu bergerak ke atas sebelum masuk ke amplop
    } else {
      messages[currentMessageIndex].style.display = "block"; // Tampilkan pesan berikutnya
    }
  });

  // Set only the first message to be visible initially
  messages.forEach((message, index) => {
    if (index !== 0) {
      message.style.display = "none";
    }
  });
});
