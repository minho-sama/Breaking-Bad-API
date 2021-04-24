// landing page
window.addEventListener('load', () => {
    getCharByName('Walter White')
        .then(data => renderCharacter(data.img, data.name, data.occupation, data.nickname, data.appearance, data.portrayed, getCharQuote(data.name)))
        .finally(() =>{
            document.querySelector('.content').style.opacity = 1;
        })
});

//search by name
const search = document.querySelector('.fa-search');
search.addEventListener('click', () =>{
    getCharByName()
        .then(data => {
            if (data.name === undefined) throw new Error ('error 404: character not found')
            renderCharacter(data.img, data.name, data.occupation, data.nickname, data.appearance, data.portrayed, getCharQuote(data.name));
        })
        .catch((err) => {
            console.log(err)
            errorChar()
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
        if (data === undefined) throw new Error('error 404: character not found')
        
        return data;

    } catch (err){
        console.log(err);
    };
};

// random button gives a random character
document.querySelector('#random-btn')
    .addEventListener('click', () => {
        getRandChar()
        .then(data => {
            renderCharacter(data.img, data.name, data.occupation, data.nickname, data.appearance, data.portrayed, getCharQuote(data.name));
        })
        .finally(() => {
            document.querySelector('.content').style.opacity = '1';
        });
    });

const getRandChar = async function () {
    const res = await fetch('https://www.breakingbadapi.com/api/character/random');
    const [data] = await res.json();
    console.log(data)

    return data 
}

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
    const search = document.querySelector('.searchbox')
    if (search.value === "") return emptyField();
    return search.value
}
function emptyField() {
    const search = document.querySelector('.searchbox')
    search.classList.add('searchboxEmpty')

    setTimeout(() => {
        search.classList.remove('searchboxEmpty')
    }, 1500);
};

//no character found error message
function errorChar() {
    clearContent()
    const content = document.querySelector('.content');
    const message = document.createElement('div');
    message.classList.add('no-result');
    message.innerHTML = `
            <img src = "img/heisenberg-logo.png">
            <p><span>Error 404</span><br> We couldn't find the character you're looking for</p>
        `;
    content.appendChild(message);
    // content.style.opacity = 1;
};

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
    
    //"error handling if there's no quote"
    const [firstName] = name.split(" ")
    const quoteValue = document.querySelector('#quoteLine');
    if (quoteValue.textContent === ",,undefined''") {
        quoteValue.textContent = `sorry, we couldn't find a quote for ${firstName}`
    };

}

function clearContent(){
    document.querySelector('.searchbox').value = ""
    document.querySelector('.content').style.opacity = 0;
    document.querySelector('.content').innerHTML = ""
}

//check for unhandled error
window.addEventListener('unhandledrejection', event => console.error(event.reason));