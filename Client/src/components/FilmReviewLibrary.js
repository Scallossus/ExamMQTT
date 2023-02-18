import React, { useState, useEffect } from 'react';
import { Table, Button, OverlayTrigger, Popover } from 'react-bootstrap/'
import { Link, useLocation } from 'react-router-dom';
import Pagination from "react-js-pagination";
import dayjs from 'dayjs';


function FilmReviewTable(props) {
  
  useEffect(() => {
    console.log("dentroReviewTable");
    console.log(props.newReview);
  }, [props.newReview]) 

  const handlePageChange = pageNumber => {
    props.refreshReviews(parseInt(props.film.id), pageNumber);
  }

  return (
    <>
   <Table>
  <tbody>
    {props.reviews.map((review) => {
      if (props.newReview && review.filmId === props.newReview.filmId && review.reviewerId === props.newReview.reviewerId) {
        return (
          <FilmReviewRow reviewData={review} filmData={props.film} key={review.reviewerId} id={review.reviewerId}
            deleteReview={props.deleteReview} subscribed={props.subscribed} unsubscribed={props.unsubscribed}
            newReview={props.newReview} isReviewer={props.isReviewer} />
        );
      } else {
        return (
          <FilmReviewRow reviewData={review} filmData={props.film} key={review.reviewerId} id={review.reviewerId}
            deleteReview={props.deleteReview} subscribed={props.subscribed} unsubscribed={props.unsubscribed} />
        );
      }
    })}
  </tbody>
</Table>


       <Pagination 
          itemClass="page-item" // add it for bootstrap 4
          linkClass="page-link" // add it for bootstrap 4
          activePage={parseInt(localStorage.getItem("currentPage"))}
          itemsCountPerPage={parseInt(localStorage.getItem("totalItems"))/parseInt(localStorage.getItem("totalPages"))}
          totalItemsCount={parseInt(localStorage.getItem("totalItems"))}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
          pageSize ={parseInt(localStorage.getItem("totalPages"))}
      />
    </>

  );
}

function FilmReviewRow(props) {

  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate.isValid() ? dayJsDate.format(format) : '';
  }

  /* location hook is used to pass state to the edit view (or add view). 
   * So, we may be able to come back to the last selected filter view if cancel is pressed.
   */
  const location = useLocation();

  
  const [subscribed, setSubscribed] = useState(false);
  
  const handleClick = () => {
    if (subscribed) {
      props.unsubscribed(props.reviewData.filmId, props.reviewData.reviewerId);
      setSubscribed(false);
    } else {
      props.subscribed(props.reviewData.filmId, props.reviewData.reviewerId);
      setSubscribed(true);
    }
  } 

  const [ReviewData, setReviewData] = useState(props.reviewData);

/*  useEffect(() => {
    if (props.newReview) {
      //console.log("Dentro Row");
      //console.log(props.newReview);
      if (props.newReview.filmId === ReviewData.filmId && props.newReview.reviewerId === ReviewData.reviewerId) {
        setReviewData(prevReviewData => ({
          ...prevReviewData,
          // Update the relevant fields here, e.g.:
          rating: props.newReview.rating,
          review: props.newReview.review
        }));
      }
    }
  }, [props.newReview, ReviewData]);*/

  useEffect(() => {
    if (props.newReview) {
      console.log("Dentro Row");
      console.log(props.newReview);
      if (props.newReview.filmId === ReviewData.filmId && props.newReview.reviewerId === ReviewData.reviewerId) {
        // Check if the new review is different from the current review data
        if (props.newReview.rating !== ReviewData.rating || props.newReview.review !== ReviewData.review) {
          if(props.isReviewer){
          setReviewData(prevReviewData => ({
            ...prevReviewData,
            // Update the relevant fields here, e.g.:
            completed: props.newReview.completed,
            rating: props.newReview.rating,
            review: props.newReview.review
          }));
        }}
      }
    }
  }, [props.newReview, ReviewData]);
  





  
  return (
    <tr>
      <td>
       {
        ReviewData.reviewerId == localStorage.getItem("userId") &&
        <Link to={"/public/" + ReviewData.filmId + "/reviews/complete"} state={{nextpage: location.pathname}}>
          <i className="bi bi-pencil-square" />
        </Link>
      }
      &nbsp; &nbsp;
      {
        props.filmData.owner == localStorage.getItem("userId") &&
        <Link to={{}}> 
          <i className="bi bi-trash" onClick={() => { props.deleteReview(ReviewData) }} />
        </Link>
      }
      </td>
      <td>
        <p>Reviewer ID: {ReviewData.reviewerId}</p>
      </td>
      <td>
      {
        !ReviewData.completed &&
        <p>Not Completed</p>
      }
      {
        ReviewData.completed &&
        <p>Completed</p>
      }
      </td>
      <td>
        {ReviewData.reviewDate ? <small>{formatWatchDate(ReviewData.reviewDate, 'MMMM D, YYYY')}</small> : ''}
      </td>
      <td>
        {ReviewData.rating ? <Rating rating={ReviewData.rating} maxStars={10} /> : ''}   
      </td>
      <td>
        {ReviewData.review ? 
        <OverlayTrigger
        trigger="click" placement="left"
        overlay={
          <Popover>
            <Popover.Header as="h3">Review</Popover.Header>
            <Popover.Body>
              {ReviewData.review}
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="secondary">Review Text</Button>
      </OverlayTrigger>
        : ''}
      </td>
      <td>  <Button variant={subscribed ? 'danger' : 'primary'} onClick={handleClick}>
        {subscribed ? 'Unsubscribe' : 'Subscribe'}
      </Button></td>
    </tr>
  );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, idx) =>
    <i  key={idx} className={(idx < props.rating) ? "bi bi-star-fill" : "bi bi-star"} onClick={() => props.updateRating(idx+1)}/>
  )
}
export default FilmReviewTable;