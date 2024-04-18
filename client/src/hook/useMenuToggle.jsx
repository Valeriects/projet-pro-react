import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../store/slices/menu';

// custom hook qui permet de fermer le menu au montage du composant
// sera appelé sur toutes les pages accessible via le menu
function useMenuToggle() {
    const dispatch = useDispatch();
    const { isMenuOpen, isUserOpen } = useSelector((state) => state.menu);

    useEffect(() => {
        if(isMenuOpen || isUserOpen) dispatch(closeMenu())
    }, []);
}

export default useMenuToggle;