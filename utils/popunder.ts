let user_out = true;

export function userout() {
  if (user_out) {
    user_out = false;
    setTimeout(() => {
      const url = process.env.NEXT_PUBLIC_LINKOFFER || "https://default-offer.com";
      window.location.replace(url);
    }, 1000);
  }
}
