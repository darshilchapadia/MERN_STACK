'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IssueAdd = require('./IssueAdd.js');

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var IssueFilter = function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
  }

  _createClass(IssueFilter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        ' This is a placeholder for the Issue Filter. '
      );
    }
  }]);

  return IssueFilter;
}(React.Component);

var IssueRow = function (_React$Component2) {
  _inherits(IssueRow, _React$Component2);

  function IssueRow() {
    _classCallCheck(this, IssueRow);

    return _possibleConstructorReturn(this, (IssueRow.__proto__ || Object.getPrototypeOf(IssueRow)).apply(this, arguments));
  }

  _createClass(IssueRow, [{
    key: 'render',
    value: function render() {
      var issue = this.props.issue;
      console.log("IssueRow ");
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          issue._id
        ),
        React.createElement(
          'td',
          null,
          issue.status
        ),
        React.createElement(
          'td',
          null,
          issue.owner
        ),
        React.createElement(
          'td',
          null,
          issue.created
        ),
        React.createElement(
          'td',
          null,
          issue.effort
        ),
        React.createElement(
          'td',
          null,
          issue.completionDate ? issue.completionDate : ''
        ),
        React.createElement(
          'td',
          null,
          issue.title
        )
      );
    }
  }]);

  return IssueRow;
}(React.Component);

var IssueTable = function (_React$Component3) {
  _inherits(IssueTable, _React$Component3);

  function IssueTable() {
    _classCallCheck(this, IssueTable);

    return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));
  }

  _createClass(IssueTable, [{
    key: 'render',
    value: function render() {
      var issueRows = this.props.issues.map(function (issue) {
        return React.createElement(IssueRow, { key: issue._id, issue: issue });
      });
      return React.createElement(
        'table',
        null,
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'Id'
            ),
            React.createElement(
              'th',
              null,
              'Title'
            ),
            React.createElement(
              'th',
              null,
              'Owner'
            ),
            React.createElement(
              'th',
              null,
              'Created'
            ),
            React.createElement(
              'th',
              null,
              'Effort'
            ),
            React.createElement(
              'th',
              null,
              'Completion Date'
            ),
            React.createElement(
              'th',
              null,
              'Title'
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          issueRows
        )
      );
    }
  }]);

  return IssueTable;
}(React.Component);

var IssueList = function (_React$Component4) {
  _inherits(IssueList, _React$Component4);

  function IssueList() {
    _classCallCheck(this, IssueList);

    var _this4 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

    _this4.state = { issues: [] };
    _this4.createIssue = _this4.createIssue.bind(_this4);
    return _this4;
  }

  _createClass(IssueList, [{
    key: 'loadData',
    value: function loadData() {
      var _this5 = this;

      console.log("****client****");
      fetch('/api/issues').then(function (response) {

        if (response.ok) {
          response.json().then(function (data) {
            console.log("Total count of records ");
            data.records.foreach(function (issue) {
              issue.created = new Date(issue.created);
              if (issue.completionDate) {
                issue.completionDate = new Date(issue.completionDate);
              }
            });
            _this5.setState({ issues: data.records });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch issues: " + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server: ", err);
        console.log(err);
      });
    }
  }, {
    key: 'createIssue',
    value: function createIssue(newIssue) {
      var _this6 = this;

      var updatedIssue = {
        "id": this.state._id,
        "status": this.state.status,
        "owner": this.state.owner,
        "effort": this.state.effort,
        "created": this.state.created,
        "completionDate": this.state.completionDate,
        "title": this.state.title
      };
      fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssue)
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (newIssue) {
            newIssue.Created = new Date(newIssue.created);
            if (newIssue.completionDate) {
              newIssue.completionDate = new Date(newIssue.completionDate);
            }
            var newIssues = _this6.state.issues.concat(newIssue);
            _this6.setState({ issues: newIssues });
            console.log("**** my client****");
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to add issue: " + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in sending data to server: " + err.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          ' Issue Tracker '
        ),
        React.createElement(IssueFilter, null),
        React.createElement('hr', null),
        React.createElement(IssueTable, { issues: this.state.issues }),
        React.createElement('hr', null),
        React.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
      );
    }
  }]);

  return IssueList;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode); // Render the component inside the content Node