const url = "https://thronesapi.com/api/v2/Characters"


const characterList = document.querySelector("#character-list")
const characterName = document.querySelector("#name")
const familyName = document.querySelector("#family")
const title = document.querySelector("#title")


//dropdown
const characterDropdown = document.querySelector("#character-dropdown");


//Functions

let data;
function renderCenter(data) {
  // characterList.innerHTML = ""
  const img = document.createElement("img")
  img.src = data.imageUrl

  characterName.textContent = data.fullName
  title.textContent = data.title
  familyName.textContent = data.family
  // li.append(img)
  // characterList.innerHTML = ""
  characterList.append(img)

  //render other images of same house members
  //search through json based on selected character family
  /*  const selectedCharacter = data.find(
         (character) => character.fullName === selectedName
       )
 
       if (selectedCharacter) {
         // characterList.innerHTML = ""
         const newImg = document.querySelector("#character-list > img")
         newImg.remove()
         renderCenter(selectedCharacter)
         // newImg.src = selectedCharacter.imageUrl
       }*/

  const otherFamily = data.find((otherFamily) => {
    if (otherFamily.family === data.family) {
      renderSides(otherFamily)
    }
  })

}

function renderSides() {
  const img = document.createElement("img")
  img.src = data.imageUrl
  characterList.append(img)

}

fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    // console.log(data);

    //Fill on Load
    renderCenter(data[0])



    // Fill Dropwdown Menu
    data.forEach((character) => {
      const option = document.createElement("option")
      option.value = character.fullName
      option.textContent = character.fullName
      characterDropdown.appendChild(option)
    })

    // Target Name In Dropdown
    characterDropdown.addEventListener("change", (e) => {
      e.preventDefault()
      // characterList.innerHTML = ""
      const selectedName = e.target.value
      // console.log(selectedName);

      //find the selected character
      const selectedCharacter = data.find(
        (character) => character.fullName === selectedName
      )

      if (selectedCharacter) {
        // characterList.innerHTML = ""
        const newImg = document.querySelector("#character-list > img")
        newImg.remove()
        renderCenter(selectedCharacter)
        // newImg.src = selectedCharacter.imageUrl
      }

      // renderCenter()

    })

  })

