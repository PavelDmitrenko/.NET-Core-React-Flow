// @flow

import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Styles from 'Styles/Main.module'; // Module CSS

const Main = () => {
    return (
        <fieldset className={Styles.main}>
        <legend>I'm hot child component</legend>
            <div>Child Text</div>
            <input defaultValue="I will't be refreshed on parent update" />
        </fieldset>);
}

export default hot(Main);

