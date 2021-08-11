import React, { useEffect, useState } from 'react'


const getCommentsFromLocalStorage = (productId) => {
   try {
      const comments = JSON.parse(window.localStorage.getItem(`comments-${productId}`))
      return comments || []
   } catch (e) {
      console.log(e);
      return []
   }
}

const saveCommentsToLocalStorage = (productId, comments) => {
   window.localStorage.setItem(`comments-${productId}`, JSON.stringify(comments))
}


export const Comments = ({ productId }) => {
   const [comments, setComments] = useState(getCommentsFromLocalStorage(productId));
   const [text, setText] = useState('')

   useEffect(() => {
      saveCommentsToLocalStorage(productId, comments)
   }, [comments])

   const onDelete = (commentId) => {
      const newComments = comments.filter((coment, index) => {
         return index != commentId
      })
      setComments(newComments)
   }
   const onAdd = () => {
      if (text) {
         const newComments = [...comments, text];
         setComments(newComments)
         setText('')
      }
   }
   return (
      <div className="comment_container">
         <div className="leave_comment">leave Comments</div>
         <div className='comment_input'>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={onAdd}>Add</button>
         </div>
         {comments.map((comment, commentId) => {
            return <div>{comment}
               <button onClick={() => onDelete(commentId)}>Delete</button>
            </div>
         })}
      </div>
   )



}