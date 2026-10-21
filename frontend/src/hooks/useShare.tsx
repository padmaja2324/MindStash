import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import { useParams } from 'react-router-dom';

export function useShare() {
  const [contents, setContents] = useState([]);
  let { shareLink } = useParams();
  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/brain/${shareLink}`, {})
      .then((response) => {
        //@ts-ignore
        setContents(response.data.content);
      });
  }

  useEffect(() => {
    refresh();
    let interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh };
}
