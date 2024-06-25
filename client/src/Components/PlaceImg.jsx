import React from 'react'

const PlaceImg = ({value, index=0, className= null}) => {
    if(!value.photos?.length) return ""
    if(!className) className="object-cover rounded-md"

  return (
        <img
          src={"http://localhost:3001/uploads/" + value[index]}
          alt="thumbnail"
          className={className}
        />
      )}

export default PlaceImg