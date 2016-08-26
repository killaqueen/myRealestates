var RealestateListBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="RealestateListBox">
        <h1>Realestate</h1>
        <RealestateList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
// --------------------------------------------------------------------------

var RealestateList = React.createClass({
	  render: function() {
	    var realestates = this.props.data.map(function(realestate) {
	      return (
	        <Realestate title={realestate.title} id={realestate.id}>
	        </Realestate>
	      );
	    });
	    return (
	      <div className="RealestateList">
	        {realestates}
	      </div>
	    );
	  }
	});
// --------------------------------------------------------------------------

var Realestate = React.createClass({
  render: function() {
    return (
      <div className="realestate">
        <h3 className="realestateContent">
        {this.props.id} - {this.props.title}
        </h3>
        <a href={'edit.html?id=' +this.props.id} className="button">edit</a>
        
      </div>
    );
  }
});
// --------------------------------------------------------------------------

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
	  e.preventDefault();
	    var author = this.state.author.trim();
	    var text = this.state.text.trim();
	    if (!text || !author) {
	      return;
	    }
	    this.setState({author: '', text: ''});
	    this.props.onCommentSubmit({author: author, text: text});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

// --------------------------------------------------------------------------

var RealestateBox = React.createClass({
	  render: function() {
	    return (
	      <div className="RealestateBox">
	        <h1>Realestate</h1>
	        this.props.location.query
	      </div>
	    );
	  }
	});
// -------------------------------------------------------------------------
var MFTable = React.createClass({
	  render: function() {
	    return (
	      <div className="mFtable">
	        <table  style={{color: "#ff7500"}}>
	          <tr>
	           <td >Hallo</td> <td>Welt</td>
	          </tr>
	        </table>
	      </div>
	    );
	  }
	});


// --------------------------------------------------------------------------
 ReactDOM
 .render(
 <RealestateListBox url="/api/1.0/realestate/all" pollInterval={20000} />,
 document.getElementById('content'));


