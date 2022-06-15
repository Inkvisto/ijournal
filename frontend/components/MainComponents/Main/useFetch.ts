import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { PostApi } from '../../../utils/api/post/posts';

function useFetch(pageNum:any) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList]:any = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setList([]);
  }, []);

  useEffect(() => {

   

    setIsLoading(true);
    setError(false);
   (async()=>{
    await PostApi.findPosts(10,list.at(-1)?.id)
    .then((res) => {
      setList((prev:any) => [...prev, ...res]);
      setHasMore(res.length > 0);
      setIsLoading(false);
    })
    .catch((err) => {
      if (axios.isCancel(err)) return;
      setError(err);
    });
    
      
   })()


  }, [pageNum]);

  return { isLoading, error, list, hasMore };
}

export default useFetch;
