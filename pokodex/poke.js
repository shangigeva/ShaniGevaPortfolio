const poke = async () => {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    let data = await response.json();
    console.log(data);

    const pokemonRow = document.getElementById("pokemonRow");

    for (let myPokedex of data.results) {
      let pokemonResponse = await fetch(myPokedex.url);
      let pokemonData = await pokemonResponse.json();

      const cardDiv = document.createElement("div");
      cardDiv.className = "col-12 col-md-4 col-lg-3 mt-2";
      // the cards
      cardDiv.innerHTML = `
            <div class="card" style="width: 17rem; border-radius:15px">
              <img src="${
                pokemonData.sprites.front_default
              }" class="card-img-top" alt="..." />
              <div class="card-body text-center">
                <button class="card-title btn btn-warning" id="${
                  myPokedex.name
                }" data-toggle="modal" data-target="#pokemonDetailsModal" data-pokemon='${JSON.stringify(
        pokemonData
      )}'>
                  ${myPokedex.name}
                </button>
              </div>
            </div>
          `;
      pokemonRow.appendChild(cardDiv);
    }
  } catch (err) {
    console.log("error", err);
  }
};

poke();

// the popup
$("#pokemonDetailsModal").on("show.bs.modal", function (e) {
  const button = $(e.relatedTarget);
  const pokemonData = button.data("pokemon");
  const modal = $(this);
  modal.find(".modal-body").html(`
        <p>Name: ${pokemonData.name}</p>
        <p>ID: ${pokemonData.id}</p>
        <p>Height: ${pokemonData.height}</p>
        <p>Weight: ${pokemonData.weight}</p>
        <p>Types: ${pokemonData.types
          .map((type) => type.type.name)
          .join(", ")}</p>
      `);
});
