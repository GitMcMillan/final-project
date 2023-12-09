const url = "https://thronesapi.com/api/v2/Characters"


const characterList = document.querySelector("#character-list")
const characterName = document.querySelector("#name")
const familyName = document.querySelector("#family")
const title = document.querySelector("#title")


//dropdown
const characterDropdown = document.querySelector("#character-dropdown");

const imageContainer = document.querySelector("#image-container")

//Functions

let globalData;

function renderCenter(selectedCharacter) {
  imageContainer.innerHTML = ""
  document.querySelectorAll("#character-list img").forEach((img) => img.remove());


  const centerImg = document.createElement("img")
  centerImg.src = selectedCharacter.imageUrl
  characterName.textContent = selectedCharacter.fullName
  title.textContent = selectedCharacter.title
  familyName.textContent = selectedCharacter.family
  imageContainer.appendChild(centerImg)

  //render other images of same house members
  //search through json based on selected character family
  const sameFamily = globalData.filter((character) => character.family ===
    selectedCharacter.family && character != selectedCharacter)
  sameFamily.forEach((familyMember) => {
    renderSides(familyMember)
  })


}

function renderSides(data) {

  const sideImg = document.createElement("img")
  sideImg.remove()
  sideImg.src = data.imageUrl
  sideImg.classList.add("side-image")
  characterList.append(sideImg)

}

fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    // console.log(data);
    globalData = data
    //Fill on Load
    renderCenter(globalData[0])



    // Fill Dropwdown Menu
    globalData.forEach((character) => {
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
      const selectedCharacter = globalData.find(
        (character) => character.fullName === selectedName
      )

      if (selectedCharacter) {
        // characterList.innerHTML = ""
        const newImg = document.querySelector("#character-list > img")
        newImg.remove()
        // characterList.innerHTML = ""
        renderCenter(selectedCharacter)
        // newImg.src = selectedCharacter.imageUrl
      }

      const otherFamily =
        globalData.find((otherFamily) => {
          if (otherFamily.family === globalData.family) {
            renderSides(otherFamily)
          }
        })
    })
  })

