let mainContent = document.querySelector('.maincontent')


const clientId = 'Client_Id'; // Read readme file to get client Id
const clientSecret = 'Client_Secret'; // Read readme file to get client secret 

// private methods
const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

const _getGenres = async (token) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.categories.items;
}

const _getPlaylistByGenre = async (token, genreId) => {

    const limit = 42;

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
}

const _getTracks = async (token, tracksEndPoint) => {

    const limit = 42;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data.items;
}

const _getTrack = async (token, trackEndPoint) => {

    const result = await fetch(`${trackEndPoint}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
}

const _getArtists = async (token) => {

    const result = await fetch("https://api.spotify.com/v1/artists?ids=7hVmdlsJp0E2WQIvVl8ngN,3TVXtAsR1Inumwj472S9r4,4PULA4EFzYTrxYvOVlwpiQ,5C1S9XwxMuuCciutwMhp5t,3yOHCFUZRsaHUu1yefR8ck,0CP2yDO5i5Q2G1fRj6C8JV,0yniDkE5y7ci4X9OtLBXaQ,3uHUKCspaCzAab9A3LlGAr,6DARBhWbfcS9E4yJzcliqQ,2FKWNmZWDBZR4dE5KX4plR,15UsOTVnJzReFVN1VCnxy4,4MCBfE4596Uoi2O4DtmEMz,4YRxDV8wJFPHPTeXepOstw,5RnjdaS0Pqb4KgWvCoohs8,2rN8LHqK4TBI7y3d9POvJb,4ITkqBlf5eoVCOFwsJCnqo", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
}

const _getArtistsTracks = async (token, trackEndPoint) => {

    const result = await fetch(`https://api.spotify.com/v1/artists/${trackEndPoint}/top-tracks?market=IN`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
}

const _getPlaylists = async (token) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/romance/playlists?limit=20`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
}


const _getNavArtists = async (token) => {

    const result = await fetch("https://api.spotify.com/v1/artists?ids=2P9JaCtpbQSuZOgvtPrUJ8,2GoeZ0qOTt6kjsWW4eA6LS,1tqysapcCh1lWEAc9dIFpa,0oOet2f43PA68X5RxKobEy,7uIbLdzzSEqnX0Pkrb56cR,56SjZARoEvag3RoKWIb16j,4fEkbug6kZzzJ8eYX6Kbbp,0y59o4v8uw5crbN9M3JiL1,3fWcIRZlzhMl2YNACMvHui,76fuWYgIf3TVIopTs3vaJ6,7GgAwYJnBBFT1WogNWf0oj,36iDrP3UnCxsSH9LuSdkDj,0SWOtgI95g7oVrP9halrmP,61P6g4b3TgZ9m2caJlXS4K,24BYRlsS8uIO4jA71mJ4Js,07hzX8SH6CEg7B2yl4hoKs,4gdMJYnopf2nEUcanAwstx,5UdFr0GeO7jKIaNIJgwB36", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
}


const _getNavArtistsTracks = async (token, trackEndPoint) => {

    const result = await fetch(`https://api.spotify.com/v1/artists/${trackEndPoint}/top-tracks?market=IN`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    return data;
}





let token1 = _getToken()
token1.then((val) => {
    let genreDOM = _getGenres(val)
    return genreDOM
}).then((value) => {
    value.map(item => {
        genreWindow(item.name, item.id, item.href, item.icons[0].url)
    })
})


//<----All Event Listners Starts---->

let homeBtn = document.querySelector(".homeBtn")
let searchBtn = document.querySelector(".searchBtn")
let artistButton = document.querySelector('.artistBtn')
let playlistButton = document.querySelector('.playlistBtn')
let spotifyLogo = document.querySelector('.logo')
let homePath = document.querySelector(".homePath")
let homeP = document.querySelector(".homeP")
let searchPath = document.querySelector(".searchPath")
let searchP = document.querySelector(".searchP")
let mainWindow = document.querySelector('.mainWindow')
let searchWindow = document.querySelector('.searchWindow')

artistButton.addEventListener('click', function (e) {
    e.preventDefault()
    artistButton.setAttribute('class', 'p-2 mx-3 w-20 rounded-3xl bg-white text-black text-sm')
    playlistButton.setAttribute('class', 'p-2 w-20 rounded-3xl bg-[#242424] text-white text-sm hover:bg-gray-800')
    playlistNavbar.classList.add('class', 'hidden')
    artistNav.classList.remove('hidden')
    artistNav.setAttribute('class', 'flex flex-wrap justify-center items-center gap-3')
})

playlistButton.addEventListener('click', function (e) {
    e.preventDefault()
    playlistButton.setAttribute('class', 'p-2 mx-3 w-20 rounded-3xl bg-white text-black text-sm')
    artistButton.setAttribute('class', 'p-2 w-20 rounded-3xl bg-[#242424] text-white text-sm hover:bg-gray-800')
    playlistNavbar.classList.remove('hidden')
    artistNav.classList.add('hidden')
})

searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    container.setAttribute('class', 'h-auto w-auto mx-7 mt-4 text-white flex flex-wrap justify-center items-center gap-10')
    browseH1.setAttribute('class', 'text-white text-2xl mt-24 font-bold ml-7')
    container2.setAttribute('class', 'hidden')
    container2.innerHTML = ''
    container3.innerHTML = ''
    searchPath.setAttribute('stroke', 'white')
    searchPath.setAttribute('fill', 'white')
    searchP.classList.add('text-white')
    homePath.setAttribute('stroke', 'gray')
    homePath.setAttribute('fill', 'none')
    homeP.classList.add('text-gray-600')
    homeP.classList.remove('text-white')
    mainWindow.classList.add('hidden')
    searchWindow.classList.remove('hidden')
    artistNavTracks.innerHTML = ''
    playlistTracksNav2.classList.add('hidden')
    playlistTracksNav2.innerHTML = ''
    artistNavTracks2.classList.add('hidden')
    artistNavTracks2.innerHTML = ''

})

homeBtn.addEventListener('click', function (e) {
    e.preventDefault()
    artistTracks.innerHTML = ''
    searchPath.setAttribute('stroke', 'gray')
    searchPath.setAttribute('fill', 'none')
    searchP.classList.remove('text-white')
    homePath.setAttribute('stroke', 'white')
    homePath.setAttribute('fill', 'white')
    homeP.classList.add('text-white')
    mainWindow.classList.remove('hidden')
    main.classList.remove('hidden')
    searchWindow.classList.add('hidden')
    artistTracks.classList.add('hidden')
    playlistTracksNav.classList.add('hidden')
    playlistTracksNav.innerHTML = ''
    artistNavTracks.innerHTML = ''

})

spotifyLogo.addEventListener('click', function (e) {
    window.location.reload()
})

//<----All Event Listners Ends ---->





//<----All Search Window Functionalities Starts--->

//searchWindow Functionality showing the genre(Categories) of songs.

let container = document.querySelector('.container')
let container2 = document.querySelector('.container2')
let container3 = document.querySelector('.container3')
let browseH1 = document.querySelector('.browse')
let footer = document.querySelector('.footer')


function genreWindow(content, id, href, icon) {
    let newDiv = document.createElement('div')
    let newA = document.createElement('a')
    let newImg = document.createElement('img')
    newImg.src = icon
    newA.innerHTML = content
    newA.setAttribute('href', href)
    newA.setAttribute('id', id)
    newA.setAttribute('class', 'flex flex-col justify-center items-center font-xl')
    newImg.setAttribute('class', 'h-60 w-60')
    newA.prepend(newImg)
    newDiv.append(newA)
    container.appendChild(newDiv)
    newA.addEventListener('click', function (e) {
        e.preventDefault()
        let id = newA.id
        token1.then((val) => {
            let itemsPlaylists = _getPlaylistByGenre(val, id)
            container.setAttribute('class', 'hidden')
            browseH1.setAttribute('class', 'hidden')
            footer.setAttribute('class', 'hidden')
            container2.setAttribute('class', 'h-auto w-auto mx-7 mt-4 my-5 text-white flex flex-wrap justify-center items-center gap-5')
            return itemsPlaylists
        })
            .then((value) => {
                let message = value.message
                playlistsWindow(message)
                value.playlists.items.map((items) => {
                    let image = items.images[0].url
                    let title = items.name
                    let href = items.tracks.href
                    let id = items.id
                    let description = items.description
                    playlistsWindFunc(image, title, description, href, id)
                    footer.setAttribute('class', 'h-96 w-full bg-[#121212]')
                })
            })
    })
}
//searchWindow Functionality showing the playlists of the selected genre(Categories).
function playlistsWindow(message) {
    let h1 = document.createElement('h1')
    h1.setAttribute('class', 'mt-22 my-10 font-3xl text-left font-bold text-3xl block w-full mt-32')
    h1.innerHTML = message
    container2.appendChild(h1)
}

function playlistsWindFunc(img, title, description, href, id) {
    let newDiv = document.createElement('div')
    let a = document.createElement('a')
    let image = document.createElement('img')
    let span = document.createElement('span')
    let span2 = document.createElement('span')
    a.setAttribute('id', id)
    image.setAttribute('class', 'h-40 w-40')
    span2.setAttribute('class', 'text-gray-500')
    a.setAttribute('class', 'h-80 w-80 flex flex-col justify-center gap-3 text-center hover:bg-gray-800 duration-300 rounded-xl items-center border-gray-800 border-2')
    a.href = href
    image.src = img
    span.innerHTML = title
    span2.innerHTML = description
    a.appendChild(image)
    a.appendChild(span)
    a.appendChild(span2)
    newDiv.appendChild(a)
    container2.appendChild(newDiv)
    a.addEventListener('click', function (e) {
        e.preventDefault()
        let newID = a.href
        token1.then((val) => {
            let tracks = _getTracks(val, newID)
            tracks.then((val) => {
                val.map(items => {
                    let img = items.track.album.images[0].url
                    let artistname = items.track.album.artists[0].name
                    let name = items.track.name
                    let id = items.track.id
                    let href = items.track.href
                    container2.setAttribute('class', 'hidden')
                    multipleTracks(id, href, img, name, artistname)
                })
            })
        })
    })
}
//searchWindow Functionality displying multiple tracks of the selected playlist.
function multipleTracks(id, hrefs, img, name, artistname) {
    const smallDiv = document.createElement('div')
    const a = document.createElement('a')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')
    const a2 = document.createElement('a')
    const image = document.createElement('img')
    span1.setAttribute('class', 'text-xl font-bold text-white mx-3')
    span2.setAttribute('class', 'text-sm text-gray-500 mx-3 my-1')
    smallDiv.setAttribute('class', 'h-20 w-full  border-gray-800 border-2 rounded-xl')
    a.setAttribute('class', 'h-20 w-full flex p-3 hover:bg-gray-800 duration-300 rounded-xl')
    a2.setAttribute('class', 'relative text-xl font-bold hover:text-green-600 underline')
    span2.innerHTML += `Song by : ${artistname}`
    span1.innerHTML = name
    a2.setAttribute('href', hrefs)
    image.src = img
    a.id = id
    a2.innerHTML = 'Play'
    a.appendChild(image)
    a.appendChild(span1)
    a.appendChild(span2)
    a.appendChild(a2)
    smallDiv.appendChild(a)
    container3.appendChild(smallDiv)
    a2.addEventListener('click', function (e) {
        e.preventDefault()
        let trackId = e.target.href
        token1.then((val) => {
            //searchWindow Functionality giving the preview url of selected track.
            let track = _getTrack(val, trackId)
            track.then((val) => {
                //preview url of selected track.
                fullSong.classList.remove('hidden')
                let originalSongOnSpotify = val.external_urls.spotify
                let nameOfTheArtist = val.album.artists[0].name
                let nameOfTheSong = val.name
                let imageOfTheSong = val.album.images[1].url
                let songs = val.preview_url
                playerfunctionality(imageOfTheSong, nameOfTheSong, nameOfTheArtist, songs)
                fullSongOnSpotify(originalSongOnSpotify)
            })
        })

    })
}

//<----All Search Window Functionalities Ends--->





//<----All Home Window Functionalities Starts--->


//home window functionality greeting the user in real time time zone.

let greetings = document.querySelector('.greetings')
function greet() {
    var time = new Date().getHours();


    if (time >= 0 && time < 12) {
        greetings.innerHTML = 'Good Morning'
    }
    else if (time >= 12 && time < 18) {
        greetings.innerHTML = 'Good Afternoon'
    }
    else {
        greetings.innerHTML = 'Good Evening'
    }
}
greet();




token1.then((val) => {
    let getArtists = _getArtists(val)
    return getArtists
}).then((value) => {
    let artist = value.artists
    artist.map((items) => {
        let name = items.name
        let type = items.type
        let img = items.images[0].url
        let href = items.href
        let id = items.id
        artistWindow(img, name, type, href, id)
        footer2.classList.remove('hidden')
    })
})

//home window functionality displaying multiple artists.
let footer2 = document.querySelector('.footer2')
let allArtists = document.querySelector('.artists')
let artistTracks = document.querySelector('.artistTracks')
let main = document.querySelector('.main')




function artistWindow(img, title, description, href, id) {
    let newDiv = document.createElement('div')
    let a = document.createElement('a')
    let image = document.createElement('img')
    let span = document.createElement('span')
    let span2 = document.createElement('span')
    a.setAttribute('id', id)
    image.setAttribute('class', 'h-40 w-40')
    span.setAttribute('class', 'text-gray-500 ')
    span2.setAttribute('class', 'text-white text-lg')
    a.setAttribute('class', 'h-60 w-60 flex flex-col justify-center gap-1 text-center hover:bg-gray-800 duration-300 rounded-xl items-center border-gray-800 border-2 mx-5 my-5')
    a.href = href
    image.src = img
    span.innerHTML = description
    span2.innerHTML = title
    a.appendChild(image)
    a.appendChild(span)
    a.appendChild(span2)
    newDiv.appendChild(a)
    allArtists.appendChild(newDiv)
    a.addEventListener('click', function (e) {
        e.preventDefault()
        main.setAttribute('class', 'hidden')
        footer2.classList.add('hidden')
        artistTracks.classList.remove('hidden')
        let newID = a.id
        token1.then((val) => {
            let tracks = _getArtistsTracks(val, newID)
            tracks.then((val) => {
                let tracks_lists = val.tracks
                tracks_lists.map((items) => {
                    let originalSongOnSpotify = items.external_urls.spotify
                    let url = items.preview_url
                    let name = items.album.name
                    let img = items.album.images[0].url
                    let artist = items.album.artists[0].name
                    artistsTracks(name, img, artist, url)
                    footer2.classList.remove('hidden')
                    fullSongOnSpotify(originalSongOnSpotify)
                })
            })
        })
    })
}

//home window functionality displaying multiple tracks of the selected artist.
function artistsTracks(name, img, artist, url) {
    const smallDiv = document.createElement('div')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')
    const a2 = document.createElement('a')
    const image = document.createElement('img')
    span1.setAttribute('class', 'text-xl font-bold text-white mx-3')
    image.setAttribute('class', 'h-14 w-14')
    span2.setAttribute('class', 'text-sm text-gray-500 mx-3 my-1')
    smallDiv.setAttribute('class', 'h-20 w-[90%] flex border-gray-800 border-2 p-3 hover:bg-gray-800 duration-300 rounded-xl cursor-pointer')
    span2.innerHTML += `Song by : ${artist}`
    span1.innerHTML = name
    a2.setAttribute('href', url)
    a2.setAttribute('class', 'relative text-white text-xl font-bold hover:text-green-600 underline')
    image.src = img
    a2.innerHTML = 'Play'
    smallDiv.appendChild(image)
    smallDiv.appendChild(span1)
    smallDiv.appendChild(span2)
    smallDiv.appendChild(a2)
    artistTracks.setAttribute('class', 'artistTracks w-[80vw] h-auto mx-5 gap-5 mt-24 flex flex-wrap items-center')
    artistTracks.appendChild(smallDiv)
    a2.addEventListener('click', function (e) {
        e.preventDefault()
        fullSong.classList.remove('hidden')
        let nameOfTheArtist = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML.slice(10)
        let nameOfTheSong = e.target.parentElement.firstElementChild.nextElementSibling.innerHTML
        let imageOfTheSong = e.target.parentElement.firstElementChild.src
        let songs = e.target.href
        playerfunctionality(imageOfTheSong, nameOfTheSong, nameOfTheArtist, songs)
    })
}


//<----All Home Window Functionalities Ends--->




//<----All Side Bar Functionalities in Home Window Starts---->

token1.then((val) => {
    let getPlaylists = _getPlaylists(val)
    return getPlaylists
}).then((val) => {
    let playlistsItems = val.playlists.items
    playlistsItems.map((val) => {
        let name = val.name
        let id = val.id
        let img = val.images[0].url
        let href = val.href
        playlistNav(name, id, img, href)
    })
})

//Sidebar functionality displaying playlists.
let playlistNavbar = document.querySelector('.playlist')
let playlistTracksNav = document.querySelector('.containerPlaylistTracksNav')


function playlistNav(name, id, img, href) {
    const smallDiv = document.createElement('div')
    const span1 = document.createElement('span')
    const image = document.createElement('img')
    span1.setAttribute('class', 'text-sm font-bold text-white mx-3')
    smallDiv.setAttribute('class', 'h-20 w-full flex border-gray-800 border-2 bg-gray-900 p-3 hover:bg-gray-800 duration-300 rounded-xl cursor-pointer')
    span1.innerHTML = name
    span1.id = href
    image.id = href
    smallDiv.id = href
    image.setAttribute('class', 'h-14 w-14')
    image.src = img
    smallDiv.appendChild(image)
    smallDiv.appendChild(span1)
    playlistNavbar.appendChild(smallDiv)
    smallDiv.addEventListener('click', function (e) {
        e.preventDefault()
        let id = e.target.id + '/tracks'
        token1.then((val) => {
            //searchWindow Functionality giving the preview url of selected track.
            let tracks = _getTracks(val, id)
            artistTracks.classList.add('hidden')
            return tracks
        }).then((val) => {
            let allTracks = val
            allTracks.map((items) => {
                let img = items.track.album.images[0].url
                let artistname = items.track.album.artists[0].name
                let name = items.track.name
                let id = items.track.id
                let href = items.track.href
                main.setAttribute('class', 'hidden')
                playlistNavbar.classList.remove('hidden')
                tracksPlaylistNav(name, id, href, artistname, img)
                browseH1.classList.add('hidden')
                container.classList.add('hidden')
                tracksPlaylistNav2(name, id, href, artistname, img)
            })
        })
    })
}
//Sidebar functionality displaying selected playlist all tracks.
function tracksPlaylistNav(name, id, href, artistname, img) {
    const a = document.createElement('a')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')
    const a2 = document.createElement('a')
    const image = document.createElement('img')
    span1.setAttribute('class', 'text-xl font-bold text-white mx-3')
    span2.setAttribute('class', 'text-sm text-gray-500 mx-3 my-1')
    image.setAttribute('class', 'h-14 w-14')
    a.setAttribute('class', 'h-20 w-[75vw]  border-gray-800 border-2 rounded-x flex items-center rounded-xl p-2 hover:bg-gray-700 cursor-pointer')
    a2.setAttribute('class', 'relative text-xl text-white font-bold hover:text-green-600 underline')
    span2.innerHTML += `Song by : ${artistname}`
    span1.innerHTML = name
    a2.setAttribute('href', href)
    image.src = img
    a.id = id
    a2.innerHTML = 'Play'
    a.appendChild(image)
    a.appendChild(span1)
    a.appendChild(span2)
    a.appendChild(a2)
    playlistTracksNav.setAttribute('class', 'containerPlaylistTracksNav mx-7 mt-24 h-auto w-auto text-white gap-5 flex flex-wrap items-center')
    playlistTracksNav.appendChild(a)
    a2.addEventListener('click', function (e) {
        e.preventDefault()
        let trackId = e.target.href
        token1.then((val) => {
            //Navbar Playlits Functionality giving the preview url of selected track.
            let track = _getTrack(val, trackId)
            track.then((val) => {
                //preview url of selected track.
                fullSong.classList.remove('hidden')
                let originalSongOnSpotify = val.external_urls.spotify
                let nameOfTheArtist = val.album.artists[0].name
                let nameOfTheSong = val.name
                let imageOfTheSong = val.album.images[1].url
                let songs = val.preview_url
                playerfunctionality(imageOfTheSong, nameOfTheSong, nameOfTheArtist, songs)
                fullSongOnSpotify(originalSongOnSpotify)

            })
        })

    })
}


token1.then((val) => {
    let getArtist = _getNavArtists(val)
    getArtist.then((val) => {
        let artist = val.artists
        artist.map((val) => {
            let name = val.name
            let id = val.id
            let img = val.images[1].url
            artistNavFunc(name, id, img)
        })
    })
})

//side bar artist functionality displaying artist in the side bar.
let artistNav = document.querySelector('.artistNav')
let artistNavTracks = document.querySelector('.containerArtistNavTracks')


function artistNavFunc(name, id, img) {
    let div = document.createElement('div')
    let image = document.createElement('img')
    let span = document.createElement('span')
    span.setAttribute('class', 'text-center text-sm text-white font-bold')
    image.src = img
    image.setAttribute('class', 'h-14 w-14 rounded-3xl')
    span.innerHTML = name
    div.id = id
    image.id = id
    span.id = id
    div.setAttribute('class', 'h-28 w-28 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-700')
    div.appendChild(image)
    div.appendChild(span)
    artistNav.appendChild(div)
    div.addEventListener('click', function (e) {
        e.preventDefault()
        let id = e.target.id
        token1.then((val) => {
            let tracks = _getArtistsTracks(val, id)
            main.setAttribute('class', 'hidden')
            footer2.classList.add('hidden')
            return tracks
        }).then((val) => {
            let tracks_lists = val.tracks
            tracks_lists.map((items) => {
                let url = items.preview_url
                let originalSongOnSpotify = items.external_urls.spotify
                let name = items.album.name
                let id = items.album.id
                let img = items.album.images[0].url
                let artist = items.album.artists[0].name
                navArtistsTracks(name, img, artist, url)
                browseH1.classList.add('hidden')
                container.classList.add('hidden')
                navArtistsTracks2(name, img, artist, url)
                footer2.classList.remove('hidden')
                fullSongOnSpotify(originalSongOnSpotify)

            })
        })
    })
}

//side bar artist functionality displaying the tracks of selected artist in side bar.
function navArtistsTracks(name, img, artist, url) {
    const smallDiv = document.createElement('div')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')
    const a2 = document.createElement('a')
    const image = document.createElement('img')
    span1.setAttribute('class', 'text-xl font-bold text-white mx-3')
    image.setAttribute('class', 'h-14 w-14')
    span2.setAttribute('class', 'text-sm text-gray-500 mx-3 my-1')
    smallDiv.setAttribute('class', 'h-20 w-full flex border-gray-800 border-2 p-3 hover:bg-gray-800 duration-300 rounded-xl cursor-pointer')
    span2.innerHTML += `Song by : ${artist}`
    span1.innerHTML = name
    a2.setAttribute('href', url)
    a2.setAttribute('class', 'relative text-white text-xl font-bold hover:text-green-600 underline')
    image.src = img
    a2.innerHTML = 'Play'
    smallDiv.appendChild(image)
    smallDiv.appendChild(span1)
    smallDiv.appendChild(span2)
    smallDiv.appendChild(a2)
    artistNavTracks.setAttribute('class', 'containerArtistNavTracks mx-7 mt-24 h-auto w-auto flex flex-wrap items-center gap-5')
    artistNavTracks.appendChild(smallDiv)
    a2.addEventListener('click', function (e) {
        e.preventDefault()
        fullSong.classList.remove('hidden')
        let nameOfTheArtist = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML.slice(10)
        let nameOfTheSong = e.target.parentElement.firstElementChild.nextElementSibling.innerHTML
        let imageOfTheSong = e.target.parentElement.firstElementChild.src
        let songs = e.target.href
        playerfunctionality(imageOfTheSong, nameOfTheSong, nameOfTheArtist, songs)
    })
}

//<----All Side Bar Functionalities in Home Window Ends---->





//<----All Side Bar Functionalities in Search Window Starts---->
let playlistTracksNav2 = document.querySelector('.containerPlaylistTracksNavX')
let artistNavTracks2 = document.querySelector('.containerArtistNavTracksX')

function tracksPlaylistNav2(name, id, href, artistname, img) {
    const a = document.createElement('a')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')
    const a2 = document.createElement('a')
    const image = document.createElement('img')
    span1.setAttribute('class', 'text-xl font-bold text-white mx-3')
    span2.setAttribute('class', 'text-sm text-gray-500 mx-3 my-1')
    image.setAttribute('class', 'h-14 w-14')
    a.setAttribute('class', 'h-20 w-[75vw]  border-gray-800 border-2 rounded-x flex items-center rounded-xl p-2 hover:bg-gray-700 cursor-pointer')
    a2.setAttribute('class', 'relative text-xl text-white font-bold hover:text-green-600 underline')
    span2.innerHTML += `Song by : ${artistname}`
    span1.innerHTML = name
    a2.setAttribute('href', href)
    image.src = img
    a.id = id
    a2.innerHTML = 'Play'
    a.appendChild(image)
    a.appendChild(span1)
    a.appendChild(span2)
    a.appendChild(a2)
    playlistTracksNav2.setAttribute('class', 'containerPlaylistTracksNav mx-7 h-auto w-auto text-white gap-5 flex flex-wrap items-center')
    playlistTracksNav2.appendChild(a)
    a2.addEventListener('click', function (e) {
        e.preventDefault()
        let trackId = e.target.href
        token1.then((val) => {
            //Navbar Playlits Functionality giving the preview url of selected track.
            let track = _getTrack(val, trackId)
            track.then((val) => {
                let originalSongOnSpotify = val.external_urls.spotify
                let nameOfTheArtist = val.album.artists[0].name
                let nameOfTheSong = val.name
                let imageOfTheSong = val.album.images[1].url
                let songs = val.preview_url
                playerfunctionality(imageOfTheSong, nameOfTheSong, nameOfTheArtist, songs)
                fullSongOnSpotify(originalSongOnSpotify)

            })
        })

    })
}

function navArtistsTracks2(name, img, artist, url) {
    const smallDiv = document.createElement('div')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')
    const a2 = document.createElement('a')
    const image = document.createElement('img')
    span1.setAttribute('class', 'text-xl font-bold text-white mx-3')
    image.setAttribute('class', 'h-14 w-14')
    span2.setAttribute('class', 'text-sm text-gray-500 mx-3 my-1')
    smallDiv.setAttribute('class', 'h-20 w-full flex border-gray-800 border-2 p-3 hover:bg-gray-800 duration-300 rounded-xl cursor-pointer')
    span2.innerHTML += `Song by : ${artist}`
    span1.innerHTML = name
    a2.setAttribute('href', url)
    a2.setAttribute('class', 'relative text-white text-xl font-bold hover:text-green-600 underline')
    image.src = img
    a2.innerHTML = 'Play'
    smallDiv.appendChild(image)
    smallDiv.appendChild(span1)
    smallDiv.appendChild(span2)
    smallDiv.appendChild(a2)
    artistNavTracks2.setAttribute('class', 'containerArtistNavTracks mx-7 h-auto w-auto flex flex-wrap items-center gap-5')
    artistNavTracks2.appendChild(smallDiv)
    a2.addEventListener('click', function (e) {
        e.preventDefault()
        fullSong.classList.remove('hidden')
        let nameOfTheArtist = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML.slice(10)
        let nameOfTheSong = e.target.parentElement.firstElementChild.nextElementSibling.innerHTML
        let imageOfTheSong = e.target.parentElement.firstElementChild.src
        let songs = e.target.href
        playerfunctionality(imageOfTheSong, nameOfTheSong, nameOfTheArtist, songs)

    })
}

//<----All Side Bar Functionalities in Search Window Ends---->


//<----Song Player Functionality Starts---->
let songRange = document.querySelector('.range') //range
let song = document.querySelector('#song') //audio
let ctrlIcon = document.querySelector('#control') //play Pause
let mainSong = document.querySelector('.mainSong') //source
let volumeControl = document.getElementById("volumeControl")
let volume = document.querySelector('.volume')
let playerSongImage = document.querySelector('.playerSongImg')
let playerSongName = document.querySelector('.playerSongName')
let playerSongArtistName = document.querySelector('.playerArtistName')
let fullSong = document.querySelector('.fullSong')
let spotifyLink = document.querySelector('.spotifyLink')


function playerfunctionality(songImg, songName, songArtist, songs) {
    songRange.removeAttribute('disabled')
    volumeControl.removeAttribute('disabled')
    playerSongImage.src = songImg
    playerSongName.innerHTML = songName
    playerSongArtistName.innerHTML = songArtist
    song.src = songs
}


song.onloadedmetadata = function () {
    songRange.max = song.duration
    songRange.value = song.currentTime
}


function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) {
        song.pause()
        ctrlIcon.classList.remove('fa-pause')
        ctrlIcon.classList.add('fa-play')
    }
    else {
        song.play()
        ctrlIcon.classList.add('fa-pause')
        ctrlIcon.classList.remove('fa-play')
    }
}

if (song.play()) {
    setInterval(() => {
        songRange.value = song.currentTime
    }, 100)
}

songRange.onchange = function () {
    song.play()
    song.currentTime = songRange.value
    ctrlIcon.classList.add('fa-pause')
    ctrlIcon.classList.remove('fa-play')
}


function fullSongOnSpotify(link) {
    spotifyLink.href = link
}

function updateVolume() {
    var volume = volumeControl.value;
    song.volume = volume;
}



volume.addEventListener('click', function (e) {
    e.preventDefault()
    if (volume.classList.contains('fa-volume-high')) {
        volume.classList.toggle('fa-volume-xmark')
        if(volume.classList.contains('fa-volume-xmark')){
            let mute = volumeControl.value = 0
            song.volume = mute
        }
        else{
            let notMute = volumeControl.value = 0.5
            song.volume = notMute
        }
        
    }
})

if (volumeControl.value === 0) {
    volume.classList.toggle('fa-volume-xmark')

}


//<----Song Player Functionality Ends---->