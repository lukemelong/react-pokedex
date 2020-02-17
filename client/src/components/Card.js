import React from 'react'

const Card = (props) => {
    return (
        <React.Fragment>
            <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                    <h3>{`${props.pokemon._id}: ${props.pokemon.name}`}</h3>
                    <img 
                    className="card-img-top" 
                    alt="Thumbnail [100%x225]" 
                    style={{height: 225, objectFit: 'contain', display: 'block'}}
                    src={props.pokemon.img} 
                    />
                    <div className="card-body">
                    <p className="card-text">{props.pokemon.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <a className="btn btn-sm btn-outline-secondary" href={`edit/${props.pokemon._id}`}>Edit</a>
                            <a className="btn btn-sm btn-outline-secondary" href={`delete/${props.pokemon._id}`}>Delete</a>
                        </div>
                        <small className="text-muted">9 mins</small>
                    </div>
                    </div>  
                </div>
                </div>
        </React.Fragment>
    )
}

export default Card
