
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { postsUrl } from "./projectData";

export const useGetPosts = () => {
    return useQuery('posts', ()=> {
        return axios.get(postsUrl)
         .then((res) => res.data)
         .catch(err=> {throw new Error(err)})
    }, {
        refetchOnWindowFocus: false,
    });
}

export const useGetPost = (id) => {
    return useQuery(['post', id], ()=> {
        return axios.get(postsUrl+id)
         .then((res) => res.data)
         .catch(err=> {throw new Error(err)})
    }, {
        refetchOnWindowFocus: false,
    });
}

export const useLikePost = () => {
    return useMutation(
        (updatedPost) => {
            return axios.put(`${postsUrl}${updatedPost.id}`, updatedPost)
            .then(res=> res.data)
            .catch(err => {
                throw new Error(err)
            })
        }
    )
}

export const useDeletePost = () => {
    return useMutation(
        (blogPost) => {
            return axios.delete(`${postsUrl}${blogPost.id}`)
            .then(res=> res.data)
            .catch(err => {
                throw new Error(err)
            })
        }
    )
}

export const useEditPost = () => {
    return useMutation(
        (updatedPost) => {
            return axios.put(`${postsUrl}${updatedPost.id}`, updatedPost)
            .then(res=> res.data)
            .catch(err => {
                throw new Error(err)
            })
        }
    )
}

export const useAddPost = () => {
    return useMutation(
        (newPost) => {
            return axios.post(`${postsUrl}`, newPost)
            .then(res=> res.data)
            .catch(err => {
                throw new Error(err)
            })
        }
    )
}