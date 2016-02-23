import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { isPropEnabled, mergeClassNames } from '../utils';
import FontIcon from '../FontIcons';
import Ink from '../Inks';
import Tooltip from '..//Tooltips';

export default class IconButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    iconClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    tooltip: PropTypes.string,
    tooltipClassName: PropTypes.string,
    tooltipPosition: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
    onClickInkMouseDown: PropTypes.bool,
  };

  static defaultProps = {
    type: 'button',
    onClickInkMouseDown: false,
  };

  render() {
    const { iconClassName, children, className, href, type, onClickInkMouseDown, tooltip, tooltipClassName, tooltipPosition, ...props } = this.props;
    let btnProps = {
      ...props,
      className: mergeClassNames(props, 'md-btn', 'md-icon-btn', className),
    };

    if(href) {
      btnProps.href = href;
    } else {
      btnProps.type = type;
    }

    let displayedChildren = children;
    if(!(children && children.type && children.type === FontIcon)) {
      displayedChildren = <FontIcon iconClassName={iconClassName}>{children}</FontIcon>;
    }

    const disabled = isPropEnabled(props, 'disabled');
    const wrappedButton = (
      <Ink disabled={disabled}>
        {React.createElement(href ? 'a' : 'button', btnProps, displayedChildren)}
      </Ink>
    );

    if(tooltip) {
      return (
        <Tooltip text={tooltip} position={tooltipPosition} className={tooltipClassName}>
          {wrappedButton}
        </Tooltip>
      );
    } else {
      return wrappedButton;
    }
  }
}