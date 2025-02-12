export function createOrder(order) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

  export function fetchAllOrders(order) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/orders');
      const data = await response.json();
      const totalOrders = await response.headers.get('X-Total-Count');
      // TODO: on server it will only return some info of user (not password)
      resolve({ data :{orders:data, totalOrders:+totalOrders}});
    })
  }

      export function updateOrder(order) {
          return new Promise(async (resolve) => {
            const response = await fetch('http://localhost:8080/orders/'+order.id, {
              method: 'PATCH',
              body: JSON.stringify(order),
              headers: { 'content-type': 'application/json' },
            });
            const data = await response.json();
            // TODO: on server it will only return some info of user (not password)
            resolve({ data });
          });
        }
      
  