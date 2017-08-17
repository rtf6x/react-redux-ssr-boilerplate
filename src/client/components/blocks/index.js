import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Blocks extends Component {

  static propTypes = {
    blocks: PropTypes.array,
  };

  static defaultProps = {
    blocks: [],
  };

  renderBlocks() {
    return this.props.blocks.map((block, index) =>
      <div className={`col-lg-3 col-md-4 col-xs-6 thumb thumb ${index}`} key={index}>
        <button className='thumbnail'>
          <span>{block.name}</span>
          <img
            alt=''
            className='img-responsive'
            src='http://dev2.ftrt.cc/resources/games/icons/bsg_238_basic.png'/>
        </button>
      </div>);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <h1 className='page-header'>{`Всего ${this.props.blocks.length} игр`}</h1>
          </div>
          {this.renderBlocks()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { blocks: state[ownProps.routes[1].path || 'top_lists'] };
};


export default connect(mapStateToProps)(Blocks);
