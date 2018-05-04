import React from 'react';

import { Checkbox } from 'semantic-ui-react';

const renderCheckbox = ({ input, value }) => (
  <Checkbox {...input} value={value} label={value} />
);

export default renderCheckbox;
