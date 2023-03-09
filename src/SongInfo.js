import React, { useState } from "react";
import { useEffect } from "react";
import { uuid } from "uuidv4";
import Masonry from "react-masonry-css";
import loader from "./loader.png";
import "./App.css";

function SongInfo() {
  const myKey = "9F88FFD6577D0257D407";
  const [mySongs, setMySongs] = useState([]);
  const [mySearch, setMySearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState("");
  const [name, setName] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.phish.net/v5/setlists/slug/${submitted}.json?&apikey=${myKey}`
      ); /*  */
      const data = await response.json();
      const newArray = data.data.slice(-15).reverse();
      const showDates = newArray.map((value) => value.showdate);
      let newObjects = [];
      for (let i = 0; i < newArray.length; i++) {
        let mySong = newArray[i];
        let showDate = showDates[i];
        let setlist = {};
        let index = [i + 1];
        const responseSetlist = await fetch(
          `https://api.phish.net/v5/setlists/showdate/${showDate}.json?apikey=${myKey}`
        );
        const dataSetlist = await responseSetlist.json();
        setlist = dataSetlist.data.map(
          (value) => value.set + " " + value.song + " (" + value.gap + ")"
        );
        console.log(dataSetlist.data);
        mySong = { ...mySong, setlist, index };
        newObjects.push(mySong);
      }
      setMySongs(newObjects);
      setLoading(false);
    }
    fetchData();
  }, [submitted]);

  const clickSetlist = (showdate) => {
    const newSongs = [];
    mySongs.forEach((song) => {
      if (song.showdate === showdate) {
        const changedSongs = { ...song, showMore: !song.showMore };
        newSongs.push(changedSongs);
      } else {
        newSongs.push(song);
      }
    });
    setMySongs(newSongs);
  };

  const mySongSearch = (e) => {
    setMySearch(e.target.value);
  };

  const finalSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(
      mySearch
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
    );
    let words = mySearch.split("-");
    console.log(words);
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      console.log(words);
    }
    setName(words.join(" "));
    setMySearch("");
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <div className="container">
        <h1 className="gradient-text">Phish Song Phinder</h1>
        <h3 style={{ margin: "0.5em 0" }}>
          Enter a song name, and check out when and where it was played most
          recently (max. 15)
        </h3>
        <p>
          Try looking up "Divided Sky", "First Tube", "Ghosts of the Forest",
          "Bouncing Around the Room", "Also Sprach Zarathustra", "Character
          Zero", and many more!
        </p>
        <form onSubmit={finalSearch}>
          <input
            className="search"
            placeholder="Look up a song, any song!"
            onChange={mySongSearch}
            value={mySearch}
          ></input>
        </form>
      </div>
      {isLoading ? (
        <img src={loader} alt="loading" id="loader" />
      ) : (
        <div className="container">
          <h2>{name}</h2>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {mySongs.map((item) => {
              const {
                id,
                showdate,
                country,
                tourname,
                artist_name,
                city,
                state,
                meta,
                setlist,
                showMore,
                index,
              } = item;
              return (
                <div
                  key={id}
                  className="item"
                  style={{ backgroundColor: "rgba(245, 144, 137, 0.75)" }}
                >
                  <h2>
                    |{index}| {showdate}
                  </h2>
                  <p>{meta ? meta : artist_name}</p>
                  <p>
                    {city}, {state} {country}
                  </p>
                  <p>{tourname}</p>
                  <br></br>
                  <p>
                    Setlist{" "}
                    <span
                      onClick={() => clickSetlist(showdate)}
                      style={{ cursor: "pointer" }}
                    >
                      <b>
                        <u>{showMore ? "collapse" : "expand"}</u>
                      </b>
                    </span>
                  </p>
                  <ul style={{ display: `${showMore ? "flex" : "none"}` }}>
                    <p>song name (show gap)</p>
                    {setlist.map((element) => {
                      return <li key={uuid()}>&nbsp;&nbsp;{element}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </Masonry>
        </div>
      )}
    </div>
  );
}

export default SongInfo;
