import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
function scrollToSectionOnMount() {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(location => {
      const { hash } = location;
      if (hash !== '') {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return null;
}

export default scrollToSectionOnMount;