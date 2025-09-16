export function popunder() {
  const url = process.env.NEXT_PUBLIC_LINKOFFER || "https://default-offer.com";

  // buka tab/jendela baru
  const newWin = window.open(url, "_blank");

  // kalau berhasil dibuka, lempar ke belakang
  if (newWin) {
    newWin.blur();
    window.focus();
  }
}
