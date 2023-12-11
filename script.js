const url = "https://thronesapi.com/api/v2/Characters"


const characterList = document.querySelector("#character-list")
const characterName = document.querySelector("#name")
const familyName = document.querySelector("#family")
const title = document.querySelector("#title")
const logo = document.querySelector("#logo")
// const AllBottomImages = document.querySelectorAll("#character-list img")


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

  //render the banner

  logo.src = "assets/" + selectedCharacter.lastName + "Banner.webp" || "assets/" + selectedCharacter.firstName + "Banner.webp"


  //render other images of same house members
  //search through json based on selected character family
  const sameFamily = globalData.filter((character) => character.family ===
    selectedCharacter.family && character != selectedCharacter)
  sameFamily.forEach((familyMember) => {
    renderBottom(familyMember)
  })
}



function renderBottom(data) {
  //create bottomimg container
  const bottomImgContainer = document.createElement("div")
  const bottomImg = document.createElement("img")
  //create the floating text div
  const floatingText = document.createElement("div")

  bottomImgContainer.addEventListener("click", (e) => {
    renderCenter(data)
  });

  bottomImgContainer.addEventListener("mouseover", (e) => {
    floatingText.textContent = data.fullName
    floatingText.style.visibility = "visible"
  })

  bottomImgContainer.addEventListener("mouseout", (e) => {
    floatingText.textContent = ""
    floatingText.style.visibility = "hidden"
  })

  bottomImg.src = data.imageUrl
  bottomImg.classList.add("bottom-image")


  bottomImgContainer.style.position = "relative"
  bottomImgContainer.style.display = "inline-block"

  //give the floatingtext a class and hide it
  floatingText.classList.add("floating-text")
  floatingText.style.visibility = "hidden"

  bottomImgContainer.appendChild(bottomImg)
  bottomImgContainer.appendChild(floatingText)
  characterList.appendChild(bottomImgContainer)
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
      const selectedName = e.target.value


      //find the selected character
      const selectedCharacter = globalData.find(
        (character) => character.fullName === selectedName
      )

      if (selectedCharacter) {
        renderCenter(selectedCharacter)
      }
    })
  })

