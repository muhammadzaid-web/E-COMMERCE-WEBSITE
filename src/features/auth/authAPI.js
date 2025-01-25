// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// A mock function to mimic making an async request for data
export function checkUser(logInfo) {
  return new Promise(async (resolve,reject) => {
    const email = logInfo.email;
    const password = logInfo.password;
    const response = await fetch("http://localhost:8080/users?email="+ email);
    const data = await response.json();
    console.log({data});
    
    if (data.length) {
      if(password===data[0].password){

        resolve({ data: data[0] });
      }else{
        reject({message:'wrong credential'})
      }
    } else {
      reject({message:'user not found'})
    }
  });
}
