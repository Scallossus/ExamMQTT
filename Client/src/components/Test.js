  /* useEffect(() => {
      const loggedInReviewerId = localStorage.getItem('userId');
      client.subscribe(`topic/${filmId}`, { qos: 2 });
      client.on('message', (topic, message) => {
        if (topic === `topic/${filmId}`) {
          console.log("Ricevuto messaggio su " + topic);

          const updatedReviewString = message.toString();
          const updatedReviewObject = JSON.parse(updatedReviewString);
          const updatedReview = updatedReviewObject.reviewDetails; 
          
          API.getFilmReviews(filmId)
          .then(reviews => {
            const updatedReviews = [...reviews];
            console.log(updatedReviews);
            const reviewIndex = updatedReviews.map((review, index) => {
              if (
                review.filmId === updatedReview.filmId &&
                review.reviewerId === updatedReview.reviewerId
              ) {
                return index;
              } else {
                return null;
              }
            }).filter(index => index !== null)[0];  
        
            if (reviewIndex !== undefined) {
              console.log("sono dentro" + reviewIndex);
              updatedReviews[reviewIndex] = updatedReview;
              if (updatedReview.reviewerId === loggedInReviewerId) {
                console.log("ancora più dentro");
                setReviews(updatedReviews);
              }
            } else {
              console.log("No matching review found.");
            }
          })
          .catch(e => {
            handleErrors(e);
          });

        }
      });
      client.unsubscribe(`topic/${filmId}`);
    }, []); */

    /*  useEffect(() => {
    client.subscribe(`review/${filmId}`, { qos: 2 });
    client.on('message', (topic, message) => {
    if (topic === `review/${filmId}`) {
    setDirty(true);
    }
    });;}, []); */

/*    useEffect(() => {
      const loggedInReviewerId = localStorage.getItem('userId');
      
      client.on('message', (topic, message) => {
        if (topic === `topic/${filmId}`) {
          API.getFilmReviews(filmId)
            .then(reviews => {
              if (reviews.some(review => review.reviewerId === loggedInReviewerId)) {
                console.log("sono dentro il FOUND");
                setDirty(true);
              }
            })
            .catch(e => {
              handleErrors(e);
            });
        }
      });
    }, []); */

 /*   useEffect(() => {
      const loggedInReviewerId = localStorage.getItem('userId'); 
      const prevReviews = reviews.map(review => ({ ...review }));
      console.log(reviews);  
      client.on('message', (topic, message) => {
        if (topic === `topic/${filmId}`) {
          const updatedReviewString = message.toString();
          const updatedReviewObject = JSON.parse(updatedReviewString);
          const updatedReview = updatedReviewObject.reviewDetails;

          
          
          console.log("updatedReview:" + updatedReview.reviewerId);
          console.log("reviews:" + prevReviews);
          const updatedReviewIndex = prevReviews.findIndex((review) => {
            return (
              review.filmId === updatedReview.filmId &&
              review.reviewerId === updatedReview.reviewerId
            );
          });

          console.log("Ok:" + updatedReviewIndex);
    
          if (updatedReviewIndex !== -1) {
            const updatedReviews = [...reviews];
            updatedReviews[updatedReviewIndex] = updatedReview;
    
            if (updatedReview.reviewerId !== loggedInReviewerId) {
              return;
            }
    
            setReviews(updatedReviews);
          }
        };
      });

    }, [reviews]); */

    //da fare una UseEffect che ricevuto il messaggio lo aggiorni con il valore di message

    
    
  /*  const [messageReceived, setMessageReceived] = useState(false);

    useEffect(() => {
      
      client.on('message', (topic, message) => {
        if (topic === `topic/${filmId}`) {
          const updatedReviewString = message.toString();
          const updatedReviewObject = JSON.parse(updatedReviewString);
          const updatedReview = updatedReviewObject.reviewDetails;
          setMessageReceived(updatedReview);
        }
      });
    }, []);
  
    useEffect(() => {
      console.log("Qui le reviews:" + reviews);
      console.log("Qui il messaggio:" + messageReceived);
      if (messageReceived) {
        const loggedInReviewerId = localStorage.getItem('userId');
        const prevReviews = reviews.map((review) => ({ ...review }));
        const updatedReview = messageReceived;
  
        const updatedReviewIndex = prevReviews.findIndex((review) => {
          return review.filmId === updatedReview.filmId && review.reviewerId === updatedReview.reviewerId;
        });
        
        console.log(updatedReviewIndex);
        if (updatedReviewIndex !== -1) {
          const updatedReviews = [...reviews];
          updatedReviews[updatedReviewIndex] = updatedReview;
  
          //if (updatedReview.reviewerId !== loggedInReviewerId) {
          //  return;
          //}
          
          setReviews(updatedReviews);
        }
      }
    }, [messageReceived]); */

      /*  useEffect(() => {
      client.on('message', (topic, message) => {
        if (topic === `topic/${filmId}`) {
          const updatedReviewString = message.toString();
          const updatedReviewObject = JSON.parse(updatedReviewString);
          const updatedReview = updatedReviewObject.reviewDetails;
    
          setReviews(prevReviews => {
            const loggedInReviewerId = localStorage.getItem('userId');
            const updatedReviewIndex = prevReviews.findIndex((review) => {
              return review.filmId === updatedReview.filmId && review.reviewerId === updatedReview.reviewerId;
            });

            console.log(updatedReviewIndex)
    
            if (updatedReviewIndex !== -1) {
              const updatedReviews = [...prevReviews];
              updatedReviews[updatedReviewIndex] = updatedReview;
    
              //if (updatedReview.reviewerId !== loggedInReviewerId) {
              //  return prevReviews;
              //}
              console.log(updatedReviews);
              
              return updatedReviews;
              }
    
            return prevReviews;
          });
        }
      });
    }, []); */

    /*  useEffect(() => {
    setReviews(reviewsRef.current);
  }, [reviewsRef]);
  

  useEffect(() => {
    if (dirty && !firstRun) {
      client.subscribe(`topic/${filmId}`, { qos: 2 });
      API.getFilm(filmId).then(filmObj => {
        setFilm(filmObj)
        API.getFilmReviews(filmId)
        .then(reviews => {
          setReviews(reviews);
          setDirty(false);
        })
        .catch(e => { handleErrors(e);  } ); 
      })
    } else {
      setFirstRun(false);
    }
  },[dirty, firstRun, filmId, handleErrors]);

  useEffect(() => {
    client.on('message', (topic, message) => {
      if (topic === `topic/${filmId}`) {
        const updatedReviewString = message.toString();
        const updatedReviewObject = JSON.parse(updatedReviewString);
        const updatedReview = updatedReviewObject.reviewDetails;

        const updatedReviews = reviewsRef.current.map(review => {
          if (review.filmId === updatedReview.filmId && review.reviewerId === updatedReview.reviewerId) {
            return updatedReview;
          }
          return review;
        });  
        reviewsRef.current = updatedReviews;
        console.log('reviewsRef.current:', reviewsRef.current);
        console.log('updatedReviews:', updatedReviews);

        console.log('reviews:', reviews);
        //setReviews(updatedReviews);
      }
    });
  }, [filmId]); */

  /*
    // Without this we do not pass the if(dirty) test in the [filterId, dirty] useEffect
 useEffect(() => {
    setDirty(true);
  }, [filterId]) 

  useEffect(() => {
    if (dirty) {
      API.getFilm(filmId).then(filmObj => {
        setFilm(filmObj)
        API.getFilmReviews(filmId)
        .then(reviews => {
          setReviews(reviews);
          setDirty(false);
          })

      })
      .catch(e => { handleErrors(e);  } ); 
    }
    else {
      setDirty(false);
    }
  },[dirty]);

  const [messageReceived, setMessageReceived] = useState(false);

    useEffect(() => {  
      client.subscribe(`topic/${filmId}`, { qos: 2 });    
      client.on('message', (topic, message) => {
        if (topic === `topic/${filmId}`) {
          const updatedReviewString = message.toString();
          const updatedReviewObject = JSON.parse(updatedReviewString);
          const updatedReview = updatedReviewObject.reviewDetails;
          setMessageReceived(updatedReview);
          updateReviews(reviews, updatedReview);
        }
      });
    }, [filmId]);

    const updateReviews = (updatedReviews, updatedReview) => {
      console.log(updatedReviews);
      const loggedInReviewerId = localStorage.getItem('userId');
      const newReviews = updatedReviews.map((review) => ({ ...review }));
      const updatedReviewIndex = newReviews.findIndex((review) => {
        return review.filmId === updatedReview.filmId && review.reviewerId === updatedReview.reviewerId;
      });
      if (updatedReviewIndex !== -1) {
        newReviews[updatedReviewIndex] = updatedReview;
      }
      console.log("Dove sono" + newReviews);
      setReviews(newReviews);
    }


  ////////////////////////

  useEffect(() => {
    setDirty(true);
  }, [filterId]) 

  const reviewsRef = useRef([]);
  const needUpdateRef = useRef(false);

  useEffect(() => {
    if (dirty) {
      API.getFilm(filmId)
        .then((filmObj) => {
          setFilm(filmObj);
          API.getFilmReviews(filmId).then((reviews) => {
            reviewsRef.current = reviews;
            setReviews(reviews);
            setDirty(false);
            console.log("prima mount")
            client.subscribe(`topic/${filmId}`, { qos: 2 });
          });
        })
        .catch((e) => {
          handleErrors(e);
        });
    } else {
      setDirty(false);
    }
  }, [dirty]);
  
  useEffect(() => {
    const handleReceiveMessage = (topic, message) => {
      if (topic === `topic/${filmId}`) {
        const updatedReviewString = message.toString();
        const updatedReviewObject = JSON.parse(updatedReviewString);
        const updatedReview = updatedReviewObject.reviewDetails;
        setMessageReceived(updatedReview);
        updateReviews(reviewsRef.current, updatedReview);
      }
    };
  
    if (filmId) {
      client.on('message', handleReceiveMessage);
  
      return () => {
        client.unsubscribe(`topic/${filmId}`);
        client.off('message', handleReceiveMessage);
      };
    }
  }, [filmId]);
  
  const updateReviews = (reviews, updatedReview) => {
    console.log("Sono dentro UpdateReviews");
    console.log(reviews);
    const loggedInReviewerId = localStorage.getItem('userId');
    const newReviews = reviews.map((review) => {
      return JSON.parse(JSON.stringify(review));
    });
    const updatedReviewIndex = newReviews.findIndex((review) => {
      return review.filmId === updatedReview.filmId && review.reviewerId === updatedReview.reviewerId;
    });
    console.log(updatedReviewIndex);
    if (updatedReviewIndex !== -1) {
      newReviews[updatedReviewIndex] = updatedReview;
    }
    reviewsRef.current = newReviews;
    needUpdateRef.current = true;
    console.log(reviewsRef.current);
  };

  useEffect(() => {
    if (needUpdateRef.current) {
      setReviews(reviewsRef.current);
      needUpdateRef.current = false;
    }
  }, [needUpdateRef.current]);
  

  Ok so the problem is with rendering of the FilmReviewTable, but why if I comment "setReviews" everything works fine

It's hard to say for sure without more information, but if commenting out setReviews resolves the issue, it's possible that the problem is related to the way that reviews state is being updated.

When you call setReviews, React will re-render the component, and any child components that depend on the reviews state will also re-render. It's possible that the child component FilmReviewTable is being re-rendered too frequently or inefficiently, which is causing performance problems or crashes.

By commenting out setReviews, you're preventing the FilmReviewTable component from re-rendering, which may be why everything is working fine. However, this is likely just masking the underlying problem.

To debug the issue, you may want to use the React Profiler to see if there are any performance issues with the FilmReviewTable component. You could also try optimizing the rendering of the FilmReviewTable component, for example by using React.memo to prevent unnecessary re-renders or by using useCallback to memoize function props.



  useEffect(() => {
    const loggedInReviewerId = localStorage.getItem('userId');
    console.log(props.newReview);

    const updatedReviews = props.reviews.map((review) => {
      return JSON.parse(JSON.stringify(review));
    });

    const updatedReviewIndex = updatedReviews.findIndex((review) => {
      return review.filmId === props.newReview.filmId && review.reviewerId === props.newReview.reviewerId;
    });

    if (updatedReviewIndex !== -1) {
      updatedReviews[updatedReviewIndex] = props.newReview;
    }

    setNewReviews(updatedReviews);
  }, [props.newReview]) 

  const reviews = newReviews ? newReviews : props.reviews;