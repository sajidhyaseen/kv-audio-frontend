export function setUser(user) {
  if (user) sessionStorage.setItem("user", JSON.stringify(user));
  else sessionStorage.removeItem("user");
}

/** Returns the non-sensitive user profile cached for the current browser session. */
export function getUser() {
  const user = sessionStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    sessionStorage.removeItem("user");
    return null;
  }
}

export function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("csrfToken");
  window.location.href = "/login";
}
