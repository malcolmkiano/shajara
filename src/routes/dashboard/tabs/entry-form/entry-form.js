import React, { Component } from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";
import moment from "moment";
import "./entry-form.sass";

import { Button, MoodSelector } from "../../../../components";

import AppContext from "../../dashboard-context";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {
        date_created: new Date().toISOString(),
        content: "",
        mood: 5,
        id: null,
      },
      saved: true,
    };

    this.txt = React.createRef();
  }

  static contextType = AppContext;

  getEntry = () => {
    const { entries } = this.props;

    const d = this.props.match.params.date;
    const isToday = moment().isSame(d, "day");
    let title = isToday ? "Today" : moment(d).format("dddd");
    document.title = `${title} - Shajara - Journal App`;

    let entry = entries.find((e) => moment(e.date_created).isSame(d, "day"));
    if (!entry)
      entry = {
        date_created: new Date().toISOString(),
        content: "",
        mood: 5,
        id: null,
      };

    if (this.state.entry.content !== entry.content)
      this.setState({
        entry: entry,
      });

    this.resizeTextarea();
  };

  // this exists to scale the textarea (mainly for mobile views)
  resizeTextarea() {
    const txt = this.txt.current;
    if (txt) txt.style.height = txt.scrollHeight + "px";
  }

  // if opened directly from the parent
  componentDidMount() {
    this.getEntry();
  }

  // get entries from parent once they're loaded
  // happens if user navigates directly to this route
  componentDidUpdate(props) {
    if (props.entries !== this.props.entries) {
      this.getEntry();
    }

    // resize the textarea on update
    this.resizeTextarea();
  }

  handleSave = (e) => {
    e.preventDefault();
    const { entry } = this.state;
    if (entry.id) {
      // if there is an ID in the state,
      // entry already exists on server and needs to be updated
      this.context.onEditEntry(entry.id, entry);
    } else {
      // otherwise, create a new entry
      this.context.onCreateEntry(entry);
    }

    // only mark as saved if there were no errors
    if (!this.context.error)
      this.setState(
        {
          saved: true,
        },
        () => {
          this.handleClose();
        }
      );
  };

  handleUpdate = (field, value) => {
    const entry = {
      ...this.state.entry,
      [field]: value,
    };

    this.setState({
      entry: entry,
      saved: false,
    });
  };

  handleClose = (e = null) => {
    if (e) e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    // grab the date from the params
    const d = this.props.match.params.date;
    const isToday = moment().isSame(d, "day");
    let title = isToday ? "Today" : moment(d).format("dddd");
    let subtitle = moment(d).format("MMM D, YYYY");

    // grab the entry out of state
    const { entry, saved } = this.state;

    return (
      <form className="wrapper entry-form" onSubmit={this.handleSave}>
        <header>
          <div className="top-bar">
            <Button
              type="close"
              htmlType="button"
              variant="alt"
              title="Close entry"
              onClick={this.handleClose}
            />

            <h2>{title}</h2>

            <Button
              type="clear"
              htmlType="submit"
              variant={`accent ${!isToday ? "invisible" : ""}`}
              disabled={saved || !entry.content}
              onClick={this.handleSave}
            >
              Save
            </Button>
          </div>

          <p className="subtitle">{subtitle}</p>

          <MoodSelector
            disabled={!isToday}
            onChange={this.handleUpdate}
            mood={entry.mood}
          />
        </header>

        <textarea
          ref={this.txt}
          autoFocus={isToday}
          placeholder="Write something"
          readOnly={!isToday}
          onChange={(e) => this.handleUpdate("content", e.target.value)}
          value={entry.content}
          rows="1"
        ></textarea>

        <Prompt
          when={isToday && !saved}
          message="You have unsaved changes. Are you sure you want to leave?"
        />
      </form>
    );
  }
}

EntryForm.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      date_created: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      mood: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    })
  ),
};

export default EntryForm;
