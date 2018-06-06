import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface DropdownProps {

}

const Dropdown: StatelessComponent<DropdownProps> = ({
  children
}) => (
  <div className="dropdown">
    <style jsx>{styles}</style>
    <select className="dropdown__select">
      <option selected disabled hidden>Choose here</option>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
);

export default Dropdown;
