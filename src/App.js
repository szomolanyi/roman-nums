// jshint esversion: 6

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Well, Grid, Row, Col, FormControl, FormGroup, ControlLabel, Form, Button, Label, Alert} from 'react-bootstrap';
import toRoman from './toroman';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class RespForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.rst();
  }

  handleChange(e) {
    let newval=e.target.value;
    this.setState((prev) => ({
      roman:newval.toUpperCase(),
      num: prev.num,
      expected: prev.expected
    }));
  }

  rst() {
    let randval=getRandomInt(1,5000);
    this.state = {
      roman: '',
      num: randval,
      expected: toRoman(randval)
    };
  }

  render() {
    return (
      <Form inline className="mainform" onSubmit={ (e) => {
          e.preventDefault();
          this.props.handleSubmit(this.state);
          this.rst();
        }
      }>
        <FormGroup controlId="respFormId">
          <ControlLabel className="mainform__item">Convert {this.state.num}</ControlLabel>
          <FormControl
            type="text"
            value={this.state.roman}
            placeholder="Roman number"
            onChange={this.handleChange}
            className="mainform__item"
            >
          </FormControl>
        </FormGroup>
        <Button className="mainform__item" onClick={ () => {
            this.props.handleSubmit(this.state);
            this.rst();
          }
        }>
          Submit
        </Button>
      </Form>
    );
  }
}

const Result = ({result}) => {
  let t;
  if (result.roman === result.expected) {
    t="success";
  }
  else {
    t="danger";
  }
  return (
    <CSSTransitionGroup
     transitionName="resultanim"
     transitionAppear={true}
     transitionAppearTimeout={500}
     transitionEnter={false}
     transitionLeave={false}>
      <Label className="result" bsStyle={t}>
        <h5>
          <p>{`Num:${result.num}`}</p>
          <p>{`Expected:${result.expected}`}</p>
          <p>{`Entered:${result.roman}`}</p>
        </h5>
      </Label>
    </CSSTransitionGroup>
  );
}

const ResultList = ({results}) => {
  // Map through the todos
  const resultNode = results.map((result, id) => {
    return (<Result result={result} key={id} />)
  });
  return (
    <div className="resultlist">
      {resultNode}
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      last_id: 0
    };
  }

  handleSubmit(s) {
    this.setState( (prevstate) => {
      return {results: prevstate.results.concat([s]), last_id: prevstate.last_id++ };
    });
  }

  xboxminutes() {
    let m = 0;
    this.state.results.map((r) => {
      if (r.roman === r.expected) m+=0.4;
    });
    return Math.round(m*10)/10;
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col md={3}></Col>
            <Col md={5}>
              <Well className="mwell">
                <RespForm handleSubmit={this.handleSubmit.bind(this)}/>
              </Well>
              <Alert>
                XBOX minutes available: {this.xboxminutes()}
              </Alert>
            </Col>
          </Row>
        </Grid>
        <ResultList results={this.state.results} id={this.state.last_id} />
      </div>
    );
  }
}

export default App;
