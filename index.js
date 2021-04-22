//todo: RANDOMBUTTON, enter a name pls ha üres a mező --> piros keret
//hibauzenet couldnt find character --> odakúrni egy képet meg a feliratot, előtte content.innerHTML = ""
//majd error handling: something went wrong: we couldnt find the character youre looking for/check your internet connection

    //landing page
window.addEventListener('load', () => {
    getCharByName('Walter White')
        .then(data => renderCharacter(data.img, data.name, data.occupation, data.nickname, data.appearance, data.portrayed, getCharQuote(data.name)))
        .finally(() =>{
            document.querySelector('.content').style.opacity = 1;
        })
})

const search = document.querySelector('.fa-search');
search.addEventListener('click', () =>{
    getCharByName()
        .then(data => {
            renderCharacter(data.img, data.name, data.occupation, data.nickname, data.appearance, data.portrayed, getCharQuote(data.name));
        })
        .finally( () => {
            document.querySelector('.content').style.opacity = 1;
        });
})

const getCharByName = async function (name = getUSerInput()){
    try{
        const res = await fetch(`https://www.breakingbadapi.com/api/characters?name=${name}`)
        const [data] = await res.json();
        
        console.log(data);
        
        return data;

    } catch (err){
        console.log(err);
    };
};

function getCharQuote (name){
        console.log(name.split(" "));
        let firstName, lastName;
        [firstName, lastName] = name.split(" ");

        return fetch(`https://www.breakingbadapi.com/api/quote/random?author=${firstName}+${lastName}`)
                    .then(res => {
                        console.log(res)
                        if (!res.ok) throw new Error('404 no quote found');
                        else{
                            return res.json()
                        }

                    })
                    .then(data => {
                        console.log(data)

                        const [quoteData] = data;

                        console.log(quoteData.quote);

                        return quoteData.quote
                    })
                    .catch(err => console.log(err))
    }

function getUSerInput(){
    const search = document.querySelector('#searchbox')
    if (search.value === "") return alert('error message: pls enter a name'); //itt egy keretformázás lesz setTimeouttal h töltse ki pls a mezőt
    return search.value
}

async function renderCharacter (img, name, occ, nick, seasons, port, quote){
    clearContent();
    let card = document.createElement('div');
    card.classList.add('container');
    card.innerHTML = `
    <img class = "profilePic" src = "${img}">
    <div class = "info">
        <div class = "data">
            <h1 class = "name">${name}</h1>
            <ul class = "list">
                <li><span>occupation</span> ${occ}</li>
                <li><span>nickname:</span> ${nick}</li>
                <li><span>appearance:</span> ${seasons}</li>
                <li><span>portrayed:</span> ${port}</li>
            </ul>
        </div>
        <div class = "quotes">
            <ul class = "list">
                <li id = "quoteLine">,,${await quote}''</li>
            </ul>
        </div>
    </div>
    `
    document.querySelector('.content').appendChild(card);
    //"error handling"
    const [firstName] = name.split(" ")
    const quoteValue = document.querySelector('#quoteLine');
    if (quoteValue.textContent === ",,undefined''") {
        quoteValue.textContent = `sorry, we couldn't find a quote for ${firstName}`
    };

}

function clearContent(){
    document.querySelector('#searchbox').value = ""
    document.querySelector('.content').style.opacity = 0;
    document.querySelector('.content').innerHTML = ""
}