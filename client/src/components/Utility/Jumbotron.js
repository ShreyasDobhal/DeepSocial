import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Example = (props) => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">{props.title}</h1>
                <p className="lead">{props.body1}</p>
                <hr className="my-2" />
                <p>{props.body2}</p>
                {
                    props.btnText ? (
                        props.goto ?
                        <p className="lead">
                            <a className='btn btn-primary' href={props.goto} color="primary">{props.btnText}</a>
                        </p>
                        :
                        <p className="lead">
                            <Button onClick={props.onClick} color="primary">{props.btnText}</Button>
                        </p>
                    ): null
                }
                
            </Jumbotron>
        </div>
    );
};

export default Example;