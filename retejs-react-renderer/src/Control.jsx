import React from "react";
import { Control } from "rete";

class MyReactControl extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      name: this.props.name
    });
    // console.log(this.props);
    this.props.putData(this.props.id, this.props.name);
  }
  onChange(event) {
    console.log("onchange");

    console.log(this.props.nodeData)
    console.log(this.props.id)
    console.log(this.props.getData(this.props.id));

    this.props.putData(this.props.id, event.target.value);
    this.props.emitter.trigger("process");
    this.setState({
      name: event.target.value
    });
  }

  // update(){
  //   this.putData('num', this.scope.value)
  //     this.emitter.trigger('process');
  //     this._alight.scan();
  // }

  render() {
    return (
      <input value={this.state.name} onChange={this.onChange.bind(this)} />
    );
  }
}

export class MyControl extends Control {
  constructor(emitter, key, name, nodeData) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.props = {
      emitter,
      id: key,
      name,
      nodeData,
      putData: () => this.putData.apply(this, arguments),
      getData: () => this.getData.apply(this)
    };
  }
}
