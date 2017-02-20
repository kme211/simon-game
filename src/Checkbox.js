import React, { Component, PropTypes as t } from 'react';
import Checkmark from './Checkmark';
import './Checkbox.css';

class Checkbox extends Component {
    render() {
        const { checked, label, onToggle } = this.props;
        return (
            <div className="checkbox">
                <div className="checkbox__inner" onClick={onToggle}>
                    {checked && <Checkmark/>}
                </div>
                <div className="checkbox__label">{ label }</div>
            </div>
        );
    }
}

Checkbox.propTypes = {
    onToggle: t.func.isRequired,
    checked: t.bool.isRequired,
    label: t.string.isRequired
};

export default Checkbox;