const React = require('react');
const ReactDOM = require('react-dom');
const {Table, Column, Cell} = require('fixed-data-table')
// const Form = JSONSchemaForm.default;
import Form from "react-jsonschema-form";
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
	    	 <EditRealestateModal url={'/api/1.0/realestate/internal/ui/'+link} show={this.state.showEditModal} onHide={lgClose} realestateId={link} />
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


const uiSchema =  {
 		  
 		   "descriptionNote": {
 			    "ui:widget": "textarea"
 			  },
 			 "furnishingNote": {
  			    "ui:widget": "textarea"
  			  },
  			"locationNote": {
 			    "ui:widget": "textarea"
 			  },
 			 "otherNote": {
  			    "ui:widget": "textarea"
  			  }
 		};
   
const schema = {
  		  title: "Todo",
  		  type: "object",
  		  required: ["title"],
  		  properties: {
  		    title: {type: "string", title: "Title", default: "A new task"},
  		    done: {type: "boolean", title: "Done?", default: false}
  		  }
  		};

const formData = {};

//const onSubmit = ({formData}) => {
//	
//	console.log(formData);
//	$.ajax({
//		
//	      url: '/api/1.0/realestate/'+formData.id,
//	      dataType: 'json',
//	      contentType: 'application/json',
//	      type: 'PUT',
//	      data: JSON.stringify(
//	    		  
//	    		  {
//		    			"type": "CompulsoryAuctionWrapper",
//		    			"realestate": formData
//		    		}
//	    		  ),
//	      success: function(data) {
//	        // this.setState({data: data});
//	      }.bind(this),
//	      error: function(xhr, status, err) {
//	        console.error('/api/1.0/realestate/'+formData.id, status, err.toString());
//	      }.bind(this)
//	    });
//}	

class EditRealestateModal extends React.Component{
	
	 constructor(props) {
		    super(props);
		    //this.state = {schema: [], result : [{realestate:[]}], result:[]};
		    
		    this.state= {
		    		
		    		"result":{
			    		"realestate": {
			    			"type": "",
			    			"realestate": {},
			    			"uiSchema": null
			    		}
		    		}
		    	}
	}

	 
	loadDataFromServer(props) {
	    $.ajax({
	      url: props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	    	  this.setState({result: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  }
	
	  componentDidMount(){
		    this.loadDataFromServer(this.props);
		    setInterval(this.loadDataFromServer, this.props.pollInterval);
		  }
	  
	  closeModal(){
		    console.log("Closing");
		  }
	  
	  render() {
			 const onSubmit = ({formData}) => {
					console.log(formData);
					$.ajax({
					      url: '/api/1.0/realestate/'+formData.id,
					      dataType: 'json',
					      contentType: 'application/json',
					      type: 'PUT',
					      data: JSON.stringify(
					    		  
					    		  {
						    			"type": this.state.result.realestate.type,
						    			"realestate": formData
						    		}
					    		  ),
					      success: function(data) {
					        // this.setState({data: data});
					      }.bind(this),
					      error: function(xhr, status, err) {
					        console.error('/api/1.0/realestate/'+formData.id, status, err.toString());
					      }.bind(this)
					    });
				}	
		  
		  
	    return (
	    		
	      <Modal 
	      onEntered  = { function(){ console.log( "Modal is Shown"); }}
	      onExit     = { function(){ console.log( "onExit    " ) }}
	      onExiting  = { function(){ console.log( "onExiting " ) }}
	      onExited   = { function(){ console.log( "onExited  " ) }}
	      {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
	        <Modal.Header closeButton>
	          <Modal.Title id="contained-modal-title-lg">Realestate Data</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        <div>
	          <Form schema={this.state.result.schema}
	          uiSchema={uiSchema}
	          formData={this.state.result.realestate.realestate}
	          onSubmit={onSubmit}>
	          
	          <button type="submit">Save</button>
	          
	          </Form>
	        </div>
	          
	        </Modal.Body>
	        <Modal.Footer>
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
