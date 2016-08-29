const React = require('react');
const ReactDOM = require('react-dom');
const {Table, Column, Cell} = require('fixed-data-table')
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Modal } from 'react-bootstrap';


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
	
class MyUpdateCell extends React.Component {
	
	 constructor(props) {
		 super(props);
		 this.state= { showEditModal: false };
	 }
	
	  render() {
	    const {rowIndex, field, data, props} = this.props;
	    const link = data[rowIndex][field];
		let lgClose = () => this.setState({ showEditModal: false });
	    
	    return (
	      <Cell >
	      <div>
	    	 <EditRealestateModal url={'/api/1.0/realestate/'+link} show={this.state.showEditModal} onHide={lgClose} realestateId={link} />
             <Button bsStyle="primary" onClick={()=>this.setState({ showEditModal: true })}>
          edit
        </Button>
      </div>    
      </Cell>
    );
  }
}

class MyTable extends React.Component {
 
    constructor(props) {
    super(props);

    this.state = {myTableData: []};
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
        <Column
          header={<Cell></Cell>}
          cell={
            <MyUpdateCell
              data={this.state.myTableData}
              field="id"
            />
          }
          width={70}
        />
        </Table>
    );
  }
}
	
	
// ------------------- Realestate Tab ----------------------------
var RealestateOverview = React.createClass({
	
	  render: function() {
		  return (
	    
	    	 <MyTable url="/api/1.0/realestate/all" pollInterval={20000} />

	    );
	  }
	});


class EditRealestateModal extends React.Component{
	
	 constructor(props) {
		    super(props);
		    this.state = {realestate: []};
	}
	
	loadCommentsFromServer(props) {
	    $.ajax({
	      url: props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	    	  this.setState({realestate: data});
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
	      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
	        <Modal.Header closeButton>
	          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	          <h4>Wrapped Text</h4>
	          
	          {this.props.realestateId}
	          {this.state.realestate.title}
	          
	          
	        </Modal.Body>
	        <Modal.Footer>
	          <Button onClick={this.props.onHide}>Save</Button>
	          <Button onClick={this.props.onHide}>Close</Button>
	        </Modal.Footer>
	      </Modal>
	    );
	  }
	}

var ManagerTabs = React.createClass({
	  render: function() {
	    return (
	    		<Tabs>
	            <TabList>
	             <Tab  style={{color: "#000000"}}>Startseite</Tab>
	              <Tab>Kontakte</Tab>
	              <Tab>Angebote</Tab>
	              <Tab>Suchaufträge</Tab>
	              <Tab>Portale</Tab>
	              <Tab>Postfach</Tab>
	              <Tab>Textvorlagen</Tab>
	              <Tab>Partner-Produkte</Tab>
	            </TabList>

	            <TabPanel>
	              <h2>Startseite</h2>
	            </TabPanel>
	            
	            <TabPanel>
	             <h2>Kontakte</h2>
	            </TabPanel>
	            
	            <TabPanel>
	             <h2>Angebote</h2>
	             <RealestateOverview  />
	            </TabPanel>
	            
	            <TabPanel>
	             <h2>Suchaufträge</h2>
	            </TabPanel>
	            
	            <TabPanel>
	             <h2>Portale</h2>
	            </TabPanel>
	            
	            <TabPanel>
	             <h2>Postfach</h2>
	            </TabPanel>
	            
	            <TabPanel>
	             <h2>Textvorlagen</h2>
	            </TabPanel>
	            
	            <TabPanel>
	             <h2>Partner-Produkte</h2>
	            </TabPanel>
	            
	          </Tabs>
	    );
	  }
	});

var HeaderFrame = React.createClass({
	  render: function() {
	    return (
	    	   <div className="headerFrame">
	 	        <table  style={{color: "#ff7500"}}>
	 	          <tr>
	 	           <td >
	 	             <img width="75" src="img/FLOWFACT-logo-schwarz-transparent.png" ></img><br/> 
	 	             <img width="75" src="img/ImmobilienScout24_logo.svg.png"></img>
	 	           
	 	           </td> 
	 	          <td width="30"></td>
	 	           
	 	           <td><h1>RealEstate Manager</h1></td>
	 	          </tr>
	 	        </table>
	 	      </div>
	    );
	  }
	});

var ContentFrame = React.createClass({
	  render: function() {
	    return (
	    	<div className="contentFrame">
	    	   <ManagerTabs url="/api/1.0/realestate/all" pollInterval={20000} />
	 	    </div>
	    );
	  }
	});


var MainFrame = React.createClass({
	  render: function() {
	    return (
	    	<div>
	    	 <HeaderFrame />
	    	 <ContentFrame />
	    	</div>
	    );
	  }
	});




// ReactDOM.render(
// <MyTable url="/api/1.0/realestate/all" pollInterval={20000} />,
// document.getElementById('content')
// );

// ReactDOM.render(
// <RealestateOverview />,
// document.getElementById('content')
// );

ReactDOM.render(
		  <MainFrame  />,
		  document.getElementById('content')
		);
