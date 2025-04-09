export async function login(authDetail) {
  const requestOptions = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  };
  // Old Code: const response = await fetch(`${process.env.REACT_APP_HOST}/login`, requestOptions);
  const host = process.env.REACT_APP_HOST; // Will be "" in production build
  const url = `${host}/login`; // Becomes "/login" for relative path fetch
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw { message: response.statusText, status: response.status }; //eslint-disable-line
  }
  const data = await response.json();

  if (data.accessToken) {
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
  }

  return data;
}

export async function register(authDetail) {
  const requestOptions = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  };
  // Old Code: const response = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOptions);
  const host = process.env.REACT_APP_HOST; // Will be "" in production build
  const url = `${host}/register`; // Becomes "/register" for relative path fetch
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw { message: response.statusText, status: response.status }; //eslint-disable-line
  }
  const data = await response.json();

  if (data.accessToken) {
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
  }

  return data;
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cbid");
}
