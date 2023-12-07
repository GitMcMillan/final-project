const url = "https://thronesapi.com/api/v2/Characters"

const characterList = document.querySelector("#character-list")
const characterName = document.querySelector("#name")
const familyName = document.querySelector("#family") 

fetch(url)
.then((resp) => resp.json())
.then((data) => {
  // console.log(data);
  // const li = document.createElement("li")
  // li.textContent = data[30].fullName
  
  const img = document.createElement("img")
  img.src = data[3].imageUrl

  characterName.textContent = data[3].fullName
  familyName.textContent = data[3].family

  // li.append(img)
  characterList.append(img)
})