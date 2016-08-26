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

	    this.state = {
	      myTableData: [
	        {name: 'Rylan', email: 'Angelita_Weimann42@gmail.com'},
	        {name: 'Amelia', email: 'Dexter.Trantow57@hotmail.com'},
	        {name: 'Estevan', email: 'Aimee7@hotmail.com'},
	        {name: 'Florence', email: 'Jarrod.Bernier13@yahoo.com'},
	        {name: 'Tressa', email: 'Yadira1@hotmail.com'},
	      ],
	    };
	  }

	  render() {
	    return (
	      <Table
	        rowsCount={this.state.myTableData.length}
	        rowHeight={50}
	        headerHeight={50}
	        width={1000}
	        height={500}>
	        <Column
	          header={<Cell>Name</Cell>}
	          cell={
	            <MyTextCell
	              data={this.state.myTableData}
	              field="name"
	            />
	          }
	          width={200}
	        />
	        <Column
	          header={<Cell>Email</Cell>}
	          cell={
	            <MyLinkCell
	              data={this.state.myTableData}
	              field="email"
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
		  <MyTable />,
		  document.getElementById('content')
		);
