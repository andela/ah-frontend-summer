import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import '../../assets/styles/styles.css';

const loader = () => (
    <div className="LoaderStyle">
        <Dimmer active inverted>
            <Loader size='massive'>Loading</Loader>
        </Dimmer>
    </div>
)
export default loader;
