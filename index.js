//TODO: catch: hibauzenet couldnt find character, quote, opacity, enter a tring

const search = document.querySelector('.fa-search');
search.addEventListener('click', () =>{
    getCharByName()
        .then(data => {
            renderCharacter(data.img, data.name, data.occupation, data.nickname, data.appearance, data.portrayed, 'idézet idézet idézet')
        })
        .finally( () => {
            document.querySelector('.container').style.opacity = 1
        });
})

//majd error handling: something went wrong: we couldnt find the character youre looking for

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
document.querySelector('#random-btn').addEventListener('click', () => getCharByName())
// getCharByName('walter').then(data => console.log(data.name));


function getUSerInput(){
    const search = document.querySelector('#searchbox')
    if (search.value === "") return alert('error message: pls enter a name') //itt egy keretformázás lesz setTimeouttal h töltse ki pls a mezőt
    return search.value
}

function renderCharacter (img, name, occ, nick, seasons, port, quote){
    clearContent()
    let card = document.createElement('div')
    card.classList.add('container')
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
                <li>${quote}</li>
            </ul>
        </div>
    </div>
    `
    document.querySelector('.content').appendChild(card)

    //opacity RESOLVEDBA kell
}
// renderCharacter("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/el-camino-breaking-bad-walter-white-1570791198.jpg?crop=0.420xw:1.00xh;0.137xw,0&resize=480:*",
// 'walter', "criminal", 'walt', '1-5', 'bryan', 'i am the danger')


function clearContent(){
    document.querySelector('.content').innerHTML = ""
}



