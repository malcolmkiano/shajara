import React, { Component } from "react";
import moment from "moment";
import "./entries.sass";

import { StoryImage } from "../../../../images";
import { Button, EntryList } from "../../../../components";
import { EntryService } from "../../../../utils";
import AppContext from "../../dashboard-context";

class Entries extends Component {
  state = {
    month: moment(),
  };

  static contextType = AppContext;

  isCurrentMonth() {
    return moment().isSame(this.state.month, "month");
  }

  changeMonth(n = -1) {
    const month = moment(this.state.month).add(n, "months");
    this.setState({
      month: month,
    });
  }

  handleMonthChanged = (e) => {
    const monthString = e.target.value;
    const month = moment(monthString, "MMM YYYY");
    this.setState({
      month: month,
    });
  };

  componentDidMount() {
    document.title = "Entries - Shajara - Journal App";
  }

  render() {
    const { onEntryOpen, entries } = this.context;

    // grab all the entries for the selected month
    const list = EntryService.getMonth(entries, this.state.month).map((e) => {
      const entry = EntryService.makeComponent(e, onEntryOpen);
      return <li key={e.id}>{entry}</li>;
    });

    // gets the name of the current month
    const current = this.state.month.format("MMM YYYY");
    const months = EntryService.listMonths(entries);
    const options = months.map((month) => (
      <option key={month} value={month}>
        {month}
      </option>
    ));

    return (
      <article className="wrapper entries">
        <div className="month-selector">
          <Button
            type="prev"
            variant="alt"
            title="Previous month"
            disabled={!months.length || current === months[months.length - 1]}
            onClick={() => this.changeMonth()}
          />

          <h2>
            {months.length ? (
              <select
                name="month"
                value={current}
                onChange={this.handleMonthChanged}
              >
                {options}
              </select>
            ) : (
              <span>{current}</span>
            )}
          </h2>

          <Button
            type="next"
            variant="alt"
            title="Next month"
            disabled={this.isCurrentMonth()}
            onClick={() => this.changeMonth(1)}
          />
        </div>

        <EntryList
          entries={list}
          EmptyImage={StoryImage}
          showText="No entries this month"
        />
      </article>
    );
  }
}

export default Entries;
