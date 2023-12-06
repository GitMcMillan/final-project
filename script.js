const url = "https://thronesapi.com/api/v2/Characters"



fetch(url)
.then((resp) => resp.json())
.then((data) => {
  console.log(data);
  
})