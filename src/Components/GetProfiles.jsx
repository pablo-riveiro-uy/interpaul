import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import capitalizeName from './CapitalizeName';
import countries from "../countryCodes.json";
import hoverSoundURL from "../beep1.wav"
import errorSoundURL from "../assets/beep-error.wav"

const boverURL = hoverSoundURL;
const errorrURL = errorSoundURL;


const GetProfiles = () => {
  const [peoplePage, setPeoplePage] = useState([]);
  const [allInfo, setAllInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('UY');
  const [allImages, setAllImages] = useState([]);
  const [playHover] = useSound(boverURL)
  const [playError] = useSound(errorrURL)

  // toggle oversize class on littlePic

  const [isActive, setActive] = useState(false);
  const ToggleClass = () => {
    setActive(!isActive);
  };

  // toggle vissible extra info

  const [isVisible, setVisible] = useState(false);
  const ToggleVisible = () => {
    playHover();
    setVisible(!isVisible);
  };

  // Manejador de eventos para actualizar el estado con el país seleccionado
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    const fetchPeoplePage = async () => {
      try {
        if (selectedCountry) {
          const response = await fetch(`https://ws-public.interpol.int/notices/v1/red?nationality=${selectedCountry}&ageMax=120&ageMin=18&sexId=M&page=1&resultPerPage=10`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("Page of profiles data", data);
          setPeoplePage(data._embedded.notices);
        }
      } catch (error) {
        console.error('Error fetching people page:', error);
      }
    };

    fetchPeoplePage();
  }, [selectedCountry]);

  useEffect(() => {
    const getExtendedProfiles = async () => {
      try {
        const extendedProfiles = await Promise.all(
          peoplePage.map(async (p) => {

            const response = await fetch(p._links.self.href);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Personal Profile", data);
            return data;
          })
        );
        setAllInfo(extendedProfiles);
      } catch (error) {
        console.error('Error fetching extended profiles:', error);
      }
    };

    if (peoplePage.length > 0) {
      getExtendedProfiles();
      console.log(allInfo);
    }
  }, [peoplePage]);



  useEffect(() => {
    const getAllImages = async () => {
      try {
        const imagesLinks = await Promise.all(
          peoplePage.map(async (p) => {
            const response = await fetch(p._links.images.href);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Personal Pics", data._embedded.images);
            return data._embedded.images;
          })
        );
        setAllImages(imagesLinks);
      } catch (error) {
        console.error('Error fetching pics files:', error);
      }
    }

    getAllImages();
  }, [peoplePage]);


  useEffect(() => {
    setSelectedCountry('UY');
  }, []);

  return (
    <>

      <div>
        <h3>Select a country for red notices</h3>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Selecciona un país</option>
          {countries.map(option => (
            <option key={option.code} value={option.code}>{option.name}</option>
          ))}
        </select>

      </div>

      {peoplePage.length > 0 ? (
        <ul className='profileGrid'>
          {peoplePage.map((p, index) => (
            <div className="profile-data">

              <li key={p.entity_id}>
                <div className="profile" onClick={ToggleVisible}>
                  <div>
                    {p._links.thumbnail && p._links.thumbnail.href ?
                      <img className='pic' src={p._links.thumbnail.href} alt="Profile thumbnail" />
                      : <p>No image</p>
                    }

                  </div>

                  <div className="data">
                    <h4>Name:</h4>
                    <p>{capitalizeName(p.forename)}  {capitalizeName(p.name)}</p>
                    {allInfo[index] && (
                      <div>
                        <h4>Charges:</h4>
                        <div className='charges'>{allInfo[index].arrest_warrants[0].charge}</div>
                      </div>
                    )}
                  </div>
                </div>

              </li>


              {allInfo[index] && (
                <div className={isVisible ? "completeProfile" : "hideInfo"}>
                  <div className="info">

                    <h4>Distinguishing Marks:</h4>
                    {allInfo[index].distinguishing_marks != null ?
                      <p>{allInfo[index].distinguishing_marks}</p> :
                      <p>No info</p>}
                  </div>


                  <div className="info">

                    <h4>Date of birth: </h4>
                    <p>{allInfo[index].date_of_birth}</p>
                  </div>
                  <div className="info">

                    <h4>Languages spoken: </h4>
                    <p>{allInfo[index].languages_spoken_ids}</p>
                  </div>
                </div>


              )}
              {allImages.length > 0 && allImages[index] && allImages[index].length >=2 ? (
                allImages[index].map((image) => (
                  <div className="picsArea">
                    <img className={!isActive ? "littlePic" : "overSize"} src={image._links.self.href} alt='extra image' onMouseOver={playHover} onClick={ToggleClass} />
                    
                  </div>
                ))
              ) : <p>No more images</p>}
            </div>

          ))}
        </ul>
      ) : (
        <div className='no-records typewriter'>
          {playError()}
          <p>No Profiles on Selected Country</p>
        </div>
      )
      }
    </>
  );
};

export default GetProfiles;