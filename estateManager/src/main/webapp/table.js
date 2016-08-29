const React = require('react');
const ReactDOM = require('react-dom');
const {Table, Column, Cell} = require('fixed-data-table')

class MyTextCell extends React.Component {
	  render() {
	    const {rowIndex, field, data, props} = this.props;
	    return (
	      <Cell >
	        {data[rowIndex][field]}
	      </Cell>
	    );
	  }
	}

	class MyLinkCell extends React.Component {
	  render() {
	    const {rowIndex, field, data, props} = this.props;
	    const link = data[rowIndex][field];
	    return (
	      <Cell >
	        <a href={link}>{link}</a>
	      </Cell>
	    );
	  }
	}

	class MyTable extends React.Component {
	 
	 constructor(props) {
	    super(props);

	    this.state = {myTableData: []};
	    
	    /**this.state = {
	      myTableData: [
	        {name: 'Rylan', email: 'Angelita_Weimann42@gmail.com'},
	        {name: 'Amelia', email: 'Dexter.Trantow57@hotmail.com'},
	        {name: 'Estevan', email: 'Aimee7@hotmail.com'},
	        {name: 'Florence', email: 'Jarrod.Bernier13@yahoo.com'},
	        {name: 'Tressas', email: 'Yadira1@hotmail.com'},
	      ],
	    };*/
	  }
	  
	loadCommentsFromServer(props) {
		    $.ajax({
		      url: props.url,
		      dataType: 'json',
		      cache: false,
		      success: function(data) {
		    	  this.setState({myTableData: data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    });
		  }
	  
	  componentDidMount(){
		    this.loadCommentsFromServer(this.props);
		    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
		  }
	  
	  render() {
	    return (
	      <Table
	        rowsCount={this.state.myTableData.length}
	        rowHeight={50}
	        headerHeight={50}
	        width={1000}
	        height={300}>
	        <Column
	          header={<Cell>id</Cell>}
	          cell={
	            <MyLinkCell
	              data={this.state.myTableData}
	              field="id"
	            />
	          }
	          width={200}
	        />
	        <Column
	          header={<Cell>Title</Cell>}
	          cell={
	            <MyTextCell
	              data={this.state.myTableData}
	              field="title"
	            />
	          }
	          width={200}
	        />
	      </Table>
	    );
	  }
	}
	
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

ReactDOM.render(
		  <MyTable url="/api/1.0/realestate/all" pollInterval={20000} />,
		  document.getElementById('content')
		);
