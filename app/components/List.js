import React from 'react';
import { Accordion } from 'react-accessible-accordion';
import ScrollPane from './ScrollPane';
import cstyles from './Common.module.css';

type ListProps = {
  children: ReactElement[],
  title: string,
  value?: string
};

const List = ({ children, title, value }: ListProps) => (
  <ScrollPane offsetHeight={300}>
    <div className={cstyles.margintoplarge}>
      <div className={[cstyles.flexspacebetween, cstyles.tableheader, cstyles.sublight].join(' ')}>
        <div>{title}</div>
        {value && <div>{value}</div>}
      </div>
    </div>

    <Accordion>{children}</Accordion>
  </ScrollPane>
);

List.defaultProps = {
  value: ''
};

export default List;
