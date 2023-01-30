const btn = document.querySelector('#dadJokeBtn');
const ul = document.querySelector('.jokeUl');
btn.addEventListener('click',async () => {
    try{
        const config = { headers: {Accept: 'application/json'}}
        const res = await axios.get('https://icanhazdadjoke.com/',config)
        console.log(res)
        const li = document.createElement('li');
        li.textContent=res.data.joke;
        ul.append(li);
    } catch (e) {
        console.log(e)
        console.log('jokes are not loading');
    }
    
})

// TV search form
const div = document.querySelector('.imageContainer');
const form = document.querySelector('#tvForm');
form.addEventListener('submit',async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config2 = { params: { q: searchTerm }};
    // const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    const res = await axios.get('http://api.tvmaze.com/search/shows', config2);
    addImages(res.data)
    form.elements.query.value='';
})

const addImages = (shows) =>{    
    for(let result of shows) {
        if(result.show.image){
            const img = document.createElement('img');
            img.src=result.show.image.medium;
            div.append(img);
        }       
    }
}