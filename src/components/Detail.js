import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import db from '../firebase';


function Detail() {

    const { id } = useParams();
    const [movie, setMovies] = useState();


    useEffect(() => {
        // Grab movie fr DB
        db.collection("movies")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    // save movie data
                    setMovies(doc.data());
                } else {
                    //  redirect to home 
                    console.log("no such document in firebase");
                }
            })

    }, [id])


    return (
        <Container>
            {movie && (
                <>
                    <Background>
                        <img src={movie.backgroundImg} />
                    </Background>
                    <ImageTitle>
                        <img src={movie.titleImg} />
                    </ImageTitle>
                    <Controls>
                        <PlayButton>
                            <img src='/images/play-icon-black.png' />
                            <span>Play</span>
                        </PlayButton>
                        <TrailerButton>
                            <img src='/images/play-icon-white.png' />
                            <span>Trailer</span>
                        </TrailerButton>

                        <div>
                            <AddButton>
                                <img src='' />
                                <span>+</span>
                            </AddButton>
                            <GroupWatchButton>
                                <img src='/images/group-icon.png' />
                            </GroupWatchButton>
                        </div>
                    </Controls>
                    <Subtitle>
                        {movie.subTitle}
                    </Subtitle>
                    <Description>
                        {movie.description}
                    </Description>
                </>
            )}
        </Container>
    )
}

export default Detail


const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 70px 70px 0;
    position: relative;
    overflow: hidden;

    @media (max-width: 890px) {
        padding: 36px 36px 0;
    }
`

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.8;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width:768px ) {
        width: initial;
    }
`

const ImageTitle = styled.div`
   height: 30vh;
   min-height: 170px;
   width: 35vw;
   max-width: 600px;
   min-width: 200px;
   margin-top: 10px;
   margin-bottom: 20px;

   img {
        width: 100%;
        height: 100%;
        object-fit: contain;
   }
`

const Controls = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        justify-content: center;
        align-items: center;

    }

    @media (max-width: 890px) {
        flex-direction: column;
        align-items: flex-start;
    }
  
`

const PlayButton = styled.button`
   border-radius: 4px;
   font-size: 15px;
   padding: 0 24px;
   margin-right: 22px;
   text-transform: uppercase;
   display: flex;
   align-items: center;
   height: 56px;
   background: rgb(249, 249, 249);
   border: none;
   letter-spacing: 1.8px;
   cursor: pointer;

   &:hover {
    background: rgb(198, 198, 198);
   }

   @media (max-width: 890px) {
        margin-bottom: 15px;
    }
`

const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
`

const AddButton = styled.button`
    margin-right: 16px;
   width: 44px;
   height: 44px;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 50%;
   border: 2px solid white;
   background-color: rgba(0, 0, 0, 0.6);
   cursor: pointer;

   span {
       font-size: 30px;
       color: white;
   }

   &:hover {
    background: rgb(198, 198, 198);
   }
   
`

const GroupWatchButton = styled(AddButton)`
    background: rgb(0, 0, 0);
`

const Subtitle = styled.div`
   color: rgb(249, 249, 249);
   font-size: 15px;
   min-height: 20px;
   margin-top: 26px;
`

const Description = styled.div`
   max-width: 700px;
   line-height: 1.4;
   font-size: 20px;
   margin-top: 16px;
   color: rgb(249, 249, 249);

`