import {useContext} from 'react';
import { AuthContext } from '../Hoc/AuthProvider';

export function UseAuth () {
    return useContext(AuthContext);
}