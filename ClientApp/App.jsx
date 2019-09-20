// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'Components/Main'
import 'Styles/Styles'; // Import regular stylesheet

const rootElement = document.getElementById('root');

if (rootElement){
    ReactDOM.render(
        <React.Fragment>
            <fieldset className='parentcontainer'>
                <legend>I'm hot parent component</legend>
                    <div>Parent Text</div>
                    <input defaultValue="I will't be refreshed on child update" />
                    <Main />
            </fieldset>
        </React.Fragment>
        ,
        rootElement 
    );
}