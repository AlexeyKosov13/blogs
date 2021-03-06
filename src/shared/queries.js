
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { postsUrl } from "./projectData";

export const useGetPosts = () => {
    return useQuery('posts', ()=> {
        return axios.get(postsUrl)
         .then((res) => res.data)
         .catch(err=> {throw new Error(err)})
    });
}

export const useGetPost = (id) => {
    return useQuery(['post', id], ()=> {
        return axios.get(postsUrl+id)
         .then((res) => res.data)
         .catch(err=> {throw new Error(err)})
    });
}

export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (updatedPost) => {
            return axios.put(`${postsUrl}${updatedPost.id}`, updatedPost)
            .then(res=> res.data)
            .catch(err => {
                throw new Error(err)
            })
        }, {
            onSuccess: (updatedPost) => {
                queryClient.invalidateQueries('posts');
                queryClient.setQueryData(['post', updatedPost.id], updatedPost)
            },
            onError: (error) => {
                console.log(error);
            }
        }
    )
}

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    return useMutation(
        (blogPost) => {
            return axios.delete(`${postsUrl}${blogPost.id}`)
            .then(res=> res.data)
            .catch(err => {
                throw new Error(err)
            })
        }, {
            onSuccess: (data) => {
                queryClient.invalidateQueries('posts');
                if (location !== '/blog') {
                    navigate('/blog', {repalce: true})
                }
               
            },
            onError: (error) => {
                console.log(error);
            }
        }
    )
}

export const useEditPost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (updatedPost) => {
            return axios.put(`${postsUrl}${updatedPost.id}`, updatedPost)
            .then(res=> res.data)
            .catch(err => {
                throw new Error(err)
            })
        }, {
            onSuccess: (updatedPost) => {
                queryClient.invalidateQueries('posts');
                queryClient.setQueryData(['post', updatedPost.id], updatedPost)
            },
            onError: (error) => {
                console.log(error);
            }
        }
    )
}

export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (newPost) => {
            return axios.post(`${postsUrl}`, newPost)
            .then(res=> res.data)
            .catch(err => {
                throw new Error(err)
            })
        }, {
            onSuccess: (data) => {
                queryClient.invalidateQueries('posts');
            },
            onError: (error) => {
                console.log(error);
            }
        }
    )
}
