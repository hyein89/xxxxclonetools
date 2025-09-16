export function userout() {
  const url = process.env.NEXT_PUBLIC_LINKOFFER || "https://default-offer.com";
  setTimeout(() => {
    window.location.replace(url);
  }, 1000);
}
