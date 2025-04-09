function getSession() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));
  return { token, cbid };
}

export async function getUser() {
  const browserData = getSession();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${browserData.token}`,
    },
  };
  // Old Code: const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${browserData.cbid}`, requestOptions);
  const host = process.env.REACT_APP_HOST; // Will be "" in production build
  const url = `${host}/600/users/${browserData.cbid}`; // Becomes "/600/users/..." for relative path fetch
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw { message: response.statusText, status: response.status }; //eslint-disable-line
  }
  const data = await response.json();
  return data;
}

export async function getUserOrders() {
  const browserData = getSession();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${browserData.token}`,
    },
  };
  // Old Code: const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.cbid}`, requestOptions);
  const host = process.env.REACT_APP_HOST; // Will be "" in production build
  const url = `${host}/660/orders?user.id=${browserData.cbid}`; // Becomes "/660/orders?..." for relative path fetch
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw { message: response.statusText, status: response.status }; //eslint-disable-line
  }
  const data = await response.json();
  return data;
}

export async function createOrder(cartList, total, user) {
  const browserData = getSession();
  const order = {
    cartList: cartList,
    amount_paid: total,
    quantity: cartList.length,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${browserData.token}`,
    },
    body: JSON.stringify(order),
  };
  // Old Code: const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, requestOptions);
  const host = process.env.REACT_APP_HOST; // Will be "" in production build
  const url = `${host}/660/orders`; // Becomes "/660/orders" for relative path fetch
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw { message: response.statusText, status: response.status }; //eslint-disable-line
  }
  const data = await response.json();
  return data;
}
