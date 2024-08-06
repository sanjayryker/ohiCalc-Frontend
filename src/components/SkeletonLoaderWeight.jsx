import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoaderWeight = () => {
    return (
        <> 
        {Array.from({length:3},(_,index) =>(
        <tr key={index}>
            <td><Skeleton style={{width:"100px", height:"27.6px"}} /> </td>
            <td><Skeleton style={{width:"120px", height:"32.6px"}} /></td>
            <td><Skeleton style={{width:"120px", height:"32.6px"}} /></td>
            <td><Skeleton style={{width:"120px", height:"32.6px"}} /></td>
            <td><Skeleton style={{width:"120px", height:"32.6px"}} /></td>
        </tr>
        ))}
        </>
        
      )
    
}

export default SkeletonLoaderWeight