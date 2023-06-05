import React from 'react'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import ReviewForm from '../reviewForm.js/ReviewForm'
import { useParams } from 'react-router-dom'

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

    const revText = useRef()
    let params = useParams()

    const movieId = params.movieId

    useEffect(() => {
        getMovieData(movieId)
    }, [])

    const addReview = async (e) => {
        e.preventDefault()

        const rev = revText.current

        try {
            const response = await axios.post("http://localhost:8080/api/v1/reviews", {reviewBody: rev.value , imdbId:movieId})
        
            const updateReview = [...reviews, {body: rev.value}]
    
            rev.value = ""
    
            setReviews(updateReview)
            
        } catch (error) {
            console.log(error);
        }

    }

  return (
    <Container>
        <Row>
            <Col>
            <h3>Reviews</h3>
            </Col>
        </Row>

        <Row>
            <Col>
                <img src={movie?.poster} alt=""/>
            </Col>

            <Col>
            {
                <>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={(event) => addReview(event)} revText={revText}
                                labelText="Write a review of you..."
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <hr/>
                        </Col>
                    </Row>
                </>
            }
            {
                reviews?.map((review, index) => {
                    return( 
                        <>
                            <Row>
                                <Col>
                                    {review?.body}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <hr/>
                                </Col>
                            </Row>
                        </>
                    )
                })
            }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr/>
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews