import React from 'react';
import { ListGroupItem, Button, Label } from 'react-bootstrap';

const styles = {
  icon: {
    borderRadius: '40px',
    margin: '2px',
  },
  author: {
    margin: '8px',
  },
  active: {
    backgroundColor: '#f0f0f0',
  },
  inActive: {
    backgroundColor: 'white',
    animation: 'blinker 0.5s cubic-bezier(.5, 0, 1, 1) alternate',
    animationDuration: '0.5s',
  },

};

class Blob extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBlob = this.deleteBlob.bind(this);
  }
  deleteBlob(e) {
    this.props.deleteHandler(this.props.node.coords);
  }
  measure(coord1, coord2) {
    const lat1 = coord1[0];
    const lon1 = coord1[1];
    const lat2 = coord2[0];
    const lon2 = coord2[1];
    const RAD = 0.000008998719243599958;
    return parseInt(Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2)) / RAD);
  }
  render() {
    if (this.props.node.data.type === 'txt') {
      return (
        <ListGroupItem className="clearfix" style={this.props.isActive ? styles.active: styles.inActive} >
          <div style={{ display: 'inline' }}>
            {this.props.node.data.content}
          </div>
          <div className="pull-right" style={{ padding: '2px' }}>
            <small className="text-muted" style={styles.author} >{this.props.node.owner}</small>
            <span style={styles.icon}>
              <Label bsStyle="warning">
                <span>{`${this.measure(this.props.node.coords, this.props.location.coords)} m`}</span>
              </Label>
            </span>
            <span style={styles.icon}>
              <Label bsStyle="success">
                <span>{this.props.node.data.type}</span>
              </Label>
            </span>
            <Button bsStyle="danger" style={styles.icon} bsSize="xsmall" onClick={this.deleteBlob}>
              <span className="glyphicon glyphicon-remove" />
            </Button>
          </div>
        </ListGroupItem>
      );
    }
    return (
      <ListGroupItem className="clearfix" style={this.props.isActive ? styles.active: styles.inActive} >
        <div style={{ display: 'inline' }}>
          <a href={this.props.node.data.content} target="blank">{this.props.node.data.name}</a>
        </div>
        <div className="pull-right" style={{ padding: '2px' }}>
          <small className="text-muted" style={styles.author} >{this.props.node.owner}</small>
          <span style={styles.icon}>
            <Label bsStyle="warning">
              <span>{`${this.measure(this.props.node.coords, this.props.location.coords)} m`}</span>
            </Label>
          </span>
          <span style={styles.icon}>
            <Label bsStyle="success">
              <span>{this.props.node.data.type}</span>
            </Label>
          </span>
          <Button bsStyle="danger" style={styles.icon} bsSize="xsmall" onClick={this.deleteBlob}>
            <span className="glyphicon glyphicon-remove" />
          </Button>
        </div>
      </ListGroupItem>
    );
  }
}

Blob.propTypes = {
  isActive: React.PropTypes.object,
  node: React.PropTypes.object,
  deleteHandler: React.PropTypes.func,
  location: React.PropTypes.object,
};

export default Blob;
