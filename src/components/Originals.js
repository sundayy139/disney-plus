import React from 'react';
import styled from 'styled-components';
import { selectOriginal } from '../features/movie/movieSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Originals() {

    const movies = useSelector(selectOriginal);


    return (
        <Container>
            <h4>Originals</h4>
            <Content>
                {
                    movies
                    && movies.map((movie) => (
                        <Wrap key={movie.id}>
                            <Link to={`/detail/${movie.id}`}>
                                <img src={movie.cardImg} />
                            </Link>
                        </Wrap>
                    ))
                }
            </Content>
        </Container>
    )
}

export default Originals


const Container = styled.div`
     padding:0 0 26px;

     h4 {
         font-size: 20px;
     }
`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width:480px ) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    @media (min-width:481px ) and (max-width:768px ) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width:769px ) and (max-width:1023px ) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

`

const Wrap = styled.div`
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, 
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, 
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }
`