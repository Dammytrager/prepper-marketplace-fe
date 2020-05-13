export function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function updateArray(arr: any[], newItem: any)   {
  const oldItem = arr.filter((a) => {
    return a._id === newItem._id;
  })[0];
  if (newItem.constructor === Array) {
    return arr.concat(newItem);
  } else if (oldItem) {
    const index = arr.indexOf(oldItem);
    arr[index] = newItem;
    return arr;
  } else {
    arr.push(newItem);
    return arr;
  }
}

export function removeItem(arr: any[], item: any) {
  const removedItem = arr.filter((a) => {
    return a._id === item._id;
  })[0];
  const index = arr.indexOf(removedItem);
  arr.splice(index, 1);
  return arr;
}
