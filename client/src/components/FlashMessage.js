import React from 'react'

const FlashMessage = props => {  
    return(      
    <div className="alert alert-warning alert-dismissible fade show position-absolute" role="alert">
        {props.message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    )
}

export default FlashMessage