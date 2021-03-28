import React from 'react';
import { Accordion } from 'react-accessible-accordion';
import ScrollPane from './ScrollPane';
import cstyles from './Common.module.css';

const List = ({
  children,
  title,
  value
}) => <ScrollPane offsetHeight={300}>
    <div className={cstyles.margintoplarge}>
      <div className={[cstyles.flexspacebetween, cstyles.tableheader, cstyles.sublight].join(' ')}>
        <div>{title}</div>
        {value && <div>{value}</div>}
      </div>
    </div>

    <Accordion>{children}</Accordion>
  </ScrollPane>;

List.defaultProps = {
  value: ''
};
export default List;