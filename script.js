const url = "https://thronesapi.com/api/v2/Characters"


const characterList = document.querySelector("#character-list")
const characterName = document.querySelector("#name")
const familyName = document.querySelector("#family") 
const title = document.querySelector("#title")


//dropdown
const characterDropdown = document.querySelector("#character-dropdown");


//Functions
function renderCenter(data) {
  const img = document.createElement("img")
  img.src = data.imageUrl

  characterName.textContent = data.fullName
  title.textContent = data.title
  familyName.textContent = data.family
  // li.append(img)
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
    const selectedName = e.target.value
    console.log(selectedName);
    renderCenter(data.target.value)
    
    })
  
  // const img = document.createElement("img")
  // img.src = data.imageUrl

  // characterName.textContent = data.fullName
  // title.textContent = data.title
  // familyName.textContent = data.family
  // // li.append(img)
  // characterList.append(img)
})

/* 
const characterList = document.querySelector("#character-list");
const familyImagesContainer = document.querySelector("#family-images");

fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    const selectedIndex = 21; // Replace with the index of the selected character

    // Render the selected character
    renderCharacter(data[selectedIndex]);

    // Filter family members based on the selected character's family
    const familyMembers = data.filter(
      (character) => character.family === data[selectedIndex].family
    );

    // Render family images on either side of the selected character
    renderFamilyImages(familyMembers, selectedIndex);
  });

function renderCharacter(character) {
  const img = document.createElement("img");
  img.src = character.imageUrl;

  document.getElementById("name").textContent = character.fullName;
  document.getElementById("title").textContent = character.title;
  document.getElementById("family").textContent = character.family;

  characterList.appendChild(img);
}

function renderFamilyImages(familyMembers, selectedIndex) {
  const familyImagesCount = familyMembers.length;
  const imagesPerSide = Math.floor(familyImagesCount / 2);

  // Render family images on the left side
  for (let i = 0; i < imagesPerSide; i++) {
    const img = document.createElement("img");
    img.src = familyMembers[i].imageUrl;
    familyImagesContainer.appendChild(img);
  }

  // Render family images on the right side
  for (let i = imagesPerSide + 1; i < familyImagesCount; i++) {
    const img = document.createElement("img");
    img.src = familyMembers[i].imageUrl;
    familyImagesContainer.appendChild(img);
  }
}
*/