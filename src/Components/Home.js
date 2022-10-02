import React,{useState, useEffect} from 'react'
import "../Components/Home.css"

export default function Home() {
    const host = "https://musico-play.herokuapp.com/"
    const [text, ChangeText] = useState(null);
    const [data, setData] = useState([]);
    if (data.length == 0) {
        starLoad()
    }
    function starLoad() {
        fetch(`${host}/home`, {
            method: "POST",
        }).then(
            res => res.json()
        ).then(
            data => {
                setData(data.members)

            }
        )
    }
    function handleChange(e) {
        ChangeText(e.target.value);
    }
    function deleteNote(id1, thumb, title) {

        fetch(`${host}/play`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id1 })
        }).then(
            res => res.json()
        ).then(
            data => {
                let down_btn = document.getElementById('down-btn')
                let titl = document.getElementById('play_title')
                let divplay = document.getElementById('player_div')
                let audio_img = document.getElementById('audio_img')
                let audioele = document.getElementById('audioplayer')
                down_btn.href = data.direct_url
                titl.innerHTML = title
                audio_img.src = thumb
                divplay.style.display = "flex"
                audioele.src = data.direct_url
                audioele.play();
            }

        )
    }

    function getInfo(e) {
        e.preventDefault();
        let inp = document.getElementById("song-name-inp")
        fetch(`${host}/members`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: text })
        }).then(
            res => res.json()
        ).then(
            data => {
                setData(data.members)
                console.log(data)
                inp.value = ""
            }

        )



    }
    return (
        <>
            <div className='header'>
                <nav>
                    <form class="d-flex search-form" >
                        <input onChange={handleChange} id="song-name-inp" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button id="search-btn" onClick={getInfo} class="btn btn-outline-success" type="submit">Search</button>
                    </form>

                </nav>

            </div>
            <div className=' container cc'>
                <div className="row">
                    {data.map((dat, i) => {
                        return <div key={dat.id} onClick={() => { deleteNote(dat.id, dat.thumbnail, dat.title) }} id='card' className="card mx-3 my-3">
                            <img className="img1" src={dat.thumbnail} alt="Card image cap" />
                            <div className="card-body">
                                <p className="card-text">{dat.title}</p>
                            </div>
                        </div>
                    })}

                </div>


            </div>
            <div id="player_div" className='container-xxl footer'>
                <img href="" id="audio_img" className="rounded float-start mx-3" />
                <p className='mx-3' id='play_title'>Title of song</p>
                <audio id="audioplayer" src="" controls controlsList="noplaybackrate nodownload" preload='auto' ></audio>
                <a href="" target="blank" id="down-btn" download></a>
            </div>


        </>
    )
}
