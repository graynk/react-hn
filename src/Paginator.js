var React = require('react')
var Link = require('react-router/lib/Link')

var Paginator = React.createClass({
  _onClick(e) {
    setTimeout(function() { window.scrollTo(0, 0) }, 0)
  },

  render() {
    return <div className="Paginator">
      {
          this.props.page === 1 ?
              <span className="Paginator__prev disabled">Prev</span> :
              <span className="Paginator__prev">
                <Link
                    to={{pathname: `/${this.props.route}`, query: {page: this.props.page - 1}}}
                    onClick={this._onClick}>
                  Prev
                </Link>
              </span>
      }
      <span> | </span>
      {
          !this.props.hasNext ?
              <span className="Paginator__next disabled">Next</span> :
              <span className="Paginator__next">
                <Link
                  to={{pathname: `/${this.props.route}`, query: {page: this.props.page + 1}}}
                  onClick={this._onClick}>
                  Next
                </Link>
              </span>
      }
    </div>
  }
})

export default Paginator
