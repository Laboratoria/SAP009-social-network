
import { LogOut, auth } from '../../firebase/auth.js';
import createHeader from '../../components/header.js';
import { getLoggedUserAllPosts, createNewPost, updatePost} from '../../firestore/DBFunctions';
import { doc } from 'firebase/firestore';